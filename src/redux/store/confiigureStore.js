import {configureStore} from "@reduxjs/toolkit";
import {modalReducer} from "../reducer/modalSliceReducer";
import {eventReducer} from "../reducer/eventSliceReducer";
import {asyncReducer} from "../reducer/asyncSliceReducer";
import {authReducer} from "../reducer/authSliceReducer";
import {logger} from "redux-logger/src";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        events: eventReducer,
        async: asyncReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
})
