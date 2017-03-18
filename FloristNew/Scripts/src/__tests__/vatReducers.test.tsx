// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import * as actions from "../redux/vatActions";
import { fetchingVats, isEditVisible } from "../redux/vatReducers";

describe("vatReducers", () => {
    describe("isEditVisible", () => {
        it("VAT_MODAL_VISIBILITY", () => {
            chai.expect(isEditVisible(undefined, actions.toggleVatEdit(true)))
                .to.deep.equal({ isOpened: true, entry: { Id: 0, IsActive: true, Name: "", Value: 0 } });
        });

        it("VAT_EDIT_MODE", () => {
            chai.expect(isEditVisible(
                undefined,
                actions.setVatToEdit({ Id: 10, IsActive: true, Name: "", Value: 10 })),
            ).to.deep.equal(
                {
                    entry: { Id: 10, IsActive: true, Name: "", Value: 10 },
                    isOpened: true,
                });
        });
    });

    describe("fetchingVats", () => {
        it("VATS_FETCHING_STARTED", () => {
            chai.expect(fetchingVats(undefined, { type: actions.VAT_CONST.VATS_FETCHING_STARTED }))
                .to.deep.equal({ isFetching: true, failure: false, vats: [] });
        });

        it("VATS_FETCHING_SUCCESS", () => {
            chai.expect(fetchingVats(
                undefined,
                {
                    type: actions.VAT_CONST.VATS_FETCHING_SUCCESS,
                    vats: [{ Id: 10, IsActive: true, Name: "", Value: 10 }],
                }),
            ).to.deep.equal(
                {
                    failure: false,
                    isFetching: false,
                    vats: [{ Id: 10, IsActive: true, Name: "", Value: 10 }],
                });
        });

        it("VATS_FETCHING_FAILURE", () => {
            chai.expect(fetchingVats(undefined, { type: actions.VAT_CONST.VATS_FETCHING_FAILURE }))
                .to.deep.equal({ isFetching: false, failure: true, vats: [] });
        });
    });
});
