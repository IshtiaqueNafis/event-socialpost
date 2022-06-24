import {configureStore} from "@reduxjs/toolkit";
import {modalReducer} from "../reducer/modalSliceReducer";
import {eventReducer} from "../reducer/eventSliceReducer";
import {asyncReducer} from "../reducer/asyncSliceReducer";
import {authReducer} from "../reducer/authSliceReducer";
import {logger} from "redux-logger/src";
import {profileReducer} from "../reducer/profileSliceReducer";



export const store = configureStore({
    reducer: {
        modal: modalReducer,
        events: eventReducer,
        async: asyncReducer,
        auth: authReducer,
        profile: profileReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
})
