/**
 * Docker Build Library for EEZ Projects
 *
 * Core functionality for Docker-based builds separated from CLI interface
 */

import * as fs from "fs";
import * as path from "path";
import { spawn, spawnSync, ChildProcess } from "child_process";
import * as crypto from "crypto";

import { t } from "eez-studio-shared/i18n";

// Global state for abort handling
let abortRequested = false;
let runningProcesses: ChildProcess[] = [];
let currentContainerId: string | null = null;

// Cached Docker executable path. `undefined` means unresolved.
let dockerCommandPath: string | null | undefined;

// Global state for incremental builds
let lastProjectInfo: ProjectInfo | null = null;

function getDockerCommandPath(): string | null {
    if (dockerCommandPath !== undefined) {
        return dockerCommandPath;
    }

    const candidates =
        process.platform === "darwin"
            ? [
                  "docker",
                  "/usr/local/bin/docker",
                  "/opt/homebrew/bin/docker",
                  "/Applications/Docker.app/Contents/Resources/bin/docker"
              ]
            : ["docker"];

    for (const candidate of candidates) {
        if (candidate.includes(path.sep) && !fs.existsSync(candidate)) {
            continue;
        }

        let result = spawnSync(candidate, ["--version"], {
            shell: false,
            stdio: "pipe"
        });

        // Keep compatibility with environments where shell resolution is required.
        if (result.status !== 0 && candidate === "docker") {
            result = spawnSync(candidate, ["--version"], {
                shell: true,
                stdio: "pipe"
            });
        }

        if (result.status === 0) {
            dockerCommandPath = candidate;
            return dockerCommandPath;
        }
    }

    dockerCommandPath = null;
    return dockerCommandPath;
}

function resolveCommand(command: string): string {
    if (command !== "docker") {
        return command;
    }

    return getDockerCommandPath() || command;
}

export interface BuildConfig {
    repositoryName: string;
    dockerVolumeName: string;
    dockerBuildPath: string;
}

export interface FontInfo {
    localPath: string; // Absolute path on local system
    targetPath: string; // Path in Docker container (/fonts/...)
    fileName: string; // Font file name
}

export interface FileManifest {
    [relativePath: string]: string; // relativePath -> file hash
}

export interface ProjectInfo {
    lvglVersion: string;
    flowSupport: boolean;
    projectDir: string;
    uiDir: string;
    destinationFolder: string;
    displayWidth: number;
    displayHeight: number;
    fonts: FontInfo[]; // Array of FreeType fonts to include
    encoderGroup?: string; // Default group for encoder in simulator
    keyboardGroup?: string; // Default group for keyboard in simulator
    fileManifest?: FileManifest; // Manifest of source files with hashes
}

export interface CommandResult {
    success: boolean;
    output?: string;
    error?: string;
}

export type LogFunction = (
    message: string,
    type?: "info" | "success" | "error" | "warning"
) => void;

/**
 * Request abort of current operation
 */
export function abortBuild(): void {
    abortRequested = true;

    // Kill all running processes
    for (const proc of runningProcesses) {
        try {
            if (!proc.killed && proc.pid) {
                // On Windows, use taskkill to kill the entire process tree
                if (process.platform === "win32") {
                    try {
                        spawnSync(
                            "taskkill",
                            ["/pid", proc.pid.toString(), "/T", "/F"],
                            {
                                shell: true
                            }
                        );
                    } catch (e) {
                        // Fallback to regular kill
                        proc.kill("SIGKILL");
                    }
                } else {
                    // On Unix, send SIGTERM then SIGKILL
                    proc.kill("SIGTERM");
                    setTimeout(() => {
                        if (!proc.killed) {
                            proc.kill("SIGKILL");
                        }
                    }, 1000);
                }
            }
        } catch (error) {
            // Ignore errors during cleanup
        }
    }
    runningProcesses = [];

    // Stop any running Docker containers
    if (currentContainerId) {
        try {
            spawnSync(resolveCommand("docker"), ["stop", currentContainerId], {
                shell: true,
                timeout: 5000
            });
        } catch (error) {
            // Ignore errors during cleanup
        }
    }
}

/**
 * Reset abort state (call before starting new build)
 */
export function resetAbort(): void {
    abortRequested = false;
    runningProcesses = [];
    currentContainerId = null;
}

/**
 * Check if abort was requested
 */
export function isAbortRequested(): boolean {
    return abortRequested;
}

/**
 * Stop any running Docker containers and clean up
 */
