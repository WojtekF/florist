// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import vatReducer from "./vatReducers";

export default function configureStore() {
    return createStore(
        vatReducer,
        {},
        applyMiddleware(
            thunkMiddleware,
        ),
    );
}
