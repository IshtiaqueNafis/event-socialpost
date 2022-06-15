import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncActionError, AsyncActionFinish, AsyncActionStart} from "./asyncSliceReducer";


const initialState = {
    authenticated: true,
    currentUser: {
        email: 'bub@gmail.com',
        photoURL: '/assets/user.png'
    }
};

export const signInUser = createAsyncThunk(
    "auth/SignInUser",
    async ({user}, thunkApi) => {
        thunkApi.dispatch(AsyncActionStart());
        try {
            thunkApi.dispatch(AsyncActionFinish());
            return user;
        } catch (e) {
            thunkApi.dispatch(AsyncActionError(e.messages))
        }
    }
)

export const authSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    extraReducers: {
        [signInUser.fulfilled](state, {payload}) {
            state.authenticated = true;
            state.currentUser = {
                email: payload.email,
                photoURL: '/assets/user.png',
            }
        }
    }
});

export const authReducer = authSlice.reducer;