export async function stopRunningContainers(
    config: BuildConfig,
    log: LogFunction
): Promise<void> {
    try {
        // Stop containers managed by docker compose
        log(t("Stopping any running containers..."));
        const result = spawnSync(
            resolveCommand("docker"),
            ["compose", "down", "--remove-orphans"],
            {
                cwd: config.dockerBuildPath,
                shell: true,
                timeout: 15000
            }
        );
        if (result.status === 0) {
            log(t("Containers stopped successfully"));
        }
    } catch (error) {
        // Ignore errors during cleanup
    }

    // Also stop tracked container if any
    if (currentContainerId) {
        try {
            spawnSync(resolveCommand("docker"), ["stop", currentContainerId], {
                cwd: config.dockerBuildPath,
                shell: true,
                timeout: 10000
            });
        } catch (error) {
            // Ignore errors during cleanup
        }
        currentContainerId = null;
    }
}

/**
 * Calculate MD5 hash of a file
 */
function calculateFileHash(filePath: string): string {
    const content = fs.readFileSync(filePath);
    return crypto.createHash("md5").update(content).digest("hex");
}

/**
 * Build a file manifest from a directory (recursively)
 */
function buildFileManifest(baseDir: string): FileManifest {
    const manifest: FileManifest = {};

    function scanDirectory(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                scanDirectory(fullPath);
            } else if (entry.isFile()) {
                const relativePath = path
                    .relative(baseDir, fullPath)
                    .replace(/\\/g, "/");
                manifest[relativePath] = calculateFileHash(fullPath);
            }
        }
    }

    scanDirectory(baseDir);
    return manifest;
}

/**
 * Compare two ProjectInfo objects (excluding fileManifest)
 */
function projectInfoMatches(a: ProjectInfo | null, b: ProjectInfo): boolean {
    if (!a) return false;
    return (
        a.lvglVersion === b.lvglVersion &&
        a.flowSupport === b.flowSupport &&
        a.projectDir === b.projectDir &&
        a.destinationFolder === b.destinationFolder &&
        a.displayWidth === b.displayWidth &&
        a.displayHeight === b.displayHeight &&
        a.encoderGroup === b.encoderGroup &&
        a.keyboardGroup === b.keyboardGroup &&
        JSON.stringify(a.fonts) === JSON.stringify(b.fonts)
    );
}

/**
 * Build ProjectInfo from project data (either from JSON file or in-memory project)
 * @param projectData The project data object (same structure in JSON and memory)
 * @param projectDir The project directory path
 * @param log Logging function
 */
export function buildProjectInfoFromProjectData(
    projectData: any,
    projectDir: string,
    log: LogFunction
): ProjectInfo {
    let lvglVersion = projectData.settings?.general?.lvglVersion;
    const flowSupport = projectData.settings?.general?.flowSupport || false;
    const displayWidth = projectData.settings?.general?.displayWidth || 800;
    const displayHeight = projectData.settings?.general?.displayHeight || 480;
    const destinationFolder =
        projectData.settings?.build?.destinationFolder || "src/ui";

    if (!lvglVersion) {
        throw new Error(t("LVGL version not specified in project settings"));
    }

    // Map unsupported versions to supported ones
    const versionMap: Record<string, string> = {
        "8.3": "8.4.0",
        "8.3.0": "8.4.0",
        "9.0": "9.2.2",
        "9.0.0": "9.2.2"
    };

    if (versionMap[lvglVersion]) {
        log(
            t("LVGL version {from} mapped to {to}", { from: lvglVersion, to: versionMap[lvglVersion] }),
            "info"
        );
        lvglVersion = versionMap[lvglVersion];
    }

    const normalizedDestination = destinationFolder.replace(/\\/g, "/");
    const uiDir = path.join(projectDir, normalizedDestination);

    // Check if destination folder exists
    if (!fs.existsSync(uiDir)) {
        throw new Error(t("Build destination directory not found at: {dir}", { dir: uiDir }));
    }

    // Parse fonts
    const fonts: FontInfo[] = [];
    if (projectData.fonts && Array.isArray(projectData.fonts)) {
        for (const font of projectData.fonts) {
            if (font.lvglUseFreeType === true) {
                const localFontPath = path.join(
                    projectDir,
                    font.source.filePath.replace(/\\/g, "/")
                );
                const targetFontPath = font.lvglFreeTypeFilePath;
                const fontFileName = path.basename(localFontPath);

                // Validate that font file exists
                if (!fs.existsSync(localFontPath)) {
                    log(
                        t("Warning: Font file not found: {path}", { path: localFontPath }),
                        "warning"
                    );
                    continue;
                }

                fonts.push({
                    localPath: localFontPath,
                    targetPath: targetFontPath,
                    fileName: fontFileName
                });

                log(
                    t("Found FreeType font: {name} -> {target}", { name: fontFileName, target: targetFontPath })
                );
            }
        }
    }

    if (fonts.length > 0) {
        log(t("Total FreeType fonts to include: {count}", { count: fonts.length }), "success");
    }

    // Parse lvglGroups for encoder and keyboard group settings
    const encoderGroup =
        projectData.lvglGroups?.defaultGroupForEncoderInSimulator;
    const keyboardGroup =
        projectData.lvglGroups?.defaultGroupForKeyboardInSimulator;

    if (encoderGroup) {
        log(t("Encoder group: {name}", { name: encoderGroup }));
    }
    if (keyboardGroup) {
        log(t("Keyboard group: {name}", { name: keyboardGroup }));
    }

    log(
        flowSupport
            ? t("Detected project: LVGL {version} (with flow support)", {
                  version: lvglVersion
              })
            : t("Detected project: LVGL {version} (no flow support)", {
                  version: lvglVersion
              }),
        "success"
    );
    log(t("Display: {width}x{height}", { width: displayWidth, height: displayHeight }));
    log(t("UI directory: {dir}", { dir: uiDir }));

    // Build file manifest for incremental builds
    log(t("Building file manifest..."));
    const fileManifest = buildFileManifest(uiDir);
    const fileCount = Object.keys(fileManifest).length;
    log(t("Tracked {count} source file(s)", { count: fileCount }));

    return {
        lvglVersion,
        flowSupport,
        projectDir,
        uiDir,
        destinationFolder: normalizedDestination,
        displayWidth,
        displayHeight,
        fonts,
        encoderGroup,
        keyboardGroup,
        fileManifest
    };
}

