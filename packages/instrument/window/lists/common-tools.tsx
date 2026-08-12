import React from "react";
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

import type {
    IAxisController,
    IChartsController
} from "eez-studio-ui/chart/chart";
import { ListAxisModel } from "instrument/window/lists/store-renderer";
import { t } from "eez-studio-shared/i18n";

////////////////////////////////////////////////////////////////////////////////

export const displayOption = observable.box<string>(
    localStorage.getItem("instrument/window/lists/displayOption") || "split"
);

export type ChartsDisplayOption = "split" | "voltage" | "current" | "both";

////////////////////////////////////////////////////////////////////////////////

export const CommonTools = observer(
    class CommonTools extends React.Component<
        { chartsController: IChartsController },
        {}
    > {
        constructor(props: { chartsController: IChartsController }) {
            super(props);

            makeObservable(this, {
                onDisplayOptionChange: action
            });
        }

        onDisplayOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
            displayOption.set(event.target.value);
            localStorage.setItem(
                "instrument/window/lists/displayOption",
                displayOption.get()
            );
        }

        zoomToFitRange = () => {
            function zoom(axisController: IAxisController | undefined) {
                if (!axisController) {
                    return;
                }

                const listAxisModel = axisController.axisModel as ListAxisModel;

                const range = listAxisModel.list.getRange(listAxisModel);

                const from = Math.max(
                    listAxisModel.minValue,
                    range.from - 0.05 * (range.to - range.from)
                );

                const to = Math.min(
                    listAxisModel.maxValue,
                    range.to + 0.05 * (range.to - range.from)
                );

                axisController.zoom(from, to);
            }

            for (const chartController of this.props.chartsController
                .chartControllers) {
                zoom(chartController.yAxisController);
                zoom(chartController.yAxisControllerOnRightSide);
            }
        };

        render() {
            return (
                <table>
                    <tbody>
                        <tr>
                            {this.props.chartsController && (
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        title={t("Zoom to fit range")}
                                        onClick={
                                            this.props.chartsController.zoomAll
                                        }
                                        style={{
                                            marginRight: 10
                                        }}
                                    >
                                        {t("Zoom 100%")}
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        title={t("Zoom to fit range")}
                                        onClick={this.zoomToFitRange}
                                    >
                                        {t("Zoom to Fit Range")}
                                    </button>
                                </td>
                            )}
                            <td>
                                <label>{t("Display")}</label>
                            </td>
                            <td>
                                <label className="form-check-label">
                                    <select
                                        className="form-select"
                                        value={displayOption.get()}
                                        onChange={this.onDisplayOptionChange}
                                    >
                                        <option value="split">{t("Split")}</option>
                                        <option value="voltage">{t("Voltage")}</option>
                                        <option value="current">{t("Current")}</option>
                                        <option value="both">{t("Both")}</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
);
