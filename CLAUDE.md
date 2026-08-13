# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**EEZ Studio** (`eezstudio`, package.json name) is a free/open-source (GPL-3.0) **Electron desktop app** that is:
- A low-code visual GUI/embedded development tool with **LVGL** support (generates C++ for STM32/Arduino targets).
- An **EEZ Flow** flowchart-based low-code programming environment.
- An **Instrument** (SCPI) test & measurement controller (serial/USB/Ethernet/VISA interfaces).

It is an Electron app, not a web app: an Electron **main** process (Node) and **renderer** process (React) run together in one package. The TypeScript source in `packages/` is compiled to `build/` which is the packaged app root.

## Build / run / test

Prerequisites: Node 16+, `node-gyp` (native modules `better-sqlite3`, `koffi`, `serialport`, `usb` are rebuilt on postinstall). Linux needs `build-essential libudev-dev libnss3`.

```bash
npm install          # runs electron-rebuild for native deps
npm run build        # full build: clean-build + tsc + gulp release + css + wasm + make-electron-builder-yml
npm start            # run in dev
npm run watch        # incremental: gulp debug (copy assets) + tsc --project tsconfig.dev.json
```

The core `build` pipeline: `tsc` compiles `packages/**/*.ts(x)` to `build/` using the import map (see Architecture), then `gulp release` copies remaining assets (`.less`, `.html`, `.wasm`) and minifies JS.

Run via VSCode: debug configs are in `.vscode/launch.json` — launch "Electron: Main" which also starts a renderer-debugger port (`--remote-debugging-port=9223`) for "Electron: Renderer" attach.

Packaging / distributables:

```bash
npm run pack              # electron-builder --dir (unpacked)
npm run dist              # platform installer via electron-builder
npm run dist-mac-arm64    # macOS arm64 (electron-builder-mac.yml)
```

**There is no test suite and no lint step.** The `npm run madge-*` scripts are dependency-cycle/graph analysis (recommended before large PRs — circular imports are a real hazard here), and `tsc` strictness (`noImplicitAny`, `strictNullChecks`, `noUnusedLocals`) is the primary correctness gate. After a `build-src` change, at minimum recompile with `tsc` (or `npm run watch`) to catch type errors.

## Architecture

### Import map / module resolution

`packages/` directory names are package-style import roots, NOT npm-linked scopes. Because `tsconfig.json` sets `"baseUrl": "./packages"`, any file under `packages/` is imported by its basename without a `packages/` prefix:

```ts
import { db } from "eez-studio-shared/db";       // baseUrl → packages/eez-studio-shared/db.ts
import { HomeTab } from "home/tabs-store";        // → packages/home/tabs-store.tsx
import { IEditor } from "eez-studio-types";        // → packages/eez-studio-types/index.d.ts
import * as HomeWindowModule from "main/home-window"; // → packages/main/home-window.ts
```

There are no node_modules packages named `home`, `main`, `instrument`, etc. — they are local source dirs under `packages/`. Go to Definition in VSCode resolves these via `tsconfig.json` `baseUrl`.

### Main vs renderer duality

Many modules serve **both** processes by branching on `isRenderer()` (from `eez-studio-shared/util-electron`). A key example is `eez-studio-shared/db.ts`: in the renderer it talks to SQLite over `ipcRenderer`; in the main process it calls `require("main/settings")` directly. `better-sqlite3` is the database (single `storage.db` per user data dir; path set in Settings). When editing any shared module, preserve this process duality.

### Top-level packages

- **`main/`** — Electron main process: `main.ts` (app bootstrap, single-instance lock, CLI flags like `--build-project`), `home-window.ts`, `menu.ts`, `settings.ts`, `setup.ts`.
- **`home/`** — the app's main renderer window (React). `app.tsx`, `main.tsx`, tab management (`tabs-store.ts`, `tabs-store-conf.ts`), extensions manager, history, open-projects.
- **`eez-studio-ui/`** — reusable React UI component library (tabs, toolbar, tree, table, dialogs, code editor) + flexlayout-based docking (`FlexLayout.tsx`).
- **`eez-studio-shared/`** — shared domain logic: database (`db.ts`, `db-query.ts`), store (`store.ts`), units, SCPI parser, validation, and the **extension system** (`extensions/`, `extension.ts`).
- **`project-editor/`** — the largest subsystem: the EEZ Studio Project editor (core object model, features, LVGL, flow). See below.
- **`instrument/`** — the SCPI instrument controller: instrument object model, connections (`connection/`), bb3-specific, SCPI parsing, import of IDF/IEXT.
- **`basic-measurements/`**, **`db-services/`**, **`pdf-services/`**, **`notebook/`**, **`shortcuts/`** — smaller feature packages.
- **`eez-studio-types/`** — shared TypeScript type definitions exported to `npm` for external Flow/extension consumers (published via `npm run publish-types`).

