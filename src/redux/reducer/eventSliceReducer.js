import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {cancelEventToggle, dataFromSnapshot, listenToEventsFromFirestore} from "../../app/firestore/fireStoreService";
import firebase from "firebase/compat/app";
import cuid from "cuid";

const eventAdapter = createEntityAdapter({
    selectId: (event) => event.id
})


export const loadEvents = createAsyncThunk(
    'event/LoadEvents',
    async ({events}, thunkApi) => {
        try {
            if (events.length === 0) {
                return thunkApi.rejectWithValue({error: 'could not find data'});
            }
            return events;


        } catch (e) {
            return thunkApi.rejectWithValue({error: e.message});
        }
    }
);

export const getEventDetailsAsync = createAsyncThunk(
    'event/eventDetailsAsync',
    async ({id}, thunkApi) => {


        try {
            const event = await listenToEventsFromFirestore().doc(id).get().then(snapshot => dataFromSnapshot(snapshot));

            if (event === undefined) {
                return thunkApi.rejectWithValue({message: 'data not found'});
            }

            return event;

        } catch (e) {
            return thunkApi.rejectWithValue({error: 'data not found'});
        }
    },
)

export const addEventsAsync = createAsyncThunk(
    'event/addEventsAsync',
    async ({event}, thunkApi) => {
        try {
            const eventRef = await listenToEventsFromFirestore().add({
                ...event,
                hostedBy: 'Diana',
                hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
                attendees: firebase.firestore.FieldValue.arrayUnion({
                    id: cuid(),
                    hostedBy: 'Diana',
                    photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
                })

            })

            if (!eventRef) {
                return thunkApi.rejectWithValue('something went wrong');
            }
            return await listenToEventsFromFirestore().doc(eventRef.id).get().then(snapshot => dataFromSnapshot(snapshot));

        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)
export const updateEventAsync = createAsyncThunk(
    'event/UpdateEventsAsync',
    async ({event,isCancelled}, thunkApi) => {
        try {
            await listenToEventsFromFirestore().doc(event.id).update(event);

            if(isCancelled!==undefined){
                await cancelEventToggle(event);
            }

            const changes = await listenToEventsFromFirestore().doc(event.id).get().then(snapshot => dataFromSnapshot(snapshot));


            return {id: event.id, changes}
        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)

export const deleteEventAsync = createAsyncThunk(
    'event/DeleteEventsAsync',
    async ({id}, thunkApi) => {
        try {
            await listenToEventsFromFirestore().doc(id).delete();
            return id;
        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)

export const eventSlice = createSlice({
    name: "Event",
    initialState: eventAdapter.getInitialState({
        eventsLoaded: false,
        status: "idle",
        error: null
    }),
    reducers: {},

    extraReducers: {
        [getEventDetailsAsync.pending]: (state) => {
            state.status = "pending"
        },
        [getEventDetailsAsync.fulfilled]: (state, {payload}) => {
            eventAdapter.upsertOne(state, payload);
            state.status = "idle"
            state.error = null;
        },
        [getEventDetailsAsync.rejected]: (state, {payload}) => {

            state.status = "idle";
            state.error = payload;
        },

        [loadEvents.pending]: (state) => {
            state.status = "pending"
        },
        [loadEvents.fulfilled]: (state, {payload}) => {
            eventAdapter.setAll(state, payload);

            state.status = "idle"
            state.eventsLoaded = false;
            state.error = null;
        },
        [loadEvents.rejected]: (state, {payload}) => {
            state.status = "idle"
            state.error = payload
        },
        [addEventsAsync.pending]: (state) => {
            state.status = "pending"
        },
        [addEventsAsync.fulfilled]: (state, {payload}) => {
            eventAdapter.addOne(state, payload);

            state.status = "idle"
            state.error = null;
        },
        [addEventsAsync.rejected]: (state, {payload}) => {
            state.status = "idle"
            state.error = payload
        },
        [updateEventAsync.pending]: (state, {payload}) => {
            state.status = "pending"
        },
        [updateEventAsync.fulfilled]: (state, {payload}) => {
            eventAdapter.updateOne(state, {id: payload.id, changes: payload.changes});

            state.status = "idle"
            state.error = null;
        },
        [updateEventAsync.rejected]: (state, {payload}) => {
            state.status = "idle"
            state.error = payload
        },
        [deleteEventAsync.pending]: (state) => {
            state.status = "pending"
        },
        [deleteEventAsync.fulfilled]: (state, {payload}) => {
            eventAdapter.removeOne(state, payload);
            state.status = "idle"
            state.error = null;
        },
        [deleteEventAsync.rejected]: (state, {payload}) => {
            state.status = "idle"
            state.error = payload
        }


    }
})
export const eventSelectors = eventAdapter.getSelectors(state => state.events);
export const {
    selectIds, // will return all the ids
    selectEntities, // will return all the arrays
    selectById, // find a id and return it
    selectTotal, // how much entity is there
    selectAll, // will return everything
} = eventSelectors
export const eventReducer = eventSlice.reducer;