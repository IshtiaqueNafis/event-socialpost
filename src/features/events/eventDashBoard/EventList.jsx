import React from 'react';
import EventListItem from "./EventListItem";

const EventList = ({events,selectEvent,deleteEvent}) => {



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
