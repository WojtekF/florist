// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";

abstract class BaseFrom<P extends FormProps, S extends FormState> extends React.Component<P, S> {

    constructor(props) {
        super(props);
    }

    public abstract render();
    protected abstract handleSubmit();
}

export default BaseFrom;
