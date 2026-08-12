/**
 * Build Manager for Docker Simulator
 *
 * Orchestrates the Docker-based build process for LVGL projects,
 * integrating with the EEZ Studio UI to show progress and logs.
 *
 * Multiple projects can be in Full Simulator mode simultaneously.
 * Each project has its own logs, preview state, and preview logs.
 * Build operations are mutually exclusive - only one project can build at a time.
 */

import * as path from "path";
import * as fs from "fs";
import { runInAction } from "mobx";
import { app } from "@electron/remote";

import { t } from "eez-studio-shared/i18n";

import type { ProjectStore } from "project-editor/store";
import { Section } from "project-editor/store/output-sections";
import {
    BuildConfig,
    ProjectInfo,
    buildProjectInfoFromProjectData,
    checkDocker,
    setupProject,
    buildProject,
    extractBuild,
    cleanBuild,
    cleanAll,
    abortBuild,
    resetAbort,
    stopRunningContainers
} from "./docker-build-lib";
import { previewServer } from "./preview-server";
import { dockerBuildState, LogType } from "./docker-build-state";

////////////////////////////////////////////////////////////////////////////////

/**
 * Create a log function for a specific project
 */
function createLogFunction(projectPath: string | undefined) {
    return (message: string, type?: LogType) => {
        runInAction(() => {
            dockerBuildState.getProjectState(projectPath).addLog(message, type || "info");
        });
    };
}

////////////////////////////////////////////////////////////////////////////////

export class DockerBuildManager {
    /**
     * Reset the simulator state for a project (call when project is closed)
     */
    resetSimulatorState(projectPath?: string): void {
        if (projectPath) {
            dockerBuildState.removeProjectState(projectPath);
        }
    }

    /**
     * Get the path to the docker-build resources
     */
    private getDockerBuildPath(): string {
        const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

        if (isDev) {
            return path.join(__dirname, "../../../../resources/docker-build");
        } else {
            return path.join(process.resourcesPath, "docker-build");
        }
    }

    /**
     * Get the build configuration
     */
    private getBuildConfig(): BuildConfig {
        return {
            repositoryName: "lvgl-simulator-for-studio-docker-build",
            dockerVolumeName: "eez-studio-lvgl-build",
            dockerBuildPath: this.getDockerBuildPath()
        };
    }

    /**
     * Get the build output path for a project
     */
    private getBuildOutputPath(projectStore: ProjectStore): string {
        if (!projectStore.filePath) {
            throw new Error(t("Project must be saved before building"));
        }

        const projectDir = path.dirname(projectStore.filePath);
        return path.join(projectDir, ".docker-build-output");
    }

    /**
     * Build ProjectInfo from in-memory projectStore
     */
    private buildProjectInfo(
        projectStore: ProjectStore,
        logFn: (message: string, type?: LogType) => void
    ): ProjectInfo {
        if (!projectStore.filePath) {
            throw new Error(t("Project must be saved before building"));
        }

        const projectData = projectStore.project;
        const projectDir = path.dirname(projectStore.filePath);

        return buildProjectInfoFromProjectData(projectData, projectDir, logFn);
    }

    /**
     * Check if the Docker build resources exist
     */
    private checkDockerBuildResources(): boolean {
        const dockerBuildPath = this.getDockerBuildPath();
        const dockerfilePath = path.join(dockerBuildPath, "Dockerfile");
        const composePath = path.join(dockerBuildPath, "docker-compose.yml");

        return fs.existsSync(dockerfilePath) && fs.existsSync(composePath);
    }

    /**
     * Check if valid build output exists
     */
    private hasBuildOutput(outputPath: string): boolean {
        const requiredFiles = ["index.html", "index.js", "index.wasm"];
        return requiredFiles.every(file =>
            fs.existsSync(path.join(outputPath, file))
        );
    }

