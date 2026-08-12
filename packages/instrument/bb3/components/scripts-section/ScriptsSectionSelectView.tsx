import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";

import { t } from "eez-studio-shared/i18n";

import { BB3Instrument } from "instrument/bb3/objects/BB3Instrument";

export const ScriptsSectionSelectView = observer(
    ({ bb3Instrument }: { bb3Instrument: BB3Instrument }) => {
        if (bb3Instrument.allScriptsCollection.length == 0) {
            return null;
        }

        return (
            <label className="form-check-label">
                <select
                    className="form-select form-control-sm"
                    value={bb3Instrument.selectedScriptsCollectionType}
                    onChange={action(
                        (event: React.ChangeEvent<HTMLSelectElement>) => {
                            bb3Instrument.selectedScriptsCollectionType = event
                                .currentTarget.value as any;
                        }
                    )}
                >
                    <option value="allScriptsCollection">
                        {t("All ({count})", {
                            count: bb3Instrument.allScriptsCollection.length
                        })}
                    </option>
                    {bb3Instrument.catalogScriptsCollection.length > 0 && (
                        <option value="catalogScriptsCollection">
                            {t("From catalog ({count})", {
                                count:
                                    bb3Instrument.catalogScriptsCollection
                                        .length
                            })}
                        </option>
                    )}
                    {bb3Instrument.instrumentScriptsCollection.length > 0 && (
                        <option value="instrumentScriptsCollection">
                            {t("On instrument ({count})", {
                                count:
                                    bb3Instrument.instrumentScriptsCollection
                                        .length
                            })}
                        </option>
                    )}
                    {bb3Instrument.notInstalledCatalogScriptsCollection.length >
                        0 && (
                        <option value="notInstalledCatalogScriptsCollection">
                            {t("Not installed from catalog ({count})", {
                                count:
                                    bb3Instrument
                                        .notInstalledCatalogScriptsCollection
                                        .length
                            })}
                        </option>
                    )}
                    {bb3Instrument.installedCatalogScriptsCollection.length >
                        0 && (
                        <option value="installedCatalogScriptsCollection">
                            {t("Installed from catalog ({count})", {
                                count:
                                    bb3Instrument
                                        .installedCatalogScriptsCollection.length
                            })}
                        </option>
                    )}
                    {bb3Instrument.instrumentScriptsNotInCatalogCollection
                        .length > 0 && (
                        <option value="instrumentScriptsNotInCatalogCollection">
                            {t("On instrument but not from catalog ({count})", {
                                count:
                                    bb3Instrument
                                        .instrumentScriptsNotInCatalogCollection
                                        .length
                            })}
                        </option>
                    )}
                </select>
            </label>
        );
    }
);
