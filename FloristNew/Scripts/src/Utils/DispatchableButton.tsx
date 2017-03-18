// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { connect } from "react-redux";
import Button from "../Semantic/Button";

export class DispatchButton extends React.Component<IDispatchButtonProps, void> {
    public render() {
        const {label, ...rest} = this.props;
        return (
            <div className="ui container">
                <Button {...rest}>
                    {label}
                </Button>
            </div>
        );
    }
}

export default function(mapDispatchToProps: (dispatch: any, ownProps: any) => any) {
    return connect(null, mapDispatchToProps)(DispatchButton);
}