    /**
     * Start the full simulator - enter Full Sim mode for a project.
     * If preview exists, show it immediately.
     * If no preview exists, start build (if no other build is running).
     */
    async startFullSimulator(
        projectStore: ProjectStore,
        forceRebuild: boolean = false
    ): Promise<void> {
        const projectPath = projectStore.filePath;
        const projectState = dockerBuildState.getProjectState(projectPath);
        const logFn = createLogFunction(projectPath);

        // Check if project is saved
        if (!projectPath) {
            logFn(t("Please save the project before running the full simulator"), "error");
            return;
        }

        const outputPath = this.getBuildOutputPath(projectStore);
        const hasOutput = this.hasBuildOutput(outputPath);

        // Check if a build is already in progress for THIS project
        const isBuildingThisProject =
            dockerBuildState.isBuilding &&
            dockerBuildState.currentBuildingProjectPath === projectPath;
        if (isBuildingThisProject) {
            return;
        }

        // If we have build output and not forcing rebuild, show preview immediately
        if (hasOutput && !forceRebuild) {
            logFn(t("=== Starting Full Simulator ==="), "info");
            logFn(t("Starting preview server..."), "info");
            let previewUrl
            try {
                previewUrl = await previewServer.start(outputPath);
            } catch (error) {
                projectState.setError(t("Error starting preview server: {error}", { error }));
                return;
            }
            logFn(t("Preview server running at {url}", { url: previewUrl }), "success");

            // Clear preview logs for new session
            projectState.clearPreviewLogs();

            runInAction(() => {
                projectState.setRunning(previewUrl);
            });

            logFn(t("=== Full Simulator Ready ==="), "success");
            return;
        }

        // No build output (or force rebuild) - need to build
        // Try to acquire build lock
        const canBuild = runInAction(() => dockerBuildState.startBuild(projectPath));

        if (!canBuild) {
            logFn(
                t("Build already in progress for another project: {name}. Please wait for it to complete.", { name: dockerBuildState.getBuildingProjectName() ?? "" }),
                "warning"
            );
            return;
        }

        // Reset abort state from any previous build
        resetAbort();

        if (previewServer.isRunning) {
            logFn(t("Stopping preview server..."), "info");
            await previewServer.stop();
            logFn(t("Preview server stopped"), "success");
        }        

        const startTime = Date.now();

        try {
            runInAction(() => {
                projectState.setBuilding(t("Initializing..."));
            });

            logFn(t("=== Starting Full Simulator Build ==="), "info");

            // Check Docker build resources
            if (!this.checkDockerBuildResources()) {
                throw new Error(
                    t("Docker build resources not found. Please ensure the docker-build folder is present.")
                );
            }

            // Check Docker
            runInAction(() => {
                projectState.setBuilding(t("Checking Docker..."));
            });

            const dockerReady = await checkDocker(logFn);
            if (!dockerReady) {
                throw new Error(
                    t("Docker is not available. Please install and start Docker Desktop.")
                );
            }

            if (dockerBuildState.isCancelled) return;

            // Build the EEZ project first
            runInAction(() => {
                projectState.setBuilding(t("Building EEZ project..."));
            });

            let lastRevisionStable = projectStore.lastRevisionStable;

            logFn(t("Building EEZ project..."), "info");
            await projectStore.build();

            // Check if build produced errors
            if (
                projectStore.outputSectionsStore.getSection(Section.OUTPUT)
                    .numErrors > 0
            ) {
                throw new Error(
                    t("EEZ project build failed with errors. Please fix the errors and try again.")
                );
            }

            logFn(t("EEZ project built successfully"), "success");

            if (dockerBuildState.isCancelled) return;

            // Build project info
            runInAction(() => {
                projectState.setBuilding(t("Reading project configuration..."));
            });

            const projectInfo = this.buildProjectInfo(projectStore, logFn);

            if (dockerBuildState.isCancelled) return;

            // Get build configuration
            const buildConfig = this.getBuildConfig();

            // Check if we need a clean build first (because another project
            // built and changed the shared Docker volume)
            if (projectState.needsCleanBuild) {
                runInAction(() => {
                    projectState.setBuilding(t("Cleaning build cache..."));
                });

                logFn(t("Another project has built since last build - performing clean build first..."), "info");
                await cleanBuild(buildConfig, logFn);

                if (dockerBuildState.isCancelled) return;
            }

            // Setup Docker project
            runInAction(() => {
                projectState.setBuilding(t("Setting up Docker environment..."));
            });

            const setupResult = await setupProject(
                projectInfo,
                buildConfig,
                logFn
            );

            if (dockerBuildState.isCancelled) return;

            // Build with Docker
            runInAction(() => {
                projectState.setBuilding(t("Building with Emscripten..."));
            });

            await buildProject(
                projectInfo,
                buildConfig,
                logFn,
                setupResult.skipEmcmakeCmake
            );

            if (dockerBuildState.isCancelled) return;

            // Extract build output
            runInAction(() => {
                projectState.setBuilding(t("Extracting build files..."));
            });

            await extractBuild(outputPath, buildConfig, logFn);

            if (dockerBuildState.isCancelled) return;

            // Track this build revision
            runInAction(() => {
                projectState.lastBuildRevision = lastRevisionStable;
            });

            // Mark build as complete (no longer needs clean build)
            dockerBuildState.markBuildComplete(projectPath);

            // Start preview server
            runInAction(() => {
                projectState.setBuilding(t("Starting preview server..."));
            });

            logFn(t("Starting preview server..."), "info");
            let previewUrl;
            try {
                previewUrl = await previewServer.start(outputPath);
            } catch (error) {
                projectState.setError(t("Error starting preview server: {error}", { error }));
                return;
            }
            logFn(t("Preview server running at {url}", { url: previewUrl }), "success");

            // Clear preview logs for new session
            projectState.clearPreviewLogs();

            runInAction(() => {
                projectState.setRunning(previewUrl);
            });

            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            logFn(t("=== Full Simulator Ready ({duration}s) ===", { duration }), "success");
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            logFn(t("Error: {error}", { error: errorMessage }), "error");

            runInAction(() => {
                projectState.setError(errorMessage);
            });
        } finally {
            runInAction(() => {
                dockerBuildState.endBuild();
            });
        }
    }