/**
 * Read and parse the EEZ project file
 */
export async function readProjectFile(
    projectPath: string,
    log: LogFunction
): Promise<ProjectInfo> {
    log(t("Reading project file: {path}", { path: projectPath }));

    if (!fs.existsSync(projectPath)) {
        throw new Error(t("Project file not found: {path}", { path: projectPath }));
    }

    const content = fs.readFileSync(projectPath, "utf8");
    const projectData = JSON.parse(content);
    const projectDir = path.dirname(projectPath);

    return buildProjectInfoFromProjectData(projectData, projectDir, log);
}

/**
 * Run a command and return the result
 */
function runCommand(
    command: string,
    args: string[],
    cwd: string | undefined,
    env: Record<string, string> | undefined,
    log: LogFunction,
    skipStdoutLogging: boolean = false
): Promise<CommandResult> {
    return new Promise(resolve => {
        // Check if abort was requested before starting
        if (abortRequested) {
            resolve({
                success: false,
                error: t("Operation aborted by user")
            });
            return;
        }

        const effectiveCommand = resolveCommand(command);

        log(t("Running: {command}", { command: `${command} ${args.join(" ")}` }));

        const mergedEnv = { ...process.env, ...env };
        const proc = spawn(effectiveCommand, args, {
            cwd: cwd || process.cwd(),
            env: mergedEnv,
            shell: true
        });

        // Track this process
        runningProcesses.push(proc);

        let stdout = "";
        let stderr = "";

        if (!skipStdoutLogging) {
            proc.stdout?.on("data", data => {
                const text = data.toString();
                stdout += text;
                // Log each line to the UI
                const lines = text.split("\n");
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed) {
                        log(trimmed);
                    }
                }
            });
        }

        proc.stderr?.on("data", data => {
            const text = data.toString();
            stderr += text;
            // Filter out Docker noise and log to UI
            if (!shouldFilterDockerMessage(text)) {
                const lines = text.split("\n");
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed) {
                        log(trimmed, "warning");
                    }
                }
            }
        });

        proc.on("close", code => {
            // Remove from tracking
            const index = runningProcesses.indexOf(proc);
            if (index > -1) runningProcesses.splice(index, 1);

            if (abortRequested) {
                resolve({
                    success: false,
                    error: t("Operation aborted by user")
                });
            } else {
                resolve({
                    success: code === 0,
                    output: stdout,
                    error: stderr
                });
            }
        });

        proc.on("error", error => {
            // Remove from tracking
            const index = runningProcesses.indexOf(proc);
            if (index > -1) runningProcesses.splice(index, 1);

            resolve({
                success: false,
                error: error.message
            });
        });
    });
}

