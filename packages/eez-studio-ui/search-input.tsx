import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { IconAction } from "./action";
import { t } from "eez-studio-shared/i18n";

export const SearchInput = observer(
    class SearchInput extends React.Component<{
        searchText: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
        onClear: () => void;
    }> {
    render() {
        return (
            <div className="EezStudio_SearchInput_Container">
                <input
                    type="text"
                    placeholder="&#xe8b6;"
                    className={classNames("EezStudio_SearchInput", {
                        empty: !this.props.searchText
                    })}
                    value={this.props.searchText}
                    onChange={this.props.onChange}
                    onKeyDown={this.props.onKeyDown}
                />
                {this.props.searchText && (
                    <IconAction
                        icon="material:close"
                        title={t("Clear Search")}
                        className="EezStudio_SearchInput_Clear"
                        onClick={this.props.onClear}
                    ></IconAction>
                )}
            </div>
        );
    }
}
);

