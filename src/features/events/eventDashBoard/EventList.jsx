import React from 'react';
import EventListItem from "./EventListItem";

const EventList = ({events,selectEvent,deleteEvent}) => {
    //region ***{events,selectEvent}***
    /*
    events [] --> is an array with all the data
    selectEvent(event) --> selects the event takes parameter
    deleteEvent(eventId)-->takes an id to delete parameters
     */


    //endregion
    return (
        <>
            {events.map(event => (
                <EventListItem
                    key={event.id}
                    event={event}
                    selectEvent={selectEvent}
                    deleteEvent={deleteEvent}

                />

            ))}


        </>
    );
};

export default EventList;
