// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as chai from "chai";
import * as nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as c from "../configuration";
import * as actions from "../redux/vatActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("vatActions", () => {

    describe("async", () => {

        function setFetchingNock() {
            const scope = nock(`${c.default.url}`);
            scope.get("/api/vats/get")
                .reply(200, [
                    { Id: 3, IsActive: true, Name: "zero", Value: 0 },
                    { Id: 4, IsActive: true, Name: "zero", Value: 0 },
                    { Id: 5, IsActive: true, Name: "zero", Value: 0 },
                ],
                );
            return scope;

        }

        describe("setVatToDeletion", () => {

            beforeEach(() => {
                nock.cleanAll();
            });

            function setDeletionNock(scope, result: boolean) {
                return scope
                    .post("/api/vats/remove", "1")
                    .reply(200, { Value: result });
            }

            it("successfuly", () => {
                let scope = setFetchingNock();
                scope = setDeletionNock(scope, true);

                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    {
                        type: actions.VAT_CONST.VATS_FETCHING_SUCCESS,
                        vats: [
                            { Id: 3, IsActive: true, Name: "zero", Value: 0 },
                            { Id: 4, IsActive: true, Name: "zero", Value: 0 },
                            { Id: 5, IsActive: true, Name: "zero", Value: 0 },
                        ],
                    },
                ];

                return store.dispatch(actions.setVatToDeletion(1))
                    .then(() => {
                        chai.expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it("failure", () => {
                let scope = setFetchingNock();
                scope = setDeletionNock(scope, false);
                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_FAILURE },
                ];

                return store.dispatch(actions.setVatToDeletion(1))
                    .then(() => {
                        chai.expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });

            it("throws error", () => {
                const scope = setFetchingNock();
                scope.post("/api/vats/remove", "1")
                    .replyWithError("some error");
                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_FAILURE },
                ];

                return store.dispatch(actions.setVatToDeletion(1))
                    .then(() => {
                        chai.expect(store.getActions()).to.deep.equal(expectedActions);
                    });
            });
        });

        describe("saveVat", () => {

            beforeEach(() => {
                nock.cleanAll();
            });

            const newEntry = { Id: 0, IsActive: true, Name: "1", Value: 1 };
            const updatedEntry = { Id: 1, IsActive: true, Name: "1", Value: 1 };
            function setUpdateAddNock(scope, isAdd: boolean, result: boolean, entry: IVatEntry) {
                return scope
                    .post(`/api/vats/${isAdd ? "add" : "change"}`, entry)
                    .reply(200, { Value: result });
            }

            it("new entry is successful", () => {
                let scope = setFetchingNock();
                scope = setUpdateAddNock(scope, true, true, newEntry);
                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    {
                        type: actions.VAT_CONST.VATS_FETCHING_SUCCESS,
                        vats: [
                            { Id: 3, IsActive: true, Name: "zero", Value: 0 },
                            { Id: 4, IsActive: true, Name: "zero", Value: 0 },
                            { Id: 5, IsActive: true, Name: "zero", Value: 0 },
                        ],
                    },
                ];

                return store.dispatch(actions.saveVat(newEntry))
                    .then(() => chai.expect(store.getActions()).to.deep.equal);
            });

            it("existing entry throws an error", () => {
                let scope = setFetchingNock();
                scope = setUpdateAddNock(scope, false, false, updatedEntry);
                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_FAILURE },
                ];

                return store.dispatch(actions.saveVat(updatedEntry))
                    .then(() => chai.expect(store.getActions()).to.deep.equal);
            });

            it("existing entry fails", () => {
                const scope = setFetchingNock();
                scope.post(`/api/vats/$change`, updatedEntry)
                    .replyWithError("some error");
                const store = mockStore({
                    fetchingVats: {
                        failure: false,
                        isFetching: false,
                        vats: [],
                    },
                });

                const expectedActions = [
                    { type: actions.VAT_CONST.VATS_FETCHING_STARTED },
                    { type: actions.VAT_CONST.VATS_FETCHING_FAILURE },
                ];

                return store.dispatch(actions.saveVat(updatedEntry))
                    .then(() => chai.expect(store.getActions()).to.deep.equal);
            });
        });
    });
    describe("sync", () => {
        it("toggleVatEdit", () => {
            const store = configureMockStore()({
                isEditVisible: {
                    entry: { Id: 0, IsActive: true, Name: "", Value: 0 },
                    isOpened: false,
                },
            });
            const expectedActions = [
                {
                    open: true,
                    type: actions.VAT_CONST.VAT_MODAL_VISIBILITY,
                },
                {
                    open: false,
                    type: actions.VAT_CONST.VAT_MODAL_VISIBILITY,
                },
            ];

            store.dispatch(actions.toggleVatEdit(true));
            store.dispatch(actions.toggleVatEdit(false));

            chai.expect(store.getActions()).to.deep.equal(expectedActions);
        });

        it("setVatToEdit", () => {
            const selectedEntry = { Id: 1, IsActive: true, Name: "1", Value: 1 };
            const store = mockStore({
                isEditVisible: {
                    entry: { Id: 0, IsActive: true, Name: "", Value: 0 },
                    isOpened: false,
                },
            });
            const expectedActions = [
                {
                    entry: selectedEntry,
                    type: actions.VAT_CONST.VAT_EDIT_MODE,
                },
            ];

            store.dispatch(actions.setVatToEdit(selectedEntry));

            chai.expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
});
