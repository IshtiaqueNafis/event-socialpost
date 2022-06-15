import React from 'react';
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {useDispatch, useSelector} from "react-redux";
import useFireStoreDoc from "../../../app/hooks/useFireStoreDoc";
import {listenToEventsFromFirestore} from "../../../app/firestore/fireStoreService";
import {listenToEvents} from "../eventRedux/eventActions";
import {Redirect, useParams} from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";

const EventDetailedPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events.find(e => e.id === id));
    const {error} = useSelector(state => state.async);
    const {loading} = useSelector(state => state.event);
    useFireStoreDoc({
        query: () => listenToEventsFromFirestore(id),
        data: event => dispatch(listenToEvents([event])),
        deps: [id, dispatch]
    })
    if (loading || (!event && !error)) return <LoadingComponent content={'Loading event'}/>
    if (error) return <Redirect to={'/error'}/>

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSideBar attendees={event?.attendees}/>
            </Grid.Column>

        </Grid>
    );
};

export default EventDetailedPage;
