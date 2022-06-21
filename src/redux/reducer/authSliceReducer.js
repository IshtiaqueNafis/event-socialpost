import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncActionError} from "./asyncSliceReducer";
import firebase from "firebase/compat/app";
import {setUserProfileData} from "../../app/firestore/fireStoreService";
import {closeModal} from "./modalSliceReducer";


const initialState = {
    authenticated: false,
    currentUser: null,
    status: 'idle',
    error: null,

};

export const signInUser = createAsyncThunk(
    "auth/SignInUser",
    async ({credentials}, thunkApi) => {

        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            thunkApi.dispatch(closeModal());

        } catch (e) {

            return thunkApi.rejectWithValue({message: 'Wrong email or password'});
        }
    }
)

export const registerUserAsync = createAsyncThunk(
    "auth/RegisterUser",
    async ({credentials}, thunkApi) => {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            await result.user.updateProfile({
                displayName: credentials.displayName
            });
            return await setUserProfileData(result.user);
        } catch (e) {
          
            return thunkApi.rejectWithValue(e.message);
        }
    }
)


export const signOutUser = createAsyncThunk(
    'auth/signOutUser',
    async (_, thunkApi) => {

        try {
            await firebase.auth().signOut();

        } catch (e) {
            return thunkApi.dispatch(AsyncActionError(e.messages))
        }
    }
)

export const authSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.currentUser = {
                email: payload.email,
                photoUrl: '/assets/user.png'
            }
            state.authenticated = true;
        }
    },
    extraReducers: {
        //region *** signInUser***
        [signInUser.pending]: (state) => {
            state.status = 'pending';
        },

        [signInUser.fulfilled](state, {payload}) {

            state.status = "idle";
        },

        [signInUser.rejected](state, {payload}) {
            state.status = "idle";
            state.error = payload;
        },
        //endregion

        //region *** SIGNOUT ***
        [signOutUser.pending]: (state) => {
            state.status = 'pending';
        },
        [signOutUser.fulfilled]: (state) => {
            state.currentUser = null;
            state.authenticated = false;
            state.status = "idle"
        },
        [signOutUser.rejected]: (state, {payload}) => {
            state.status = "idle";
            state.error = payload;
        },
        //endregion

        [registerUserAsync.pending]: (state) => {
            state.status = 'pending';
        },
        [registerUserAsync.fulfilled]: (state) => {
            state.status = 'idle';
        },
        [registerUserAsync.rejected]: (state, action) => {
            state.status = "idle";
            console.log({action})
        }
    }
});
export const {setUser} = authSlice.actions;
export const authReducer = authSlice.reducer;

