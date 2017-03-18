// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as chai from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";

import Button from "../Semantic/Button";
import Vat from "./../Vat";

const activeEntry: IVatEntry = { Id: 0, IsActive: true, Name: "zero", Value: 0 };

describe("<Vat />", () => {

    let instance;

    describe("unselected entry", () => {
        beforeEach(() => {
            instance = mount(
                <Vat entry={activeEntry} isSelected={false} />,
            );
        });

        it("contains exactly one tr tag", () => {
            chai.expect(instance.find("tr")).to.have.length(1);
        });

        it("contains exactly 4 td tags s", () => {
            chai.expect(instance.find("td")).to.have.length(2);
        });
    });

    describe("selected entry", () => {
        beforeEach(() => {
            instance = mount(
                <Vat entry={activeEntry} isSelected={true} />,
            );
        });

        it("gets correct className", () => {
            chai.expect(instance.find("tr").get(0).getAttribute("class")).to.equal("active");
        });
    });
});
