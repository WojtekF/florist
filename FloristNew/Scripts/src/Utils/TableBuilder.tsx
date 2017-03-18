// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";
import { addHandler, removeHandler } from "./HotKey";

export abstract class TableNavigator<R extends IEntry, P extends ITableProps<R>, S extends { selectedIdx: number }>
    extends React.Component<P, S> {

    protected abstract getTitle: () => string;
    protected abstract getHeaders: () => string[];
    protected abstract getIconStyle: () => string;
    protected abstract getRows: () => any;

    constructor(props) {
        super(props);
        this.state = { selectedIdx: 0 } as S;
        this.onArrowDown = this.onArrowDown.bind(this);
        this.onArrowUp = this.onArrowUp.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
    }

    public render() {
        const headers = this.getHeaders().map((h, idx) =>
            (
                <th key={idx.toString()}>
                    {h}
                </th>
            ));
        const progress = this.props.isFetching ?
            (
                <div className="ui active centered inline massive loader" />
            )
            :
            null;
        const message = this.props.failure ?
            (
                <div className="ui negative message transition">
                    <i className="close icon" />
                    <div className="header">
                        Wystąpił błąd.
                    </div>
                    <p>Prosze skontatkować się z administratorem</p>
                </div>
            )
            :
            null;
        const rows = this.getRows();
        const table = this.props.isFetching ? null :
            (
                <table className="ui striped selectable table">
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        return (
            <div className="ui container">
                <h1 className="ui center aligned icon header">
                    <i className={this.getIconStyle()} />
                    {this.getTitle()}
                </h1>
                {progress}
                {table}
                {message}
            </div >
        );
    }

    /* istanbul ignore next */
    public keyHandler(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowUp":
                this.onArrowUp();
                return false;
            case "ArrowDown":
                this.onArrowDown();
                return false;
            default:
                return true;
        }
    }

    protected componentDidMount() {
        this.props.loadData();
        addHandler(this.keyHandler);
    }

    protected componentWillUnmount() {
        removeHandler(this.keyHandler);
    }

    private onArrowUp() {
        const idx = this.state.selectedIdx;
        /* istanbul ignore else */
        if (idx > 0) {
            this.setState({ selectedIdx: idx - 1 } as S);
        }
    }

    private onArrowDown() {
        const idx = this.state.selectedIdx;
        /* istanbul ignore else */
        if (idx + 1 < this.props.rows.length) {
            this.setState({ selectedIdx: idx + 1 } as S);
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export abstract class SimpleTable<R extends IEntry, P extends ITableProps<R>>
    extends TableNavigator<R, P, { selectedIdx: number }> { };