    /**
     * Leave Full Simulator UI mode without stopping the build.
     * Call this when user exits Full Sim mode but build should continue.
     */
    async leaveFullSimulatorUI(projectPath?: string) {
        if (!projectPath) {
            return;
        }
        const logFn = createLogFunction(projectPath);
        const projectState = dockerBuildState.getProjectState(projectPath);
        
        if (previewServer.isRunning) {
            logFn(t("Stopping preview server..."), "info");
            await previewServer.stop();
            logFn(t("Preview server stopped"), "success");

            runInAction(() => {
                projectState.setIdle();
            });        
        }
    }

    /**
     * Stop the full simulator for a specific project
     */
    async stopFullSimulator(projectPath?: string): Promise<void> {
        const logFn = createLogFunction(projectPath);
        const projectState = dockerBuildState.getProjectState(projectPath);

        // If this project is currently building, cancel it
        if (
            dockerBuildState.isBuilding &&
            dockerBuildState.currentBuildingProjectPath === projectPath
        ) {
            runInAction(() => {
                dockerBuildState.cancelBuild();
            });

            // Abort any running build processes
            abortBuild();

            // Stop any running Docker containers
            const buildConfig = this.getBuildConfig();
            await stopRunningContainers(buildConfig, logFn);
        }

        if (previewServer.isRunning) {
            logFn(t("Stopping preview server..."), "info");
            await previewServer.stop();
            logFn(t("Preview server stopped"), "success");
        }

        runInAction(() => {
            projectState.setIdle();
        });
    }

    /**
     * Rebuild the simulator
     */
    async rebuildFullSimulator(projectStore: ProjectStore): Promise<void> {
        await this.stopFullSimulator(projectStore.filePath);
        await this.startFullSimulator(projectStore, true);
    }

    /**
     * Clean the Docker build cache
     */
    async cleanBuildCache(projectStore: ProjectStore): Promise<void> {
        const logFn = createLogFunction(projectStore.filePath);

        if (dockerBuildState.isBuilding) {
            logFn(
                t("Cannot clean: build in progress for {name}. Please wait for it to complete.", { name: dockerBuildState.getBuildingProjectName() ?? "" }),
                "warning"
            );
            return;
        }

        try {
            resetAbort();

            const buildConfig = this.getBuildConfig();
            await stopRunningContainers(buildConfig, logFn);
            await cleanBuild(buildConfig, logFn);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            logFn(t("Clean failed: {error}", { error: errorMessage }), "error");
        }
    }

    /**
     * Clean all Docker resources for a fresh start
     */
    async cleanAll(projectStore: ProjectStore): Promise<void> {
        const logFn = createLogFunction(projectStore.filePath);

        if (dockerBuildState.isBuilding) {
            logFn(
                t("Cannot clean: build in progress for {name}. Please wait for it to complete.", { name: dockerBuildState.getBuildingProjectName() ?? "" }),
                "warning"
            );
            return;
        }

        try {
            resetAbort();

            const buildConfig = this.getBuildConfig();
            await stopRunningContainers(buildConfig, logFn);
            await cleanAll(buildConfig, logFn);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            logFn(t("Clean all failed: {error}", { error: errorMessage }), "error");
        }
    }
}

////////////////////////////////////////////////////////////////////////////////

// Singleton instance
export const dockerBuildManager = new DockerBuildManager();
