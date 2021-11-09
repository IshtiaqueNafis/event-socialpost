import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashBoard = ({formOpen, setFormOpen, selectEvent, selectedEvents}) => {
    //region ***{formOpen, setFormOpen, selectEvent, selectedEvents} parameters explained ***
    /*
                    formOpen--> pass the form state
                    setFormOpen--> manipulate form state for form
                    selectEvent-->  --> will setSelectEvents to null and setFormOpen to false
                    selectedEvents--> pass the state for selected events
     */

    //endregion


    //region ***state***
    const [events, setEvents] = useState(sampleData);  // this creates the sample data for the events.
    //endregion


    //region functions ***handleCreateEvent(event)***
    const handleCreateEvent = (event) => setEvents([...events, event])
    // [...events, event] --> it will return new object with array.
    //endregion

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} // passed the events up here
                           selectEvent={selectEvent}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen
                && <EventForm
                    setFormOpen={setFormOpen} // manipulate form state for form
                    setEvents={setEvents} // this will show all the added events from the data
                    createEvent={handleCreateEvent} // this creates a new event
                    selectedEvents={selectedEvents} // pass the state for selected events

                />}
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