/**
 * Run a command silently (suppress output)
 */
function runCommandSilent(
    command: string,
    args: string[],
    cwd: string | undefined,
    env: Record<string, string> | undefined
): Promise<CommandResult> {
    return new Promise(resolve => {
        const effectiveCommand = resolveCommand(command);
        const mergedEnv = { ...process.env, ...env };
        const proc = spawn(effectiveCommand, args, {
            cwd: cwd || process.cwd(),
            env: mergedEnv,
            shell: true,
            stdio: "pipe"
        });

        let stdout = "";
        let stderr = "";

        proc.stdout?.on("data", data => {
            stdout += data.toString();
        });

        proc.stderr?.on("data", data => {
            stderr += data.toString();
        });

        proc.on("close", code => {
            resolve({
                success: code === 0,
                output: stdout,
                error: stderr
            });
        });

        proc.on("error", error => {
            resolve({
                success: false,
                error: error.message
            });
        });
    });
}

/**
 * Filter out Docker noise messages
 */
function shouldFilterDockerMessage(text: string): boolean {
    const filters = [
        "Found orphan containers",
        "Container docker-build-emscripten-build-run-",
        "Container ID:",
        "--remove-orphans flag",
        "cache:INFO"
    ];

    if (filters.some(filter => text.includes(filter))) {
        return true;
    }

    // Filter out 64-character container IDs (hex strings on their own line)
    const isContainerId = /^[a-f0-9]{64}$/.test(text.trim());
    return isContainerId;
}

/**
 * Check if Docker is installed and running
 */
export async function checkDocker(log: LogFunction): Promise<boolean> {
    log(t("Checking Docker status..."));

    const dockerCommand = getDockerCommandPath();
    if (!dockerCommand) {
        log(t("Docker is not installed. Please install Docker Desktop."), "error");
        return false;
    }

    // Check if Docker daemon is running
    let psResult = spawnSync(dockerCommand, ["ps"], {
        shell: false,
        stdio: "pipe"
    });

    if (psResult.status !== 0 && dockerCommand === "docker") {
        psResult = spawnSync(dockerCommand, ["ps"], {
            shell: true,
            stdio: "pipe"
        });
    }

    if (psResult.status !== 0) {
        log(t("Docker is not running. Please start Docker Desktop."), "error");
        return false;
    }

    log(t("Docker is ready."), "success");
    return true;
}

/**
 * Create a temporary Docker container
 */
async function createTempContainer(
    config: BuildConfig,
    env: Record<string, string>,
    log: LogFunction
): Promise<string> {
    const result = await runCommandSilent(
        "docker",
        ["compose", "run", "-d", "emscripten-build", "sleep", "infinity"],
        config.dockerBuildPath,
        env
    );

    if (!result.success || !result.output) {
        if (result.error) {
            log(t("Container creation error: {error}", { error: result.error ?? "" }), "error");
        }
        throw new Error(t("Failed to create temporary container"));
    }

    const containerId = result.output.trim();

    // Track container ID for abort handling
    currentContainerId = containerId;

    return containerId;
}

/**
 * Setup the Docker environment and project files
 */
