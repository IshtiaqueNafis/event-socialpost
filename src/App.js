import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import {ToastContainer} from "react-toastify";
import {Route} from "react-router-dom";
import EventDashBoard from "./features/events/eventDashBoard/EventDashBoard";
import NavBar from "./features/nav/NavBar";
import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/events/eventsDetailed/EventDetailedPage";
import UpdateEvent from "./features/events/eventForm/UpdateEvent";
import Sandbox from "./features/sandBox/Sandbox";
import ModalManager from "./app/common/modals/ModalManager";
import ErrorComponent from "./app/common/ErrorComponent";
import CreateEvent from "./features/events/eventForm/CreateEvent";
import {useDispatch, useSelector} from "react-redux";

import {verifyAuth} from "./redux/reducer/authSliceReducer";
import AccountPage from "./features/auth/AccountPage";
import LoadingComponent from "./layout/LoadingComponent";
import ProfilePage from "./features/profiles/profilePage/ProfilePage";

const App = () => {

    const {initialized} = useSelector(state => state.async);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(verifyAuth());
    }, [dispatch])

    if (!initialized) return <LoadingComponent content={'Loading App'}/>;

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
                        <Route path={'/manage/:id'} component={UpdateEvent}/>
                        <Route path={'/createEvent'} component={CreateEvent}/>
                        <Route path={'/error'} component={ErrorComponent}/>
                        <Route path={'/profile/:id'} component={ProfilePage}/>
                        <Route path={'/Account'} component={AccountPage}/>
                    </Container>
                </>


            )}/>

        </>
    );
};

export default App;
