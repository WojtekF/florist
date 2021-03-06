﻿// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";
import VatForm from "./VatForm";
import VatsTable from "./VatsTable";

export default class VatsModule extends React.Component<void, void> {

    public render() {
        return (
            <div className="ui container">
                <VatsTable />
                <VatForm />
            </div>
        );
    }
}
