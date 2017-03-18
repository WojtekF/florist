// A ".tsx" file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as c from "../configuration";

export const VAT_CONST = {
    VATS_FETCHING_FAILURE: "VATS_FETCHING_FAILURE",
    VATS_FETCHING_STARTED: "VATS_FETCHING_STARTED",
    VATS_FETCHING_SUCCESS: "VATS_FETCHING_SUCCESS",
    VAT_DELETE: "VAT_DELETE",
    VAT_EDIT_MODE: "VAT_EDIT_MODE",
    VAT_MODAL_VISIBILITY: "VAT_MODAL_VISIBILITY",
};

export function toggleVatEdit(open: boolean) {
    return {
        type: VAT_CONST.VAT_MODAL_VISIBILITY,
        open,
    };
}

export function setVatToDeletion(id: number) {
    return (dispatch) => {
        dispatch({ type: VAT_CONST.VATS_FETCHING_STARTED });

        return fetch(c.default.url + "/api/vats/remove",
            {
                body: JSON.stringify(id),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                method: "post",
            },
        )
            .then((response) => response.json())
            .then((flag) => {
                return flag.Value ? dispatch(fetchVats()) : dispatch({ type: VAT_CONST.VATS_FETCHING_FAILURE });
            })
            .catch((err) => dispatch({ type: VAT_CONST.VATS_FETCHING_FAILURE }));
    };
}
export function saveVat(entry: IVatEntry) {
    return (dispatch) => {
        dispatch({ type: VAT_CONST.VATS_FETCHING_STARTED });

        const method = entry.Id === 0 ? "add" : "change";

        return fetch(c.default.url + "/api/vats/" + method,
            {
                body: JSON.stringify(entry),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                method: "post",
            },
        )
            .then((response) => response.json())
            .then((flag) => flag.Value ? dispatch(fetchVats()) : dispatch({ type: VAT_CONST.VATS_FETCHING_FAILURE }))
            .catch((err) => dispatch({ type: VAT_CONST.VATS_FETCHING_FAILURE }));
    };
}

export function setVatToEdit(entry: IVatEntry) {
    return {
        type: VAT_CONST.VAT_EDIT_MODE,
        entry,
    };
}

export function fetchVats() {
    return (dispatch) => {
        dispatch({ type: VAT_CONST.VATS_FETCHING_STARTED });
        return fetch(c.default.url + "/api/vats/get")
            .then((response) => response.json())
            .then((json) => dispatch({ type: VAT_CONST.VATS_FETCHING_SUCCESS, vats: json }))
            .catch((error) => dispatch({ type: VAT_CONST.VATS_FETCHING_FAILURE }));
    };
}
