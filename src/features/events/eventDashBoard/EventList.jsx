import React from 'react';
import EventListItem from "./EventListItem";

const EventList = ({events,selectEvent,deleteEvent}) => {
    //region ***{events,selectEvent}***
    /*
    events --> is an array with all the data
    selectEvent --> selects the event
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
