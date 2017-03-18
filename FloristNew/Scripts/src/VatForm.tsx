// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { saveVat, toggleVatEdit } from "./redux/vatActions";
import Button, { CancelButton, SubmitButton } from "./Semantic/Button";
import BaseForm from "./Utils/BaseForm";

import * as React from "react";
import { connect } from "react-redux";

const fields = {
    name: {
        identifier: "Name",
        rules: [
            {
                prompt: "Nazwa nie może być pusta.",
                type: "empty",
            },
        ],
    },
    value: {
        identifier: "Value",
        rules: [
            {
                prompt: "Stawka VAT musi zawierać się w przedziale <0;100>.",
                type: "integer[0..100]",
            },
            {
                prompt: "Stawka VAT nie może być pusta.",
                type: "empty",
            },
        ],
    },
};

export class Form extends BaseForm<IVatDialogProps, { canSubmit: boolean }> {

    public form;
    public dialog;
    private refHandlers = {
        dialog: (dialog) => this.dialog = $(dialog),
        form: (form) => this.form = $(form),
    };

    constructor(props) {
        super(props);
        this.state = { canSubmit: false };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleCanSubmit = this.toggleCanSubmit.bind(this);
    }

    public componentDidMount() {
        this.initForm();
        this.dialog.modal({ detachable: false });
    }

    public render() {
        const {canSubmit} = this.state;
        const actions = [
            <SubmitButton disabled={!canSubmit} onClick={this.handleSubmit}>Zapisz</SubmitButton>,
            <CancelButton onClick={this.handleCancel} />,
        ];
        return (
            <div
                className="ui modal"
                ref={this.refHandlers.dialog}
            >
                <div className="header">{this.props.entry.Id != 0 ? "Edycja stawki" : "Dodaj stawkę"}</div>
                <div className="content">
                    <div ref={this.refHandlers.form} className="ui form segment">
                        <div className="fieldgroup">
                            <div className="field">
                                <label>Nazwa</label>
                                <input type="text" name="Name"/>
                            </div>
                        </div>
                        <div className="fieldgroup">
                            <div className="field">
                                <label>Stawka</label>
                                <input type="text" name="Value"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="actions"> {actions} </div>
            </div>
        );
    }

    protected handleSubmit() {
        // TODO call to API to save entry and close dialog
        this.props.toggleVisibility(false);
        const model = Object.assign({}, this.form.form("get values"), { Id: this.props.entry.Id, IsActive: true });
        this.props.submitEntry(model);
    }

    private initForm = () => {
        this.form.form(
            {
                debug: true,
                fields,
                inline: true,
                on: "change",
                onFailure: () => {
                    this.toggleCanSubmit(false);
                    return false;
                },
                onSuccess: () => {
                    this.toggleCanSubmit(true);
                    return true;
                },
                verbose: true,
            });
    }

    private componentWillReceiveProps(newProps: IVatDialogProps) {
        this.form.form("reset");
        this.setEntry(newProps.entry);
        this.form.form("validate form");
        newProps.isOpened ? this.dialog.modal("show") : this.dialog.modal("hide");
    }

    private setEntry = (entry: IVatEntry) => {
        this.form.form("set values", { Name: entry.Name, Value: entry.Value });
    }

    private handleCancel() {
        this.props.toggleVisibility(false);
    }

    private toggleCanSubmit(canSubmit: boolean) {
        this.setState({ canSubmit });
    }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
    return {
        entry: state.isEditVisible.entry,
        isOpened: state.isEditVisible.isOpened,
    };
};

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
    return {
        submitEntry: (entry: IVatEntry) => dispatch(saveVat(entry)),
        toggleVisibility: (isOpened) => dispatch(toggleVatEdit(isOpened)),
    };
};
const VatForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default VatForm;
