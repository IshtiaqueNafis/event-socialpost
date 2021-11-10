import React, {useState} from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

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
                <EventDashBoard
                    formOpen={formOpen} //pass the form state
                    setFormOpen={setFormOpen} // manipulate form state for form
                    selectEvent={handleSelectEvent} // --> will setSelectEvents to null and setFormOpen to false
                    selectedEvent={selectedEvent} // pass the state for selected events
                />
            </Container>
        </>
    );
};

export default App;
