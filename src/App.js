import React, {useState} from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

const App = () => {
    //region states
    const [formOpen, setFormOpen] = useState(false); // this sets true or false whther the form is going to be opened.
    const [selectedEvents, setSelectedEvents] = useState(null); // set the selected Event
    //endregion

    //region functions   handleSelectEvent(event), handleCreateFormOpen()
    //region handleSelectEvent(event) --> set selected events
    const handleSelectEvent = (event) => {
        setSelectedEvents(event);
        setFormOpen(true);
    }
    //endregion


    //region handleCreateFormOpen() --> handles events and form opening
    const handleCreateFormOpen = () => {
        setSelectedEvents(null);
        setFormOpen(false);
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
                    selectedEvents={selectedEvents} // pass the state for selected events
                />
            </Container>
        </>
    );
};

export default App;
