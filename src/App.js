import React from 'react';
import {Container} from "semantic-ui-react";
import {ToastContainer} from "react-toastify";
import {Route, useLocation} from "react-router-dom";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";
import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/events/eventsDetailed/EventDetailedPage";
import EventForm from "./features/events/eventForm/EventForm";
import Sandbox from "./features/sandBox/Sandbox";
import ModalManager from "./app/common/modals/ModalManager";
import ErrorComponent from "./app/common/ErrorComponent";

const App = () => {
    const {key} = useLocation(); // updates the page

    return (
        <>
            <ModalManager/>
            <ToastContainer theme={"colored"} position={'bottom-right'} hideProgressBar/>
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
                        <Route path={'/error'} component={ErrorComponent} />

                    </Container>
                </>


            )}/>

        </>
    );
};

export default App;