export async function setupProject(
    projectInfo: ProjectInfo,
    config: BuildConfig,
    log: LogFunction
): Promise<{ skipEmcmakeCmake: boolean }> {
    const startTime = Date.now();
    log(t("=== Step 1/3: Setup ==="));

    if (abortRequested) {
        throw new Error(t("Operation aborted by user"));
    }

    const env = { PROJECT_VOLUME: config.dockerVolumeName };

    // Check if we can do incremental setup
    const canDoIncremental =
        lastProjectInfo &&
        projectInfoMatches(lastProjectInfo, projectInfo) &&
        lastProjectInfo.fileManifest &&
        projectInfo.fileManifest;

    if (canDoIncremental) {
        log(
            t("Project configuration unchanged, performing incremental update..."),
            "info"
        );
        log(t("LVGL version: {version}", { version: projectInfo.lvglVersion }), "info");
        const result = await incrementalSetup(
            projectInfo,
            lastProjectInfo!,
            config,
            env,
            log
        );
        lastProjectInfo = projectInfo;
        return result;
    }

    log(t("Performing full setup..."));

    // Step 1: Build Docker image
    log(t("Building Docker image..."));
    let result = await runCommand(
        "docker",
        ["compose", "build"],
        config.dockerBuildPath,
        env,
        log,
        true
    );
    if (!result.success) {
        if (result.error) {
            log(t("Docker build error: {error}", { error: result.error ?? "" }), "error");
        }
        throw new Error(t("Failed to build Docker image"));
    }
    log(t("Docker image built successfully."), "success");

    // Step 1.5: Clean src directory first to remove any leftover files
    log(t("Cleaning src directory..."));
    result = await runCommandSilent(
        "docker",
        ["compose", "run", "--rm", "emscripten-build", "rm", "-rf", "/project/src"],
        config.dockerBuildPath,
        env
    );
    // Ignore errors if src doesn't exist yet

    // Step 2: Check if volume exists and has content
    log(t("Checking if project is already set up..."));
    result = await runCommandSilent(
        "docker",
        ["compose", "run", "--rm", "emscripten-build", "test", "-f", "/project/build.sh"],
        config.dockerBuildPath,
        env
    );

    const projectAlreadySetup = result.success;

    let containerId: string | undefined;

    if (!projectAlreadySetup) {
        // Step 3: Clone repository (only on first setup)
        log(t("First-time setup: Cloning repository from GitHub..."));
        log(t("Note: This can take several minutes, especially while cloning the LVGL submodule."), "info");

        containerId = await createTempContainer(config, env, log);

        result = await runCommand(
            "docker",
            [
                "exec",
                containerId,
                "sh",
                "-c",
                `"cd /project && git clone --recursive https://github.com/eez-open/${config.repositoryName} ."`
            ],
            config.dockerBuildPath,
            env,
            log
        );

        if (!result.success) {
            await runCommand(
                "docker",
                ["stop", containerId],
                config.dockerBuildPath,
                env,
                log
            );
            throw new Error(t("Git clone failed"));
        }

        log(t("Repository cloned successfully."), "success");
    } else {
        log(t("Project already exists in Docker volume. Checking for updates..."));

        // Pull latest changes from GitHub
        log(t("Pulling latest changes from GitHub..."));

        result = await runCommand(
            "docker",
            [
                "compose",
                "run",
                "--rm",
                "emscripten-build",
                "sh",
                "-c",
                '"cd /project && git pull"'
            ],
            config.dockerBuildPath,
            env,
            log
        );

        if (!result.success) {
            log(t("Git pull failed, continuing with existing code..."), "warning");
        } else {
            log(t("Latest changes pulled successfully."), "success");
        }
    }

    // Step 4: Update build files
    log(t("Updating build files..."));
    if (!containerId) {
        containerId = await createTempContainer(config, env, log);
    }

    // Remove and recreate src directory
    log(t("Preparing src directory..."));
    await runCommand(
        "docker",
        [
            "exec",
            containerId,
            "sh",
            "-c",
            '"rm -rf /project/src && mkdir -p /project/src"'
        ],
        config.dockerBuildPath,
        env,
        log
    );

    // Copy build destination directory
    if (!projectInfo.uiDir) {
        await runCommand(
            "docker",
            ["stop", containerId],
            config.dockerBuildPath,
            env,
            log
        );
        throw new Error(t("UI directory path is missing"));
    }

    if (!fs.existsSync(projectInfo.uiDir)) {
        await runCommand(
            "docker",
            ["stop", containerId],
            config.dockerBuildPath,
            env,
            log
        );
        throw new Error(t("UI directory not found: {dir}", { dir: projectInfo.uiDir }));
    }

    const resolvedUiDir = path.resolve(projectInfo.uiDir);
    log(t("Copying {dir} to container...", { dir: resolvedUiDir }));

    // Copy contents of destination folder directly into /project/src/
    // Quote the source path to handle paths with spaces
    result = await runCommand(
        "docker",
        ["cp", `"${resolvedUiDir}/."`, `${containerId}:/project/src/`],
        config.dockerBuildPath,
        env,
        log
    );

    if (!result.success) {
        await runCommand(
            "docker",
            ["stop", containerId],
            config.dockerBuildPath,
            env,
            log
        );
        throw new Error(t("Failed to copy build destination directory"));
    }

    // Update timestamps to ensure CMake detects changes
    await runCommand(
        "docker",
        [
            "exec",
            containerId,
            "sh",
            "-c",
            "\"find /project/src -type f \\( -name '*.cpp' -o -name '*.c' -o -name '*.h' \\) -exec touch {} +\""
        ],
        config.dockerBuildPath,
        env,
        log
    );

    // Copy fonts if any are specified
    if (projectInfo.fonts && projectInfo.fonts.length > 0) {
        log(t("Copying {count} font(s) to container...", { count: projectInfo.fonts.length }));

        // Create fonts directory in container
        await runCommand(
            "docker",
            ["exec", containerId, "mkdir", "-p", "/project/fonts"],
            config.dockerBuildPath,
            env,
            log
        );

        // Copy each font file
        for (const font of projectInfo.fonts) {
            log(t("Copying font: {name}", { name: font.fileName }));

            // Determine target directory from targetPath
            const targetDir = path.posix.dirname(font.targetPath);
            const targetFileName = path.posix.basename(font.targetPath);

            // Create target directory structure in container
            await runCommand(
                "docker",
                ["exec", containerId, "mkdir", "-p", `/project${targetDir}`],
                config.dockerBuildPath,
                env,
                log
            );

            // Copy the font file to the container
            // Quote the source path to handle paths with spaces
            result = await runCommand(
                "docker",
                [
                    "cp",
                    `"${font.localPath}"`,
                    `${containerId}:/project${targetDir}/${targetFileName}`
                ],
                config.dockerBuildPath,
                env,
                log
            );

            if (!result.success) {
                await runCommand(
                    "docker",
                    ["stop", containerId],
                    config.dockerBuildPath,
                    env,
                    log
                );
                throw new Error(t("Failed to copy font file: {name}", { name: font.fileName }));
            }
        }

        // Create fonts manifest file for build.sh
        const fontsManifest = projectInfo.fonts
            .map(f => f.targetPath)
            .join("\n");
        const manifestContent = Buffer.from(fontsManifest).toString("base64");

        await runCommand(
            "docker",
            [
                "exec",
                containerId,
                "sh",
                "-c",
                `"echo '${manifestContent}' | base64 -d > /project/fonts.txt"`
            ],
            config.dockerBuildPath,
            env,
            log
        );

        log(t("Fonts manifest created: /project/fonts.txt"), "success");
    }

    // Stop container
    await runCommand(
        "docker",
        ["stop", containerId],
        config.dockerBuildPath,
        env,
        log
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(t("Setup completed successfully in {duration}s!", { duration }), "success");

    // Store project info for next build
    lastProjectInfo = projectInfo;

    return { skipEmcmakeCmake: false };
}

/**
 * Perform incremental setup (only update changed files)
 */
async function incrementalSetup(
    projectInfo: ProjectInfo,
    lastProjectInfo: ProjectInfo,
    config: BuildConfig,
    env: Record<string, string>,
    log: LogFunction
): Promise<{ skipEmcmakeCmake: boolean }> {
    const startTime = Date.now();

    const oldManifest = lastProjectInfo.fileManifest!;
    const newManifest = projectInfo.fileManifest!;

    // Find added, modified, and deleted files
    const addedFiles: string[] = [];
    const modifiedFiles: string[] = [];
    const deletedFiles: string[] = [];

    // Check for added and modified files
    for (const [file, hash] of Object.entries(newManifest)) {
        if (!oldManifest[file]) {
            addedFiles.push(file);
        } else if (oldManifest[file] !== hash) {
            modifiedFiles.push(file);
        }
    }

    // Check for deleted files
    for (const file of Object.keys(oldManifest)) {
        if (!newManifest[file]) {
            deletedFiles.push(file);
        }
    }

    const totalChanges =
        addedFiles.length + modifiedFiles.length + deletedFiles.length;

    if (totalChanges === 0) {
        log(t("No file changes detected, skipping setup."), "success");
        return { skipEmcmakeCmake: true };
    }

    log(
        t("Detected changes: {added} added, {modified} modified, {deleted} deleted", { added: addedFiles.length, modified: modifiedFiles.length, deleted: deletedFiles.length })
    );

    // Log detailed file changes for debugging
    if (addedFiles.length > 0) {
        log(t("Added files: {files}", { files: addedFiles.join(", ") }));
    }
    if (modifiedFiles.length > 0) {
        log(t("Modified files: {files}", { files: modifiedFiles.join(", ") }));
    }
    if (deletedFiles.length > 0) {
        log(t("Deleted files: {files}", { files: deletedFiles.join(", ") }));
    }

    // Create temp container for file operations
    const containerId = await createTempContainer(config, env, log);

    try {
        // Handle deleted files - batch all deletes into single command
        if (deletedFiles.length > 0) {
            log(t("Removing {count} deleted file(s)...", { count: deletedFiles.length }));
            const deleteCommands = deletedFiles
                .map(file => `rm -f "/project/src/${file}"`)
                .join(" && ");

            await runCommand(
                "docker",
                ["exec", containerId, "sh", "-c", deleteCommands],
                config.dockerBuildPath,
                env,
                log
            );
        }

        // Handle added and modified files
        const changedFiles = [...addedFiles, ...modifiedFiles];
        if (changedFiles.length > 0) {
            log(t("Copying {count} added/modified file(s)...", { count: changedFiles.length }));

            // Collect all unique parent directories
            const parentDirs = new Set<string>();
            for (const file of changedFiles) {
                const containerPath = `/project/src/${file}`;
                const parentDir = path.posix.dirname(containerPath);
                parentDirs.add(parentDir);
            }

            // Create all parent directories in a single command
            if (parentDirs.size > 0) {
                const mkdirCommands = Array.from(parentDirs)
                    .map(dir => `mkdir -p "${dir}"`)
                    .join(" && ");

                await runCommand(
                    "docker",
                    ["exec", containerId, "sh", "-c", mkdirCommands],
                    config.dockerBuildPath,
                    env,
                    () => {} // Silent
                );
            }

            // Copy files (must be done individually as docker cp runs outside container)
            for (const file of changedFiles) {
                const localPath = path.join(projectInfo.uiDir, file);
                const containerPath = `/project/src/${file}`;

                const result = await runCommand(
                    "docker",
                    ["cp", `"${localPath}"`, `${containerId}:${containerPath}`],
                    config.dockerBuildPath,
                    env,
                    log
                );

                if (!result.success) {
                    throw new Error(t("Failed to copy file: {file}", { file }));
                }
            }

            // Update timestamps on all copied files in a single command
            log(t("Updating timestamps on {count} file(s)...", { count: changedFiles.length }));
            const touchCommands = changedFiles
                .map(file => `touch "/project/src/${file}"`)
                .join(" && ");

            await runCommand(
                "docker",
                ["exec", containerId, "sh", "-c", touchCommands],
                config.dockerBuildPath,
                env,
                () => {} // Silent
            );
        }

        // Stop container
        await runCommand(
            "docker",
            ["stop", containerId],
            config.dockerBuildPath,
            env,
            log
        );

        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        log(t("Incremental setup completed in {duration}s!", { duration }), "success");

        // Skip emcmake/cmake if only files were modified (no adds/deletes)
        const skipEmcmakeCmake =
            addedFiles.length === 0 && deletedFiles.length === 0;
        if (skipEmcmakeCmake) {
            log(
                t("Only file modifications detected, build will skip CMake reconfiguration")
            );
        }

        return { skipEmcmakeCmake };
    } catch (error) {
        // Cleanup on error
        await runCommand(
            "docker",
            ["stop", containerId],
            config.dockerBuildPath,
            env,
            () => {}
        );
        throw error;
    }
}

/**
 * Build the project using Emscripten
 */
export async function buildProject(
    projectInfo: ProjectInfo,
    config: BuildConfig,
    log: LogFunction,
    skipEmcmakeCmake: boolean = false
): Promise<void> {
    const startTime = Date.now();
    log(t("=== Step 2/3: Build ==="));

    if (abortRequested) {
        throw new Error(t("Operation aborted by user"));
    }

    const env = { PROJECT_VOLUME: config.dockerVolumeName };

    log(
        t("Starting build (LVGL {version}, {width}x{height})...", { version: projectInfo.lvglVersion, width: projectInfo.displayWidth, height: projectInfo.displayHeight })
    );

    // Use the build.sh script with parameters
    let buildCommand = `"./build.sh --lvgl=${projectInfo.lvglVersion} --display-width=${projectInfo.displayWidth} --display-height=${projectInfo.displayHeight}`;

    // Skip CMake reconfiguration if only files were modified
    if (skipEmcmakeCmake) {
        buildCommand += " --skip-emcmake-cmake";
        log(
            t("Build will skip CMake reconfiguration (incremental build)"),
            "info"
        );
    }

    // Add fonts parameter if fonts are present
    if (projectInfo.fonts && projectInfo.fonts.length > 0) {
        buildCommand += " --fonts=/project/fonts.txt";
    }

    // Add encoder group parameter if specified
    if (projectInfo.encoderGroup) {
        buildCommand += ` --encoder-group=groups.${projectInfo.encoderGroup}`;
    }

    // Add keyboard group parameter if specified
    if (projectInfo.keyboardGroup) {
        buildCommand += ` --keyboard-group=groups.${projectInfo.keyboardGroup}`;
    }

    buildCommand += '"';

    const result = await runCommand(
        "docker",
        ["compose", "run", "--rm", "emscripten-build", "sh", "-c", buildCommand],
        config.dockerBuildPath,
        env,
        log
    );

    if (!result.success) {
        throw new Error(t("Build failed"));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(t("Build completed successfully in {duration}s!", { duration }), "success");
}

/**
 * Extract build output from Docker volume
 */
export async function extractBuild(
    outputPath: string,
    config: BuildConfig,
    log: LogFunction
): Promise<void> {
    const startTime = Date.now();
    log(t("=== Step 3/3: Extract ==="));

    if (abortRequested) {
        throw new Error(t("Operation aborted by user"));
    }

    const env = { PROJECT_VOLUME: config.dockerVolumeName };

    log(t("Output path: {path}", { path: outputPath }));

    // Clean output directory first
    log(t("Cleaning output directory..."));
    if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true, force: true });
        log(t("Output directory cleaned."));
    }

    // Create fresh output directory
    fs.mkdirSync(outputPath, { recursive: true });

    log(t("Extracting build files from Docker volume..."));

    // Create temp container and copy files
    const containerId = await createTempContainer(config, env, log);

    const requiredFiles = ["index.html", "index.js", "index.wasm"];
    const optionalFiles = ["index.data"];
    const files = [...requiredFiles, ...optionalFiles];

    for (const file of files) {
        const isOptional = optionalFiles.includes(file);

        // For optional files, check if they exist first to avoid error messages
        if (isOptional) {
            const checkResult = await runCommand(
                "docker",
                ["exec", containerId, "test", "-f", `/project/build/${file}`],
                config.dockerBuildPath,
                env,
                () => {} // Silent check
            );
            if (!checkResult.success) {
                log(t("{file} not found (optional file, skipping)", { file }));
                continue;
            }
        }

        const destPath = path.join(outputPath, file);
        // Quote the destination path to handle paths with spaces
        const result = await runCommand(
            "docker",
            ["cp", `${containerId}:/project/build/${file}`, `"${destPath}"`],
            config.dockerBuildPath,
            env,
            log
        );

        if (!result.success) {
            await runCommand(
                "docker",
                ["stop", containerId],
                config.dockerBuildPath,
                env,
                log
            );
            throw new Error(t("Failed to extract {file}", { file }));
        }

        // Log file info
        try {
            const stats = fs.statSync(destPath);
            log(t("Extracted {file}: {size} bytes", { file, size: stats.size }));
        } catch (err) {
            log(t("Could not stat {file}: {err}", { file, err: (err as Error).message }), "warning");
        }
    }

    await runCommand(
        "docker",
        ["stop", containerId],
        config.dockerBuildPath,
        env,
        log
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(t("Build files extracted successfully in {duration}s!", { duration }), "success");
}

