// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Application from "./Application";
import { activate } from "./Utils/HotKey";

activate();

ReactDOM.render((<Application />),
    document.getElementById("app"));
