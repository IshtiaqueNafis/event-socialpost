import React from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/events/eventsDetailed/EventDetailedPage";
import EventForm from "./features/events/eventForm/EventForm";
import {Route} from "react-router-dom";

const App = () => {


    return (
        <>
            <Route exact path={'/'} component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                // path={'/(.+)'} --> means follow any path after render
                <>
                    <NavBar/>
                    <Container className="main">
                        <Route exact path={'/events'} component={EventDashBoard}/>
                        <Route path={'/events/:id'} component={EventDetailedPage}/>
                        <Route path={['/createEvent', 'manage/:id']} component={EventForm}/>
                        {/*  path={['/createEvent','manage/:id']} means either of this two path will work    */}
                    </Container>
                </>


            )}/>

        </>
    );
};

export default App;
