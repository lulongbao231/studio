import * as FlexLayout from "flexlayout-react";

export interface ILayoutModel {
    name: string;
    version: number;
    json: FlexLayout.IJsonModel;
    get: () => FlexLayout.Model;
    set: (model: FlexLayout.Model) => void;
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
    localizeTabTitles() {
        const collectTabNames = (json: any, out: { [id: string]: string }) => {
            const walk = (node: any) => {
                if (!node || typeof node !== "object") {
                    return;
                }
                if (node.type === "tab" && node.id && typeof node.name === "string") {
                    out[node.id] = node.name;
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
            const freshNames: { [id: string]: string } = {};
            collectTabNames(model.json, freshNames);

            const currentModel = model.get();
            if (!currentModel) {
                continue;
            }

            for (const id in freshNames) {
                if (currentModel.getNodeById(id)) {
                    currentModel.doAction(FlexLayout.Actions.renameTab(id, freshNames[id]));
                }
            }
        }
    }
}
