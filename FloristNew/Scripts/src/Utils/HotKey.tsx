// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/**
 * Created by W on 19.04.2016.
 */
import * as listen from "event-listener";
import * as React from "react";
import * as SyntheticKeyboardEvent from "react-dom/lib/SyntheticKeyboardEvent";

const documentListener = {};

// Container for all the handlers
const handlers = [];

export function addHandler(handler) {
    handlers.push(handler);
}

export function removeHandler(handler) {
    const index = handlers.indexOf(handler);
    handlers.splice(index, 1);
}
// Dispatch the event, in order, to all interested listeners
// The most recently mounted component is the first to receive the event
// Cribbed from a combination of SimpleEventPlugin and EventPluginUtils
function dispatchEvent(event, hs) {
    for (let i = (hs.length - 1); i >= 0; i--) {
        if (event.isPropagationStopped()) {
            break;
        }
        const returnValue = handlers[i](event);
        if (returnValue === false) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

// Create and dispatch an event object using React's object pool
// Cribbed from SimpleEventPlugin and EventPluginHub
function handle(nativeEvent) {
    const event = SyntheticKeyboardEvent.getPooled({}, "hotkey", nativeEvent);
    try {
        dispatchEvent(event, handlers);
    } finally {
        if (!event.isPersistent()) {
            event.constructor.release(event);
        }
    }
}
/**
 * Enable the global event listener. Is idempotent.
 */
export function activate(event = null) {
    if (!event) {
        event = "keyup";
    }
    if (!documentListener[event]) {
        documentListener[event] = listen(document, event, handle);
    }
}
/**
 * Disable the global event listener. Is idempotent.
 */
export function disable(event) {
    if (!event) {
        event = "keyup";
    }
    if (documentListener[event]) {
        documentListener[event].remove();
        documentListener[event] = null;
    }
}
