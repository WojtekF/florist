// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { combineReducers } from "redux";
import { VAT_CONST } from "./vatActions";

const initialState = { isOpened: false, entry: { Id: 0, IsActive: true, Name: "", Value: 0 } };
export function isEditVisible(state = initialState, action) {
    switch (action.type) {
        case VAT_CONST.VAT_MODAL_VISIBILITY:
            return { isOpened: action.open, entry: initialState.entry };
        case VAT_CONST.VAT_EDIT_MODE:
            return { isOpened: true, entry: action.entry };
        default:
            return state;
    }
}

export function fetchingVats(state = { isFetching: false, failure: false, vats: [] }, action) {
    switch (action.type) {
        case VAT_CONST.VATS_FETCHING_STARTED:
            return Object.assign({}, state, { isFetching: true });
        case VAT_CONST.VATS_FETCHING_SUCCESS:
            return Object.assign({}, state, { isFetching: false, vats: action.vats });
        case VAT_CONST.VATS_FETCHING_FAILURE:
            return Object.assign({}, state, { isFetching: false, failure: true });
        default:
            return state;
    }
}

const vatReducers = combineReducers({ isEditVisible, fetchingVats });

export default vatReducers;
