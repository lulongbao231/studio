import * as FlexLayout from "flexlayout-react";

export interface ILayoutModel {
    name: string;
    version: number;
    json: FlexLayout.IJsonModel;
    get: () => FlexLayout.Model;
    set: (model: FlexLayout.Model) => void;
}

// localizeTabTitles 用的页签名收集结果：
// byId —— 有显式 id 的页签；byComponent —— 无 id 的页签（按 component 匹配）。
interface TabNames {
    byId: { [id: string]: string };
    byComponent: { [component: string]: string };
}

export abstract class AbstractLayoutModels {
    abstract get models(): ILayoutModel[];

    load(layoutModels: any) {
        for (const model of this.models) {
            const savedModel = layoutModels && layoutModels[model.name];
            if (savedModel && savedModel.version == model.version) {
                model.set(FlexLayout.Model.fromJson(savedModel.json));
            } else {
                model.set(FlexLayout.Model.fromJson(model.json));
            }
        }
    }

    save() {
        const layoutModels: any = {};

        for (const model of this.models) {
            try {
                layoutModels[model.name] = {
                    version: model.version,
                    json: model.get().toJson()
                };
            } catch (err) {
                console.log(model);
                console.error(err);
            }
        }

        return layoutModels;
    }

    // 运行时切换语言后，将当前各布局里页签标题按「全新默认配置（当前语言下 t() 求值）」
    // 就地重命名，仅改标签、保留用户的布局（位置/尺寸/折叠状态）不被重置。
    //
    // 匹配策略（两通道，兼容旧布局）：
    // 1) 显式 id 的 tab —— 直接用 id 匹配（绝大多数页签）。
    // 2) 无 id 的 tab —— 按 component 匹配（flexlayout 对匿名 tab 不分配 id，
    //    且旧版持久化布局里没有 id；例如项目编辑器里的“Widgets Structure（部件结构）”
    //    flow-structure 页签），此时用 visitNodes 遍历当前模型按 component 重命名。
    localizeTabTitles() {
        const collect = (json: any, tabNames: TabNames) => {
            const walk = (node: any) => {
                if (!node || typeof node !== "object") {
                    return;
                }
                if (node.type === "tab" && typeof node.name === "string") {
                    if (node.id) {
                        tabNames.byId[node.id] = node.name;
                    }
                    // 无论有无显式 id，都同时按 component 记录一份。
                    // 原因：旧版持久化布局里同一 component 的页签可能没有 id
                    //（flexlayout 会为其自动生成 UUID），此时通道 1（按 id）匹配不到，
                    // 需要通道 2（按 component）仍能重命名。
                    if (node.component) {
                        tabNames.byComponent[node.component] = node.name;
                    }
                }
                if (Array.isArray(node)) {
                    node.forEach(walk);
                } else {
                    for (const key of ["children", "layout", "borders", "global"]) {
                        if (node[key] !== undefined) {
                            walk(node[key]);
                        }
                    }
                }
            };
            walk(json);
        };

        for (const model of this.models) {
            const tabNames: TabNames = { byId: {}, byComponent: {} };
            collect(model.json, tabNames);

            const currentModel = model.get();
            if (!currentModel) {
                continue;
            }

            // 通道 1：显式 id
            for (const id in tabNames.byId) {
                if (currentModel.getNodeById(id)) {
                    currentModel.doAction(
                        FlexLayout.Actions.renameTab(id, tabNames.byId[id])
                    );
                }
            }

            // 通道 2：无 id 的 tab，按 component 匹配
            currentModel.visitNodes((node: any) => {
                if (node instanceof FlexLayout.TabNode) {
                    const component = node.getComponent();
                    if (component && tabNames.byComponent[component] !== undefined) {
                        currentModel.doAction(
                            FlexLayout.Actions.renameTab(
                                node.getId(),
                                tabNames.byComponent[component]
                            )
                        );
                    }
                }
            });
        }
    }
}
