import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";

const EventDashBoard = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Right Columns</h2>
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
