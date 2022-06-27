import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import thunk from "redux-thunk";


const profileAdapter = createEntityAdapter({
    selectId: (profile) => profile.id
})


export const listenCurrentUserProfileAsync = createAsyncThunk(
    'profile/listenCurrentUserProfileAsync',
    async ({profile}, thunkApi) => {
        try {
            if (profile === undefined) {
                return thunkApi.rejectWithValue({error: 'error'})
            }
            return profile;
        } catch (e) {
            return thunkApi.rejectWithValue({error: e.message});
        }
    }
);

export const listenToSelectedUserProfile = createAsyncThunk(
    'profile/loadingProfile',
    async ({profile}, thunkApi) => {
        try {
            if (profile === undefined) {
                return thunkApi.rejectWithValue({error: 'error'})
            }
            return profile;

        } catch (e) {
            return thunkApi.rejectWithValue({error: e.message});
        }

    }
)

export const listenToUserPhotosAsync = createAsyncThunk(
    'profile/getPhotosUser',
    async ({photos}, thunkApi) => {
        try {
           
            return photos;
        } catch (e) {
            return thunkApi.rejectWithValue({error: e.message});
        }
    }
    ,)

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        status: 'idle',
        error: null,
        currentUserProfile: null,
        selectedUserProfile: null,
        photos: []
    },


    reducers: {
        listenToCurrentUserProfile: (state, {payload}) => {
            state.currentUserProfile = payload;
        },
        resetProfileState: (state) => {
            state.currentUserProfile = null;
            state.selectedUserProfile = null;
        },
        listenToSelectedUserProfile: (state, {payload}) => {
            state.selectedUserProfile = payload;
        }

    },
    extraReducers: {
        [listenCurrentUserProfileAsync.pending]: (state) => {
            state.status = "pending";
        },
        [listenCurrentUserProfileAsync.fulfilled]: (state, {payload}) => {
            state.currentUserProfile = payload;
            state.status = "idle"
            state.error = null;
        },
        [listenCurrentUserProfileAsync.rejected]: (state, {payload}) => {
            state.status = "idle";
            state.error = {payload};
        },
        [listenToSelectedUserProfile.pending]: (state) => {
            state.status = "pending";
        },
        [listenToSelectedUserProfile.fulfilled]: (state, {payload}) => {
            state.selectedUserProfile = payload;
            state.status = "idle"
            state.error = null;
        },
        [listenToSelectedUserProfile.rejected]: (state, {payload}) => {
            state.status = "idle";
            state.error = {payload};
        },
        [listenToUserPhotosAsync.pending]: (state) => {
            state.status = "pending";
        },
        [listenToUserPhotosAsync.fulfilled]: (state, {payload}) => {
            state.photos = [...payload];
            state.status = "idle"
            state.error = null;
        },
        [listenToUserPhotosAsync.rejected]: (state, {payload}) => {
            state.status = "idle";
            state.error = {payload};
        }
    }
})
export const {listenToCurrentUserProfile, resetProfileState} = profileSlice.actions;
export const profileSelectors = profileAdapter.getSelectors(state => state.profile);
export const profileReducer = profileSlice.reducer;
