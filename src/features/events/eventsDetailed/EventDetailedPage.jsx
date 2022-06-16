import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import {eventSelectors, getEventDetailsAsync} from "../../../redux/reducer/eventSliceReducer";

const EventDetailedPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => eventSelectors.selectById(state, id));
    const {status, error} = useSelector(state => state.events);
    useEffect(() => {
        if (!event) dispatch(getEventDetailsAsync({id}))
    }, [id, dispatch, event])

    if (status === 'pending' || (!event && !error) ) return <LoadingComponent message={'Loading Event'}/>
    if (!event) return <Redirect to={'/error'}/>

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
