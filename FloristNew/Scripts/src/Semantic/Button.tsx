// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";

function getAlignmentClass(align: Alignment) {
    switch (align) {
        case Alignment.Right:
            return "right floated";
        case Alignment.Left:
            return "left floated";
        default:
            return "";
    }
}

export class CancelButton extends React.Component<{ onClick: () => void }, void> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <button className={`medium ui button`} onClick={this.handleClick}>
                Anuluj
            </button>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {onClick} = this.props;

        onClick();
        return false;
    }
}

export class SubmitButton extends React.Component<{ onClick: () => void, disabled?}, {}> {
    public constructor(props) {
        super(props);
    }

    public render() {
        const {disabled} = this.props;

        return (
            <button className={`medium ui ${disabled ? "disabled" : ""} button`} onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {onClick} = this.props;

        onClick();
        return false;
    }
}

export default class Button extends React.Component<{ onClick: () => void, alignment: Alignment }, void> {
    constructor(props) {
        super(props);
    }

    public render() {
        const align = getAlignmentClass(this.props.alignment);

        return (
            <button className={`medium ui ${align} button`} onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {onClick} = this.props;

        onClick();
    }
}