### `project-editor/` details (the most complex area)

- **`core/`** — the project object model: `object.ts` (base classes made observable with mobx), `objectAdapter.ts`, `dd.ts` (drag & drop), `search.ts`.
- **`project/`** — a concrete EEZ project: `project.tsx`, migration (`migrate-project.ts`), assets, context.
- **`store/`** — the mobx store that orchestrates project editor state: `index.ts` (ProjectStore), `commands.ts`, `features.ts`, `clipboard.ts`, `navigation.ts`, `layout-models.tsx`.
- **`features/`** — one folder per project feature (action, bitmap, changes, font, page, scpi, shortcuts, style, texts, variable, user-widget, micropython, readme, etc.). Features extend the project object model in a modular way (`extension-definitions/`).
- **`flow/`** — the EEZ Flow engine: flowchart components, expression language (peggy grammar), editor, debugger, runtime, `wasm` (the Flow interpreter compiled to WebAssembly).
- **`lvgl/`** — LVGL-specific: widget catalog, style definitions, theme, building to LVGL C code (`to-lvgl-code.ts`, `build.ts`), image conversion (`lv_img_conv`, `lv_img_conv_v9`), LVGL 8.x and 9.x version support, migration.
- **`eez-flow-lite/`** and **`eez-gui-lite/`** — the WASM-based runtimes that EEZ Studio embeds to run LVGL/Flow "previews" in a browser-like sandbox.

### Extension system

The app is extensible. `eez-studio-shared/extensions/extension.ts` defines the `ExtensionModule` shape (editors, home sections, dashboards, shortcuts, SCPI command help, etc.). 3rd-party extension folders are loaded from the user data dir, and internal packages register as extensions too (`setup.ts` in `main`). When adding a new feature area, look at how existing packages expose an `ExtensionModule` that `loadExtensions` picks up.

### State management & styling conventions

- **mobx** is the state layer (`configure({ enforceActions: "observed" })` in main, so state must be mutated via actions), with `mobx-react` `observer` components. Immutability-helper `update` is used for nested path updates.
- **React 18** + `react-dom/client` `createRoot`. Components frequently use Emotion (`@emotion/css`, `@emotion/react`).
- Styling is primarily **less** compiled to CSS: `eez-studio-ui/_stylesheets/main.less` (light) and `main-dark.less`. After adding/editing `.less`, run `npm run build-css`/`npm run build-dark-css` (included in `npm run build`).
- Code style: Prettier config in package.json (`printWidth: 80`, `tabWidth: 4`, `trailingComma: none`, `arrowParens: avoid`). 4-space indent (`.editorconfig`). Prefer explicit code over doc comments.

### Project layout & cross-cutting

- **`build/`** is the compiled output (gitignored, run from source root). Do not hand-edit it.
- **`libs/`** contains vendored third-party libs (e.g. `pdfjs`, `component-doc.js`, yaml) copied into the package — treat as read-only.
- **`resources/`** holds non-code resources shipped alongside the app: `eez-framework-amalgamation/` (the C++ source EEZ Studio generates as project output), `eez-gui-lite/`, `expression-grammar.pegjs` (Flow expression grammar).
- **`installation/`** generates packaging metadata (`make-electron-builder-yml.js`).
- **`tools/`** — helper utilities (`pubdoc` docs generator, `find-lvgl-functions`, `freetype-tools`).
- **`electron-builder.yml`** defines packaging (files/asar/extraResources) — the `extraResources` copy C sources that are expected at runtime.

## Workflow notes

- Large changes: run `npm run madge-circular` (or `madge-circular`) before finishing to catch import cycles; the codebase has history of circular-dependency issues.
- The `build` CSS step depends on native `pngquant-bin` — on some systems the packaged release needs it specific path handling in electron-builder.
- Version bumps: `version` field in `package.json` and `electron-builder-mac.yml`; release workflow in `.github/workflows/main.yml` builds on Windows + Ubuntu (Node 20) via `action-electron-builder`.
- This project tracks contributions under the C4.1 (C4) Collective Code Construction process — one concerns, single feature, atomic commits encouraged.

> Note: this workspace is under `LVGL/NS_Studio/studio` — a private fork/mirror of the `eez-open/studio` repository. Package name remains `eezstudio`; `lvgl` submodule support (LVGL 8.x/9.x) is a core focus area.
