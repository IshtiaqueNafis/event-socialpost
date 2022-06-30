import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {
    cancelEventToggle,
    dataFromSnapshot,
    eventsFromFireStore,
    listenToEventsFromFirestoreQuery
} from "../../app/firestore/fireStoreService";
import firebase from "firebase/compat/app";

const eventAdapter = createEntityAdapter({
    selectId: (event) => event.id
})


export const loadEvents = createAsyncThunk(
    'event/LoadEvents',
    async ({events}, thunkApi) => {
        try {

            return events;


        } catch (e) {
            return thunkApi.rejectWithValue({error: e.message});
        }
    }
);

export const getEventDetailsAsync = createAsyncThunk(
    'event/eventDetailsAsync',
    async ({event}, thunkApi) => {


        try {


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
            const user = firebase.auth().currentUser;
            const eventRef = await eventsFromFireStore().add({
                ...event,
                hostUid: user.uid,
                hostedBy: user.displayName,
                hostPhotoURL: user.photoURL || null,
                attendees: firebase.firestore.FieldValue.arrayUnion({
                    id: user.uid,
                    hostedBy: user.displayName,
                    displayName: user.displayName,
                    photoURL: user.photoURL || null

                }),
                attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)

            })

            if (!eventRef) {
                return thunkApi.rejectWithValue('something went wrong');
            }
            return await eventsFromFireStore().doc(eventRef.id).get().then(snapshot => dataFromSnapshot(snapshot));

        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)
export const updateEventAsync = createAsyncThunk(
    'event/UpdateEventsAsync',
    async ({event, isCancelled}, thunkApi) => {
        try {
            await listenToEventsFromFirestoreQuery().doc(event.id).update(event);

            if (isCancelled !== undefined) {
                await cancelEventToggle(event);
            }

            const changes = await listenToEventsFromFirestoreQuery().doc(event.id).get().then(snapshot => dataFromSnapshot(snapshot));


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
            await listenToEventsFromFirestoreQuery().doc(id).delete();
            return id;
        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)

export const eventSlice = createSlice({
    name: "Event",
    initialState: eventAdapter.getInitialState({
        comments: [],
        eventsLoaded: false,
        status: "idle",
        error: null
    }),
    reducers: {
        setFilter: (state) => {
            state.eventsLoaded = false;
        },
        listenToEventChat: (state, {payload}) => {
            state.comments = [...payload]
        },

        clearComments: (state) => {
            state.comments = [];
        }


    },

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
            state.eventsLoaded = true;
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
        },


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
export const {setFilter, listenToEventChat, clearComments} = eventSlice.actions