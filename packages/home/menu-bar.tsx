import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

////////////////////////////////////////////////////////////////////////////////

// 页面内自绘菜单栏。
//
// Windows/Linux 上 titleBarStyle:"hidden"（main/window.ts，为了自绘橙色标题栏）会把原生
// 菜单栏一起带走，而且 Electron 不允许单独把它加回来 —— 详细原因见 main/menu.ts 里
// 「自绘菜单栏支持」一节的注释。
//
// 这里只画顶层标签（文件/编辑/视图/帮助）和它们的位置：点击时把序号和按钮左下角坐标发给
// 主进程，由主进程弹出真正的原生菜单。菜单内容、勾选状态、禁用状态、快捷键全部由 menu.ts
// 那一份菜单模板决定，这里不做任何复制，所以不会和原生菜单走样。
//
// 快捷键也照常可用（原生菜单栏不显示，但加速键表还挂在窗口上），这里不碰键盘。

interface IMenuBarItem {
    label: string;
}

function getMenuBarItems(): IMenuBarItem[] {
    return ipcRenderer.sendSync("get-menu-bar-items");
}

export function MenuBar() {
    // 首屏就同步取，免得先渲染成一条空栏再被填上（sendSync 是同步 IPC，读的是内存里的菜单）。
    const [items, setItems] = useState<IMenuBarItem[]>(getMenuBarItems);
    const [openIndex, setOpenIndex] = useState(-1);

    useEffect(() => {
        const refresh = () => setItems(getMenuBarItems());

        // locale 切换会让主进程重建菜单（menu.ts 中依赖 currentLocale 的 autorun），
        // 重建后主进程广播这个事件，这里跟着换标签。
        const onChanged = () => refresh();

        // 原生菜单关闭后清掉高亮态。
        const onClosed = (_event: any, index: number) =>
            setOpenIndex(current => (current === index ? -1 : current));

        ipcRenderer.on("menu-bar-changed", onChanged);
        ipcRenderer.on("menu-bar-item-closed", onClosed);

        return () => {
            ipcRenderer.off("menu-bar-changed", onChanged);
            ipcRenderer.off("menu-bar-item-closed", onClosed);
        };
    }, []);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="EezStudio_MenuBar">
            {items.map((item, index) => (
                <div
                    key={item.label}
                    className={
                        "EezStudio_MenuBar_Item" +
                        (index === openIndex ? " open" : "")
                    }
                    // 位置给按钮左下角，原生菜单就会贴着它下沿弹出来。
                    onClick={event => {
                        const rect =
                            event.currentTarget.getBoundingClientRect();

                        setOpenIndex(index);

                        ipcRenderer.send(
                            "popup-menu-bar-item",
                            index,
                            Math.round(rect.left),
                            Math.round(rect.bottom)
                        );
                    }}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}
