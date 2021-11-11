import React from 'react';
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {useSelector} from "react-redux";

const EventDetailedPage = ({match}) => {
    //region ***match***
    //{match} comes from history hooks
    const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    //   as={Link} to={`/events/${event.id}`} this where the paramrams .id is coming froom
    // this geting a single event.
    //region
    /*
    useSelector(state => state.event.events.find(e => e.id === match.params.id));
    state => state.event.events.find
    cause events is an array match.params.id comes from historyhooks
     */

    //endregion
    //endregion
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSideBar attendees={event.attendees}/>
            </Grid.Column>

        </Grid>
    );
};

export default EventDetailedPage;
