import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
//adds dev tools. with mioddle ware
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk'

export function configureStore() {
    return createStore(
        rootReducer, // this is the rootreducer.

        composeWithDevTools(
            applyMiddleware // this applies the middleware
                (thunk) // this is the thunk from redux thunk
        )
    );
}
