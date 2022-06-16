import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";
import EventFilters from "./EventFilters";
import LoadingComponent from "../../../layout/LoadingComponent";
import {eventSelectors, loadEvents} from "../../../redux/reducer/eventSliceReducer";
import {listenToEventsFromFirestore} from "../../../app/firestore/fireStoreService";
import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import {Redirect} from "react-router-dom";

const EventDashBoard = () => {

    //region selectors.
    const dispatch = useDispatch();
    const events = useSelector(eventSelectors.selectAll);
    const {status, eventsLoaded} = useSelector(state => state.events);

    useFireStoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(loadEvents({events})),
        deps: [dispatch, eventsLoaded]
    })

    if (status === 'pending') return <LoadingComponent message={'Loading Events'}/>
    if (!events) return <Redirect to={'/error'}/>


    return (
        <Grid>
            <Grid.Column width={10}>
                {(status === 'pending') &&
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
