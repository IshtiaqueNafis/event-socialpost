import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";


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


export const profileSlice = createSlice({
    name: 'profile',
    initialState: profileAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {},
    extraReducers: {
        [listenCurrentUserProfileAsync.pending]: (state) => {
            state.status = "pending";
        },
        [listenCurrentUserProfileAsync.fulfilled]: (state, {payload}) => {
            profileAdapter.upsertOne(state, payload);
            state.status = "idle"
            state.error = null;
        },
        [listenCurrentUserProfileAsync.rejected]:(state,{payload})=>{
            state.status = "idle";
            state.error = {payload};
        }
    }
})
export const profileSelectors = profileAdapter.getSelectors(state => state.profile);
export const profileReducer = profileSlice.reducer;
