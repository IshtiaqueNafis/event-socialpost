import React from 'react';
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import {eventSelectors, getEventDetailsAsync} from "../../../redux/reducer/eventSliceReducer";
import useFireStoreDoc from "../../../app/hooks/useFireStoreDoc";
import {listenToEventFromFirestore} from "../../../app/firestore/fireStoreService";

const EventDetailedPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => eventSelectors.selectById(state, id));
    const {status, error} = useSelector(state => state.events);

    useFireStoreDoc({
        query: () => listenToEventFromFirestore(id),
        data: (event) => dispatch(getEventDetailsAsync({event})),
        deps: [ dispatch, id]
    })

    if (status === 'pending' || (!event && !error)) return <LoadingComponent content={'Loading Event'}/>
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
