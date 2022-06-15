import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncActionError} from "./asyncSliceReducer";

export const loadEvents = createAsyncThunk(
    'event/LoadEvents',
    async ({events}, thunkApi) => {

        try {
            return events;

        } catch (e) {
            thunkApi.dispatch(AsyncActionError())
        }
    }
)


export const eventSlice = createSlice({
    name: "Event",
    initialState: {
        events: [],
        loading: false

    },
    extraReducers: {
        [loadEvents.pending]: (state) => {
            state.loading = true;
        },
        [loadEvents.fulfilled]: (state, {payload}) => {
            state.events = [...payload];
            state.loading = false;
        }
    }
})

export const eventReducer = eventSlice.reducer;