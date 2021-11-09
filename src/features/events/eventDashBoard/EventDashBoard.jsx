import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashBoard = ({formOpen, setFormOpen}) => {
    const [events, setEvents] = useState(sampleData);
    // this creates the sample data for the events.

    //region
    const handleCreateEvent = (event) => setEvents([...events, event])
    // [...events, event] --> it will return new object with array.
    //endregion

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen
                && <EventForm
                    setFormOpen={setFormOpen}
                    setEvents={setEvents}
                    createEvent={handleCreateEvent}

                />}
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
