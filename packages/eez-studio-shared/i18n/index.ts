import fs from "fs";
import * as path from "path";
import { observable, runInAction } from "mobx";

import { isRenderer } from "eez-studio-shared/util-electron";

////////////////////////////////////////////////////////////////////////////////

// 字典文件与本模块（build/eez-studio-shared/i18n/index.js）位于同一目录。
// 开发模式（build/eez-studio-shared/i18n）与打包模式（asar 内的 build/eez-studio-shared/i18n）
// 两种环境下 __dirname 都天然指向字典所在目录，无需推断 app path / isDev。
function getI18nFilePath(fileName: string) {
    return path.join(__dirname, fileName);
}

////////////////////////////////////////////////////////////////////////////////

function readDictionary(locale: string): Record<string, string> {
    try {
        const text = fs.readFileSync(getI18nFilePath(locale + ".json"), "utf-8");
        return JSON.parse(text) as Record<string, string>;
    } catch (err) {
        console.warn(`[i18n] failed to load dictionary for locale "${locale}"`, err);
        return {};
    }
}

let enDict: Record<string, string> = {};
let zhDict: Record<string, string> = {};
let dictionariesLoaded = false;

function ensureDictionariesLoaded() {
    if (!dictionariesLoaded) {
        dictionariesLoaded = true;
        enDict = readDictionary("en");
        zhDict = readDictionary("zh");
    }
}

export function loadDictionaries() {
    dictionariesLoaded = true;
    enDict = readDictionary("en");
    zhDict = readDictionary("zh");
}

////////////////////////////////////////////////////////////////////////////////

// 复刻 i10n.ts 的双进程分支模式（惰性 require，避免模块加载顺序问题）
let locale: string | undefined;

export function getCurrentLocale(): string {
    if (locale === undefined) {
        if (isRenderer()) {
            const { ipcRenderer } = require("electron");
            locale = ipcRenderer.sendSync("getLocale");
        } else {
            const { getLocale } = require("main/settings") as any;
            locale = getLocale();
        }
    }
    return locale!;
}

export const currentLocale = observable.box<string>(getCurrentLocale(), {
    name: "currentLocale"
});

export function setCurrentLocale(value: string) {
    runInAction(() => {
        locale = value;
        currentLocale.set(value);
    });
}

////////////////////////////////////////////////////////////////////////////////

function interpolate(text: string, vars?: Record<string, string | number>) {
    if (vars) {
        return text.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name) => {
            const value = (vars as any)[name];
            return value !== undefined ? String(value) : match;
        });
    }
    return text;
}

export function isChineseLocale(locale: string): boolean {
    // 兼容 "zh"、"zh-CN"、"zh-TW"、"zh-Hans"、"zh-Hant"、"zh_CN" 等 BCP-47 / 下划线变体
    return locale.toLowerCase().replace(/_/g, "-").startsWith("zh");
}

export function t(key: string, vars?: Record<string, string | number>): string {
    // 惰性加载字典，保证 main/renderer 双进程都在首次 t() 时拿到 en/zh 词典
    ensureDictionariesLoaded();

    // 读取 observable，使在 observer 组件 render 内被 mobx 追踪
    const loc = currentLocale.get();

    const dict = isChineseLocale(loc) ? zhDict : enDict;
    const text = dict[key];

    if (text !== undefined) {
        return interpolate(text, vars);
    }

    // 回退：zh 缺失时用 en
    if (isChineseLocale(loc) && enDict[key] !== undefined) {
        return interpolate(enDict[key], vars);
    }

    // 全部缺失：返回 key 原样，便于发现缺口
    return key;
}
