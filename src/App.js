import React, {useState} from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/events/eventsDetailed/EventDetailedPage";
import EventForm from "./features/events/eventForm/EventForm";
import {Route, Switch} from "react-router-dom";

const App = () => {

    //region ***states***
    const [formOpen, setFormOpen] = useState(false); // this sets true or false whether the form is going to be opened.
    const [selectedEvent, setSelectedEvent] = useState(null); // set the selected Event
    //endregion


    //region functions  ***handleSelectEvent(event), handleCreateFormOpen()***

    //region ***handleSelectEvent(event) --> set selected events***
    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // set an event to be selected
        setFormOpen(true); // opens the form
    }
    //endregion


    //region ***handleCreateFormOpen() --> handles events and form opening***
    const handleCreateFormOpen = () => {
        setSelectedEvent(null); // means everything will be null
        setFormOpen(true); //opens the form
    }
    //endregion

    //endregion

    return (
        <>
            <NavBar setFormOpen={handleCreateFormOpen}/>
            <Container className="main">


                    <Route exact path={'/'} component={HomePage}/>
                    <Route exact path={'/events'} component={EventDashBoard}/>
                    <Route path={'/events/:id'} component={EventDetailedPage}/>
                    <Route path={'/createEvent'} component={EventForm}/>



            </Container>
        </>
    );
};

export default App;
