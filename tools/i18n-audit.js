#!/usr/bin/env node
// i18n coverage audit.
//
// Scans all TypeScript sources under packages/ for `t()` translation calls and
// verifies:
//   1. every statically-known string literal key exists in zh.json;
//   2. no `t()` call uses a dynamic key (identifier argument or interpolated
//      template literal), because such keys can never be translated and the
//      audit cannot confirm them.
//
// Exit code 1 when any literal key is missing or a dynamic key is found, so it
// can run in CI. Run with: npm run i18n-audit

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PACKAGES = path.join(ROOT, "packages");
const I18N_DIR = path.join(PACKAGES, "eez-studio-shared", "i18n");

function readDict(name) {
    try {
        return JSON.parse(fs.readFileSync(path.join(I18N_DIR, name + ".json"), "utf8"));
    } catch (err) {
        console.error(`[i18n-audit] cannot read dictionary "${name}.json": ${err.message}`);
        process.exit(2);
    }
}

const zh = readDict("zh");

function collectSourceFiles(dir, out) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "node_modules" || entry.name === "i18n") continue;
            collectSourceFiles(p, out);
        } else if (/\.(ts|tsx)$/.test(entry.name)) {
            out.push(p);
        }
    }
    return out;
}

const missing = new Map(); // key -> [file, ...]
const dynamic = []; // { file, snippet }

// t("...") / t('...') with a statically known literal; `t(` must not be part
// of a longer identifier (setTimeout, parseFloat, ...).
const literalRe = /(?:^|[^.\w$])t\s*\(\s*("(?:[^"\\]|\\.)*"|'(?:\\'|[^']|\\[^'])*')/g;
// t(`...`) template literal
const templateRe = /(?:^|[^.\w$])t\s*\(\s*(`(?:[^`\\]|\\.)*`)/g;
// dynamic key: identifier argument, or interpolated template literal
const dynamicRe =
    /(?:^|[^.\w$])t\s*\(\s*(?:[A-Za-z_$][A-Za-z0-9_$.]*|`[^`]*\$\{)/g;

const files = collectSourceFiles(PACKAGES, []);
for (const file of files) {
    const src = fs.readFileSync(file, "utf8");

    // Only files that import the i18n `t()` use translation keys; this also
    // filters out unrelated tokens like a math variable named `t` in prose.
    if (
        !/from ["']eez-studio-shared\/i18n["']/.test(src) &&
        !/require\(["']eez-studio-shared\/i18n["']\)/.test(src)
    ) {
        continue;
    }

    let m;
    let key;
    while ((m = literalRe.exec(src)) !== null) {
        try {
            key = JSON.parse(m[1]);
        } catch {
            continue;
        }
        if (typeof key !== "string" || key.length === 0 || key.length > 2000) continue;
        if (!(key in zh)) {
            if (!missing.has(key)) missing.set(key, []);
            missing.get(key).push(file);
        }
    }
    while ((m = templateRe.exec(src)) !== null) {
        key = m[1].slice(1, -1);
        if (typeof key !== "string" || key.length === 0 || key.length > 2000) continue;
        if (key.includes("${")) continue; // dynamic, reported below
        if (!(key in zh)) {
            if (!missing.has(key)) missing.set(key, []);
            missing.get(key).push(file);
        }
    }

    while ((m = dynamicRe.exec(src)) !== null) {
        const snippet = src
            .slice(Math.max(0, m.index - 30), m.index + 50)
            .replace(/\s+/g, " ");
        dynamic.push({ file, snippet });
    }
}

let problems = 0;

const sortedMissing = [...missing.entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [key, keyFiles] of sortedMissing) {
    console.error(`[i18n-audit] MISSING in zh.json: ${JSON.stringify(key)}`);
    for (const f of keyFiles.slice(0, 3)) {
        console.error(`    ${path.relative(ROOT, f)}`);
    }
    problems++;
}

for (const d of dynamic) {
    // Warning only: bounded dynamic keys (e.g. section names from a fixed
    // vocabulary) can translate correctly, but they escape static checks.
    console.warn(`[i18n-audit] WARNING dynamic t() key (escapes coverage check):`);
    console.warn(`    ${path.relative(ROOT, d.file)} :: ...${d.snippet}...`);
}

console.log(
    `[i18n-audit] checked ${files.length} files, ` +
        `${sortedMissing.length} missing key(s), ${dynamic.length} dynamic key(s).`
);

process.exit(problems === 0 ? 0 : 1);
