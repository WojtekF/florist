// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";
import * as sinon from "sinon";

import Vat from "../Vat";
import { VatsTable } from "../VatsTable";
const rows = [
    { Id: 3, IsActive: true, Name: "zero3", Value: 3 },
    { Id: 4, IsActive: true, Name: "zero4", Value: 4 },
    { Id: 5, IsActive: true, Name: "zero5", Value: 5 },
];
const loadData = sinon.spy();
const dispatchEdit = sinon.spy();
const dispatchAdd = sinon.spy();
const dispatchDelete = sinon.spy();

describe("<VatsTable/>", () => {
    let container;
    let instance;
    describe("after succesful fetching", () => {

        beforeEach(() => {
            instance = mount(
                <VatsTable
                    rows={rows}
                    isFetching={false}
                    failure={false}
                    loadData={loadData}
                    dispatchEdit={dispatchEdit}
                    dispatchAdd={dispatchAdd}
                    dispatchDelete={dispatchDelete}
                />,
            );
        });

        it("contains proper header", () => {
            container = instance.find("h1");
            chai.expect(container).to.have.length(1);
            chai.expect(container.get(0).innerHTML.indexOf("Stawki VAT")).to.be.ok;
        });

        it("contains proper icon style", () => {
            container = instance.find("i");
            chai.expect(container).to.have.length(1);
            chai.expect(container.get(0).getAttribute("class")).to.equals("circular percent icon");
        });

        it("contains two table column's headers with proper values", () => {
            container = instance.find("th");
            chai.expect(container).to.have.length(2);
            chai.expect(container.get(0).innerHTML.indexOf("Nazwa")).to.be.greaterThan(-1);
            chai.expect(container.get(1).innerHTML.indexOf("Wartość")).to.be.greaterThan(-1);
        });

        it("render 3 <Vat>s objects", () => {
            container = instance.find(Vat);
            chai.expect(container).to.have.length(3);
        });

        it("selects second row after clicking arrow down and dispatches selected entry", () => {
            container = instance.find(Vat);
            chai.expect(container).to.have.length(3);
            chai.expect(container.get(0).props.isSelected).to.be.true;
            instance.node.keyHandler({ key: "ArrowDown" });

            container = instance.find(Vat);
            chai.expect(container).to.have.length(3);
            chai.expect(container.get(0).props.isSelected).to.be.false;
            chai.expect(container.get(1).props.isSelected).to.be.true;
        });

        it("selects second row and reselects first after clicking arrow down nad up and dispatches selected entry",
            () => {
                container = instance.find(Vat);
                chai.expect(container).to.have.length(3);
                chai.expect(container.get(0).props.isSelected).to.be.true;
                instance.node.keyHandler({ key: "ArrowDown" });

                container = instance.find(Vat);
                chai.expect(container).to.have.length(3);
                chai.expect(container.get(0).props.isSelected).to.be.false;
                chai.expect(container.get(1).props.isSelected).to.be.true;

                instance.node.keyHandler({ key: "ArrowUp" });
                container = instance.find(Vat);
                chai.expect(container).to.have.length(3);
                chai.expect(container.get(0).props.isSelected).to.be.true;
                chai.expect(container.get(1).props.isSelected).to.be.false;
            });

        it("fires componentWillUnmount", () => {
            const spy = sinon.spy(VatsTable.prototype, "componentWillUnmount");
            instance.unmount();
            chai.expect(spy.calledOnce).to.be.true;
        });
    });
});
