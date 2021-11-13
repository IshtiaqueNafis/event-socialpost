import React from 'react';
import {Container} from "semantic-ui-react";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";

import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/events/eventsDetailed/EventDetailedPage";
import EventForm from "./features/events/eventForm/EventForm";
import {Route, useLocation} from "react-router-dom";
import Sandbox from "./features/sandBox/Sandbox";
import ModalManager from "./app/common/modals/ModalManager";

const App = () => {
    const {key} = useLocation(); // updates the page

    return (
        <>
            <ModalManager/>
            <Route exact path={'/'} component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                // path={'/(.+)'} --> means follow any path after render
                <>
                    <NavBar/>
                    <Container className="main">
                        <Route exact path={'/events'} component={EventDashBoard}/>
                        <Route exact path={'/sandBox'} component={Sandbox}/>
                        <Route path={'/events/:id'} component={EventDetailedPage}/>
                        <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key}/>
                        {/*key is being passed so the keys will be updated here when data on componenet chagnes */}
                        {/*  path={['/createEvent','manage/:id']} means either of this two path will work  // updates the page   */}
                    </Container>
                </>


            )}/>

        </>
    );
};

export default App;
