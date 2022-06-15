import {createSlice} from "@reduxjs/toolkit";

export const asyncSlice = createSlice({
    name: "async",
    initialState: {
        loading: false, error: null
    },
    reducers: {

        //region *** AsyncActionStart, ASYNC_ACTION_FINISH,ASYNC_ACTION_ERROR***
        AsyncActionStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        AsyncActionFinish: (state) => {
            state.loading = false;
            state.error = null;
        },
        AsyncActionError: (state, payload) => {
            state.error = payload;
        }
        //endregion


    }
});


export const {AsyncActionStart, AsyncActionFinish, AsyncActionError} = asyncSlice.actions;
export const asyncReducer = asyncSlice.reducer;