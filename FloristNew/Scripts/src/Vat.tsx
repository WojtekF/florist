// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";

import Button from "./Semantic/Button";

export default class Vat extends React.Component<IVat, void> {
    constructor(props) {
        super(props);
    }

    public render() {

        return (
            <tr className={this.props.isSelected ? "active" : ""} >
                <td>{this.props.entry.Name}</td>
                <td>{this.props.entry.Value}</td>
            </tr>
        );
    }
}
