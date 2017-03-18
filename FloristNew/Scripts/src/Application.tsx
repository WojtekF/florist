// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import configureStore from "./redux/vatStore";
import VatsModule from "./VatsModule";

const vatStore = configureStore();

class Application extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (

            <Provider store={vatStore}>
                <div className="ui container">
                    <VatsModule />
                </div>
            </Provider>
        );
    }
}

export default Application;
