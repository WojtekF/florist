// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import * as sinon from "sinon";

import createButton, { DispatchButton } from "../../Utils/DispatchableButton";

const store = configureMockStore()({});

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: () => dispatch({ type: "ADD_TODO", id: 0, text: "test" }),
        ...ownProps,
    };
};
const DB = createButton(mapDispatchToProps);

describe("<DispatchableButton/>", () => {
    let instance;
    let container;
    before(() => {
        sinon.spy(store, "dispatch");
    });

    beforeEach(() => {
        instance = mount(
            (
                <Provider store={store}>
                    <DB label={"some label"} />
                </Provider>
            ),
        );
    });

    it("dispatches action when clicked", () => {
        container = instance.find("button");
        container.simulate("click");
        chai.expect(store.dispatch.calledWith(
            { type: "ADD_TODO", id: 0, text: "test" },
        )).to.true;
    });

    it("has label passed correctly", () => {
        instance = instance.find(DispatchButton);
        chai.expect(instance.props().label).to.equals("some label");
    });
});
