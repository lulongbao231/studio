import { settingsController } from "home/settings";

export interface ThemeInterface {
    backgroundColor: string;
    borderColor: string;
    panelHeaderColor: string;
    selectionBackgroundColor: string;
    errorColor: string;
    textColor: string;
    successColor: string;
    connectionLineColor: string;
    selectedConnectionLineColor: string;
    seqConnectionLineColor: string;
    activeConnectionLineColor: string;
    disabledLineColor: string;
}

// Keep in sync with _stylesheets/vars.less and vars-dark.less — these values
// are drawn to SVG/canvas chrome that sits next to the LESS-styled UI.
export const lightTheme: ThemeInterface = {
    backgroundColor: "#faf6f0",
    borderColor: "#e8dfd3",
    panelHeaderColor: "#f6f0e7",
    selectionBackgroundColor: "#b0532f",
    errorColor: "#b23f36",
    textColor: "#3a322c",
    successColor: "#456f3a",
    connectionLineColor: "#999",
    selectedConnectionLineColor: "red",
    seqConnectionLineColor: "#3FADB5",
    activeConnectionLineColor: "blue",
    disabledLineColor: "#c9bcae"
};

export const darkTheme: ThemeInterface = {
    backgroundColor: "#1e1a17",
    borderColor: "#3b322a",
    panelHeaderColor: "#2f2822",
    selectionBackgroundColor: "#e07a52",
    errorColor: "#d9604c",
    textColor: "#ede6de",
    successColor: "#6fae5c",
    connectionLineColor: "#999",
    selectedConnectionLineColor: "red",
    seqConnectionLineColor: "#3FADB5",
    activeConnectionLineColor: "blue",
    disabledLineColor: "#5a4d40"
};

export const theme = () =>
    settingsController.isDarkTheme ? darkTheme : lightTheme;
