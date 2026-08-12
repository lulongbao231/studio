import { dialog, getCurrentWindow } from "@electron/remote";
import { getFileNameWithoutExtension } from "eez-studio-shared/util-electron";
import { IExtension } from "eez-studio-shared/extensions/extension";
import { installExtension } from "eez-studio-shared/extensions/extensions";

import { confirmWithButtons } from "eez-studio-ui/dialog-electron";
import { showGenericDialog } from "eez-studio-ui/generic-dialog";
import * as notification from "eez-studio-ui/notification";

import { importInstrumentDefinitionAsProject } from "instrument/import-instrument-definition-as-project";
import { t } from "eez-studio-shared/i18n";

function confirmMessage(extension: IExtension) {
    return t(
        "You are about to install version {version} of the {name} instrument definition extension.",
        {
            version: extension.version,
            name: extension.displayName || extension.name
        }
    );
}

const BUTTON_INSTRUCTIONS = `
${t("Click 'OK' to replace the installed version.")}
${t("Click 'Cancel' to stop the installation.")}`;

const BUTTONS = [t("OK"), t("Cancel")];

export async function importInstrumentDefinitionAsExtension(filePath: string) {
    const progressToastId = notification.info(t("Importing..."), {
        autoClose: false
    });

    try {
        const extension = await installExtension(filePath, {
            checkExtensionType(type: string) {
                if (type !== "instrument") {
                    notification.update(progressToastId, {
                        render: t("This is not an instrument definition file."),
                        type: notification.ERROR,
                        autoClose: 5000
                    });
                    return false;
                }
                return true;
            },
            notFound() {
                notification.update(progressToastId, {
                    render: t(
                        "This is not a valid instrument definition file."
                    ),
                    type: notification.ERROR,
                    autoClose: 5000
                });
            },
            async confirmReplaceNewerVersion(
                newExtension: IExtension,
                existingExtension: IExtension
            ) {
                return (
                    (await confirmWithButtons(
                        confirmMessage(newExtension),
                        t(
                            "The newer version {version} is already installed.",
                            { version: existingExtension.version }
                        ) + BUTTON_INSTRUCTIONS,
                        BUTTONS
                    )) === 0
                );
            },
            async confirmReplaceOlderVersion(
                newExtension: IExtension,
                existingExtension: IExtension
            ) {
                return (
                    (await confirmWithButtons(
                        confirmMessage(newExtension),
                        t(
                            "The older version {version} is already installed.",
                            { version: existingExtension.version }
                        ) + BUTTON_INSTRUCTIONS,
                        BUTTONS
                    )) === 0
                );
            },
            async confirmReplaceTheSameVersion(
                newExtension: IExtension,
                existingExtension: IExtension
            ) {
                return (
                    (await confirmWithButtons(
                        confirmMessage(newExtension),
                        t("That version is already installed.") +
                            BUTTON_INSTRUCTIONS,
                        BUTTONS
                    )) === 0
                );
            }
        });

        if (extension) {
            notification.update(progressToastId, {
                render: t('Instrument definition "{name}" imported', {
                    name: extension.displayName || extension.name
                }),
                type: notification.SUCCESS,
                autoClose: 5000
            });
        } else {
            notification.update(progressToastId, {
                render: t("Import canceled"),
                type: notification.INFO,
                autoClose: 500
            });
        }
    } catch (err) {
        notification.update(progressToastId, {
            render: err.toString(),
            type: notification.ERROR,
            autoClose: 5000
        });
    }
}

export function importInstrumentDefinition(
    instrumentDefinitionFilePath: string
) {
    showGenericDialog({
        dialogDefinition: {
            fields: [
                {
                    name: "importAs",
                    type: "enum",
                    enumItems: [
                        {
                            id: "extension",
                            label: t("Instrument Extension (IEXT)")
                        },
                        {
                            id: "project",
                            label: t("Project")
                        }
                    ]
                }
            ]
        },

        values: {
            sessionName: name
        }
    })
        .then(async result => {
            if (result.values.importAs === "extension") {
                importInstrumentDefinitionAsExtension(
                    instrumentDefinitionFilePath
                );
            } else {
                const result = await dialog.showSaveDialog(getCurrentWindow(), {
                    defaultPath:
                        getFileNameWithoutExtension(
                            instrumentDefinitionFilePath
                        ) + ".eez-project",
                    filters: [
                        {
                            name: t("EEZ Project"),
                            extensions: ["eez-project"]
                        },
                        { name: t("All Files"), extensions: ["*"] }
                    ]
                });
                let projectFilePath = result.filePath;
                if (projectFilePath) {
                    if (
                        !projectFilePath.toLowerCase().endsWith(".eez-project")
                    ) {
                        projectFilePath += ".eez-project";
                    }

                    importInstrumentDefinitionAsProject(
                        instrumentDefinitionFilePath,
                        projectFilePath
                    );
                }
            }
        })
        .catch(() => {});
}