/**
 * Clean build directory
 */
export async function cleanBuild(
    config: BuildConfig,
    log: LogFunction
): Promise<void> {
    const startTime = Date.now();
    log(t("=== Clean Build Directory ==="));

    const env = { PROJECT_VOLUME: config.dockerVolumeName };

    log(t("Removing build directory..."));

    const result = await runCommand(
        "docker",
        ["compose", "run", "--rm", "emscripten-build", "rm", "-rf", "/project/build"],
        config.dockerBuildPath,
        env,
        log
    );

    if (!result.success) {
        throw new Error(t("Clean build failed"));
    }

    // Reset incremental build state since build artifacts are gone
    lastProjectInfo = null;

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(t("Build directory cleaned in {duration}s!", { duration }), "success");
}

/**
 * Clean all (delete entire /project directory for fresh start)
 */
export async function cleanAll(
    config: BuildConfig,
    log: LogFunction
): Promise<void> {
    const startTime = Date.now();
    log(t("=== Clean All ==="));

    const env = { PROJECT_VOLUME: config.dockerVolumeName };

    log(t("Removing all contents from /project directory..."));

    const result = await runCommand(
        "docker",
        [
            "compose",
            "run",
            "--rm",
            "emscripten-build",
            "sh",
            "-c",
            '"rm -rf /project/* /project/.*[!.]*"'
        ],
        config.dockerBuildPath,
        env,
        log
    );

    if (!result.success) {
        throw new Error(t("Clean all failed"));
    }

    // Reset incremental build state since everything is gone
    lastProjectInfo = null;

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(
        t("Project directory cleaned in {duration}s. Next build will start from scratch.", { duration }),
        "success"
    );
}
