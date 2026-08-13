import { openWindow, findWindowByParams, IWindowParams } from "main/window";

export const HOME_WINDOW_URL = "home/index.html";

const HOME_WINDOW_PARAMS: IWindowParams = {
    url: HOME_WINDOW_URL,
    hideOnClose: true
};

// 打开（或复用已存在）主界面窗口。
export function openHomeWindow(params?: Partial<IWindowParams>) {
    return openWindow(Object.assign(HOME_WINDOW_PARAMS, params));
}

// 将主界面窗口带到前台，无窗口则新建。
export function bringHomeWindowToFocus() {
    let homeWindow = findWindowByParams(HOME_WINDOW_PARAMS);
    if (homeWindow) {
        homeWindow.browserWindow.show();
    } else {
        openHomeWindow();
    }
}

// 通知渲染进程重载当前项目（供 --reload-project 二次启动使用）。
export function reloadProject() {
    let homeWindow = findWindowByParams(HOME_WINDOW_PARAMS);
    console.log("[reload-project] homeWindow found:", !!homeWindow);
    if (homeWindow) {
        console.log("[reload-project] sending IPC reload-project to renderer");
        homeWindow.browserWindow.webContents.send("reload-project");
    }
}

// 通知渲染进程导入仪器定义文件（zip）。【定制】文件菜单入口已隐藏，此函数保留供其他来源调用。
export function importInstrumentDefinitionFile(filePath: string) {
    let homeWindow = findWindowByParams(HOME_WINDOW_PARAMS);
    if (homeWindow) {
        homeWindow.browserWindow.webContents.send(
            "importInstrumentDefinitionFile",
            filePath
        );
    }
}
