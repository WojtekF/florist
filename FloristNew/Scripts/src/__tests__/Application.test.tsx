// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";

import Application from "../Application";
import VatsModule from "../VatsModule";

describe("<Application/>", () => {
    let instance;
    beforeEach(() => {
        instance = mount(<Application />);
    });

    it("contains VatsModule", () => {
        const container = instance.find(VatsModule);
        chai.expect(container).to.be.ok;
    });
});
