// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import RaisedButton from "material-ui/RaisedButton";
import * as React from "react";
import { connect, Provider } from "react-redux";
import { fetchVats, setVatToDeletion, setVatToEdit, toggleVatEdit } from "./redux/vatActions";
import { addHandler, removeHandler } from "./Utils/HotKey";
import { SimpleTable } from "./Utils/TableBuilder";
import Vat from "./Vat";
import VatForm from "./VatForm";

/* istanbul ignore next */
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        failure: state.fetchingVats.failure,
        isFetching: state.fetchingVats.isFetching,
        rows: state.fetchingVats.vats,
    };
};

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAdd: () => dispatch(toggleVatEdit(true)),
        dispatchDelete: (id: number) => dispatch(setVatToDeletion(id)),
        dispatchEdit: (entry: IVatEntry) => dispatch(setVatToEdit(entry)),
        loadData: () => dispatch(fetchVats()),
    };
};

export class VatsTable extends SimpleTable<IVatEntry, IVatTableProps> {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: 0,
        };
        this.keyboardHandler = this.keyboardHandler.bind(this);
    }

    protected componentDidMount() {
        super.componentDidMount();
        addHandler(this.keyboardHandler);
    }

    protected componentWillUnmount() {
        super.componentWillUnmount();
        removeHandler(this.keyboardHandler);
    }

    protected getHeaders = () =>  ["Nazwa", "Wartość"];

    protected getTitle = () => "Stawki VAT";

    protected getIconStyle = () => "circular percent icon";

    protected getRows = () => {
        return this.props.rows.map((v, idx) =>
            (
                <Vat
                    key={v.Id}
                    entry={v}
                    isSelected={idx === this.state.selectedIdx}
                />
            ));
    }

    /* istanbul ignore next */
    private keyboardHandler(event: KeyboardEvent) {
        switch (event.key) {
            case "F2":
                this.props.dispatchAdd();
                event.preventDefault();
                return false;
            case "F4":
                this.props.dispatchEdit(this.props.rows[this.state.selectedIdx]);
                event.preventDefault();
                return false;
            case "Delete":
                this.props.dispatchDelete(this.props.rows[this.state.selectedIdx].Id);
                event.preventDefault();
                return false;
            default:
                return true;
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VatsTable);
