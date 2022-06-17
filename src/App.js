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

import {setUser} from "./redux/reducer/authSliceReducer";
import firebase from "firebase/compat";

const App = () => {
    const {user, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const unsub = firebase.auth().onAuthStateChanged(logged=>{
            if(logged){
                dispatch(setUser(logged));
            }
        })
        return () => unsub();
    },[dispatch])

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

                    </Container>
                </>


            )}/>

        </>
    );
};

export default App;
