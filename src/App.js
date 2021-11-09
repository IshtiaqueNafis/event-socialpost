import React from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

const App = () => (
    <>
        <NavBar/>

        <Container className="main">
        <EventDashBoard/>
        </Container>
    </>
);

export default App;
