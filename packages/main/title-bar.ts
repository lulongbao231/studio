import { BrowserWindow } from "electron";

// 自绘标题栏（titleBarStyle: "hidden" + titleBarOverlay）的配色。
//
// 这里的值必须与 _stylesheets/vars.less / vars-dark.less 中的
// @titleBarBackgroundColor / @titleBarTextColor 保持一致：系统只负责在右上角画
// 最小化/最大化/关闭三个按钮，颜色要从主进程给，而主进程读不到 LESS。
// 不能复用 eez-studio-ui/theme.ts —— 那个模块 import 了 home/settings（渲染进程
// 模块），主进程引用会把它拖进来。
export const TITLE_BAR_LIGHT = { color: "#b0532f", symbolColor: "#fdf3ee" };
export const TITLE_BAR_DARK = { color: "#7a3a26", symbolColor: "#f6ded2" };

// 标题栏高度，需与 .EezStudio_AppHeader 的 height（app.less，38px，含 1px 下边框）
// 一致，否则系统按钮会和标题栏错位。
export const TITLE_BAR_HEIGHT = 38;

export function getTitleBarOverlayColors(isDarkTheme: boolean) {
    return isDarkTheme ? TITLE_BAR_DARK : TITLE_BAR_LIGHT;
}

// titleBarOverlay 只在 Windows / Linux 生效；macOS 会忽略它（titleBarStyle:
// "hidden" 仍保留红绿灯按钮），所以那边不设颜色，靠 CSS 的
// env(titlebar-area-x) 给红绿灯让位。
export function isTitleBarOverlaySupported() {
    return process.platform !== "darwin";
}

// 主题切换时同步所有窗口的标题栏颜色（菜单/设置里切明暗会走到这里）。
export function updateTitleBarOverlays(isDarkTheme: boolean) {
    if (!isTitleBarOverlaySupported()) {
        return;
    }

    const colors = getTitleBarOverlayColors(isDarkTheme);

    BrowserWindow.getAllWindows().forEach(window => {
        try {
            window.setTitleBarOverlay({
                ...colors,
                height: TITLE_BAR_HEIGHT
            });
        } catch {
            // 窗口可能正在销毁，忽略
        }
    });
}
