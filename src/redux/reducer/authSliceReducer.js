import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncActionError, asyncAppLoaded} from "./asyncSliceReducer";
import firebase from "firebase/compat/app";
import {dataFromSnapshot, getUserProfile, setUserProfileData} from "../../app/firestore/fireStoreService";
import {closeModal} from "./modalSliceReducer";
import {listenCurrentUserProfileAsync, listenToCurrentUserProfile, resetProfileState} from "./profileSliceReducer";


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
            await setUserProfileData(result.user);
            thunkApi.dispatch(closeModal());
        } catch (e) {

            return thunkApi.rejectWithValue({message: e});
        }
    }
)

export const setUserAsync = createAsyncThunk(
    "auth/setUserAsync",
    async ({user}, thunkApi) => {
        try {
            return user;
        } catch (e) {

        }
    }
)

export const verifyAuth = createAsyncThunk(
    'auth/verifyUser',
    async (_, thunkApi) => {
        try {
          return  await firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    thunkApi.dispatch(setUser(user));
                    const profileRef = getUserProfile(user.uid);
                    profileRef.onSnapshot(snapshot => {
                        thunkApi.dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                        
                    })
                } else {
                    thunkApi.dispatch(resetUser());
                    thunkApi.dispatch(resetProfileState());
                    
                }
            })
        } catch (e) {

        }


    },{

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
        setUser: (state,{payload}) => {
            state.currentUser = {
                email: payload.email,
                photoURL: payload.photoURL,
                uid: payload.uid,
                displayName: payload.displayName,
                providerId: payload.providerData[0].providerId
            };
            state.authenticated = true;
        },

        resetUser: (state) => {
            state.currentUser = null;
            state.authenticated = false;
        },
        setAuthenticated: (state) => {
            state.authenticated = true;
        }
    },
    extraReducers: {
        //region *** signInUser***
        [signInUser.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
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
            state.error = action.payload;
        },
        [setUserAsync.pending]: (state) => {
            state.status = "pending";
            state.authenticated = false;
        },
        [setUserAsync.fulfilled]: (state, {payload}) => {
            state.currentUser = {
                email: payload.email,
                photoURL: payload.photoURL,
                uid: payload.uid,
                displayName: payload.displayName,
                providerId: payload.providerData[0].providerId
            }
            state.authenticated = true;
            state.status = "idle";
        },
        [verifyAuth.pending]: (state) => {

        }

    }
});
export const {resetUser, setAuthenticated,setUser} = authSlice.actions;
export const authReducer = authSlice.reducer;

