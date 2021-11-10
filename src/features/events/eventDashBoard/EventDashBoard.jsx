import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashBoard = ({formOpen, setFormOpen, selectEvent, selectedEvent}) => {
    //region ***{formOpen, setFormOpen, selectEvent, selectedEvents} parameters explained ***
    /*
                    formOpen--> pass the form state
                    setFormOpen()--> manipulate form state for form to be closed or open
                    selectEvent(event)--> takes a event parameter and sets the event.
                    selectedEvent--> pass the state for selected events
     */

    //endregion


    //region ***state***
    const [events, setEvents] = useState(sampleData);  // this creates the sample data for the events.
    //endregion


    //region functions ***handleCreateEvent(event),handleUpdatedEvent(event),***

    //region handleCreateEvent(event) --> create events
    const handleCreateEvent = (event) => setEvents([...events, event])
    // setEvents([...events, event])
    /*
    ...events --> spread the current events on array
    event --> event means it will be added there
     */
    //endregion

    //region handleUpdatedEvent --> (updateEvent)
    const handleUpdatedEvent = (updatedEvent) => {
        setEvents(events.map // note that events comes from events from the  const [events, setEvents] = useState(sampleData);
            (event => event.id === updatedEvent.id  // pass in the updated event
                ? updatedEvent // updateEvent return
                : event)) // else returns event in general
        selectEvent(null); // as the data formatting is done
    }
    //endregion

    //region handleDeleteEvent(eventID) --> takes an eventID and deletes it
    const handleDeleteEvent = (eventId) => setEvents(events.filter(event => event.id !== eventId)); // look for events and delte it.
    //endregion

    // [...events, event] --> it will return new object with array.
    //endregion

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} // passed the events up here
                           selectEvent={selectEvent} // selects a event
                           deleteEvent={handleDeleteEvent} // this will delete event
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen
                && <EventForm
                    setFormOpen={setFormOpen} // manipulate form state for form
                    setEvents={setEvents} // this will show all the added events from the data
                    createEvent={handleCreateEvent} // this creates a new event
                    selectedEvent={selectedEvent} // pass the state for selected events
                    key={selectedEvent ? selectedEvent.id : null}
                    updateEvent={handleUpdatedEvent} // this updated the event


                />}
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
