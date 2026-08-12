import React from "react";
import { observer } from "mobx-react";

import { IconAction } from "eez-studio-ui/action";
import { IAppStore } from "instrument/window/history/history";
import { computed, makeObservable } from "mobx";
import {
    historySessions,
    SESSION_FREE_ID
} from "instrument/window/history/session/store";
import { t } from "eez-studio-shared/i18n";

////////////////////////////////////////////////////////////////////////////////

export const SessionInfo = observer(
    class SessionInfo extends React.Component<{ appStore: IAppStore }, {}> {
        constructor(props: { appStore: IAppStore }) {
            super(props);

            makeObservable(this, {
                activeSessionName: computed
            });
        }

        get activeSessionName() {
            return historySessions.activeSession &&
                historySessions.activeSession.id != SESSION_FREE_ID
                ? historySessions.activeSession?.name
                : undefined;
        }

        render() {
            return (
                <div className="EezStudio_SessionInfoContainer">
                    {this.activeSessionName && (
                        <>
                            <span>{t("In session:")}</span>
                            <span>{this.activeSessionName}</span>
                        </>
                    )}
                    <IconAction
                        icon="material:list"
                        title={t("View sessions list")}
                        onClick={
                            this.props.appStore.navigationStore
                                .navigateToSessionsList
                        }
                    />
                </div>
            );
        }
    }
);
