import React from "react";
import { observer } from "mobx-react";

import { theme } from "eez-studio-ui/theme";

import { ShortcutsToolbar } from "instrument/window/terminal/toolbar";
import { executeShortcut } from "instrument/window/script";

import { InstrumentAppStore } from "instrument/window/app-store";

import { Section } from "instrument/bb3/components/Section";
import { t } from "eez-studio-shared/i18n";

export const ShortcutsSection = observer(
    ({ appStore }: { appStore: InstrumentAppStore }) => {
        return (
            <Section
                title={t("Shortcuts")}
                body={
                    <ShortcutsToolbar
                        appStore={appStore}
                        executeShortcut={shortcut => {
                            executeShortcut(appStore, shortcut);
                        }}
                        style={{
                            border: 0,
                            backgroundColor: theme().panelHeaderColor,
                            padding: 0,
                            margin: 0
                        }}
                    />
                }
            />
        );
    }
);
