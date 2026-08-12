import React from "react";

import { Dialog, showDialog } from "eez-studio-ui/dialog";
import { PropertyList, RichTextProperty } from "eez-studio-ui/properties";
import { t } from "eez-studio-shared/i18n";

class NoteDialog extends React.Component<{
    title: string;
    note?: string;
    callback: (note: string) => void;
}> {
    constructor(props: any) {
        super(props);

        this.note = this.props.note || "";
    }

    note: string;

    handleChange = (value: string) => {
        this.note = value;
    };

    handleSubmit = () => {
        this.props.callback(this.note);
        return true;
    };

    render() {
        return (
            <Dialog
                title={this.props.title}
                size="large"
                modal={true}
                onOk={this.handleSubmit}
            >
                <PropertyList>
                    <RichTextProperty
                        name="text"
                        value={this.props.note}
                        onChange={this.handleChange}
                    />
                </PropertyList>
            </Dialog>
        );
    }
}

export function showAddNoteDialog(callback: (note: string) => void) {
    showDialog(<NoteDialog title={t("Add Note")} callback={callback} />);
}

export function showEditNoteDialog(
    note: string,
    callback: (note: string) => void
) {
    showDialog(
        <NoteDialog title={t("Edit Note")} callback={callback} note={note} />
    );
}
