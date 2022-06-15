import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";
import EventFilters from "./EventFilters";
import LoadingComponent from "../../../layout/LoadingComponent";
import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import {listenToEventsFromFirestore} from "../../../app/firestore/fireStoreService";
import {loadEvents} from "../../../redux/reducer/eventSliceReducer";

const EventDashBoard = () => {

    //region selectors.
    const dispatch = useDispatch();
    const {events,loading} = useSelector(state => state.event) // event from selectors.

    //endregion

    useFireStoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(loadEvents({events})),
        deps: [dispatch]

    })

    if (loading) return <LoadingComponent/>


    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                <>
                    <EventListItemPlaceholder/>
                    <EventListItemPlaceholder/>
                </>
                }
                <EventList events={events}

                />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
