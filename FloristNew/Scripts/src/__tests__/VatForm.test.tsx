// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import { mount } from "enzyme";
import * as nock from "nock";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as sinon from "sinon";

import * as c from "../configuration";
import * as actions from "../redux/vatActions";
import configureStore from "../redux/vatStore";
import { CancelButton, SubmitButton } from "../Semantic/Button";
import VatForm, { Form } from "./../VatForm";

const activeEntry: IVatEntry = { Id: 3, IsActive: true, Name: "zero", Value: 0 };
const newEntry: IVatEntry = Object.assign({}, activeEntry, { Id: "0", Name: "" });

const toggleVisibility = sinon.spy();
const submitEntry = sinon.spy();

describe("VatForm", () => {
    let container;
    let instance;

    function checkIfSubmitButtonIsDisabled() {
        const submitButton = instance.find(SubmitButton);
        chai.expect(submitButton).to.have.length(1);
        chai.expect(submitButton.at(0).props().disabled).to.be.true;
    }

    function checkIfFormContainsError() {
        const errorFields = instance.find(".field .error");
        chai.expect(errorFields).to.have.length(1);
    }

    function validateForm() {
        const form = instance.find(Form);
        form.get(0).form.form("validate form");
    }

    describe("plain form", () => {
        describe("existing entry", () => {
            beforeEach(() => {
                instance = mount(
                    <Form
                        entry={newEntry}
                        isOpened={false}
                        toggleVisibility={toggleVisibility}
                        submitEntry={submitEntry}
                    />,
                );
                instance.setProps({ entry: activeEntry, isOpened: true });
            });

            it("sets label correctly for existing entry", () => {
                const title = instance.find(".header").get(0).innerHTML;
                chai.expect(title).to.equal("Edycja stawki");
            });

            it("returns no validation errors when editing existing entry", () => {
                const errorFields = instance.find(".field .error");
                chai.expect(errorFields).to.have.length(0);
            });

            it("contains submit and cancel buttons", () => {
                container = instance.find(SubmitButton);
                chai.expect(container).to.have.length(1);
                container = instance.find(CancelButton);
                chai.expect(container).to.have.length(1);
            });

            it("enables submit button with valid entry", () => {
                container = instance.find(SubmitButton);
                chai.expect(container).to.have.length(1);
                chai.expect(container.at(0).props().disabled).to.be.false;
            });

            it("disables submit button and displays error validations when Value is out of <0,100> range", () => {
                const input = instance.find("input[name=\"Value\"]");
                input.get(0).value = "-10";
                input.first().simulate("change");

                validateForm();
                checkIfSubmitButtonIsDisabled();
                checkIfFormContainsError();
                input.get(0).value = "110";
                input.first().simulate("change");
                validateForm();
                checkIfSubmitButtonIsDisabled();
                checkIfFormContainsError();
            });

            it("disables submit button and displays error validations when Name is empty", () => {
                const input = instance.find("input[name=\"Name\"]");
                input.get(0).value = "";
                input.first().simulate("change");
                validateForm();
                checkIfSubmitButtonIsDisabled();
                checkIfFormContainsError();
            });

            it("toggles visibility when cancel button is clicked", () => {
                container = instance.find("button");
                chai.expect(container).to.have.length(2);
                container.at(1).simulate("click");
                chai.expect(toggleVisibility.callCount).to.equal(1);
                instance.setProps({ isOpened: false });
            });

            it("handles submitting when submit button is clicked", () => {
                container = instance.find("button");
                chai.expect(container).to.have.length(2);
                container.at(0).simulate("click");
                chai.expect(submitEntry.callCount).to.equal(1);
                chai.expect(submitEntry.calledWith({ Name: "zero", Value: "0", Id: 3, IsActive: true })).to.true;
            });
        });

        describe("new entry", () => {
            beforeEach(() => {
                instance = mount(
                    <Form
                        entry={newEntry}
                        isOpened={false}
                        toggleVisibility={toggleVisibility}
                        submitEntry={submitEntry}
                    />,
                );
                instance.setProps({ entry: newEntry, isOpened: true });
            });

            it("contains proper header", () => {
                const title = instance.find(".header").get(0).innerHTML;
                chai.expect(title).to.equal("Dodaj stawkę");
            });

            it("should have validation errors", () => {
                validateForm();
                checkIfSubmitButtonIsDisabled();
                checkIfFormContainsError();
            });
        });

    });
});
