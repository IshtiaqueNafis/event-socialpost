import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";
import EventFilters from "./EventFilters";
import LoadingComponent from "../../../layout/LoadingComponent";
import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import {listenToEvents} from "../eventRedux/eventActions";
import {listenToEventsFromFirestore} from "../../../app/firestore/fireStoreService";

const EventDashBoard = () => {

    //region selectors.
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event) // event from selectors.
    const {loading} = useSelector(state => state.async); // async fdrom sleelctr.s
    //endregion

useFireStoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenToEvents(events)),
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
