import React from 'react';
import {Header, Menu} from "semantic-ui-react";
import Calendar from "react-calendar";
import {useDispatch} from "react-redux";
import {setFilter} from "../../../redux/reducer/eventSliceReducer";
import firebase from "firebase/compat";

const EventFilters = ({setPredicate, predicate ,loading}) => {
    const dispatch = useDispatch();
    return (
        <>
            <Menu vertical size={'large'} style={{width: '100%'}}>
                <Header icon={'filter'} attached color={'teal'} content={'Filters'}/>
                <Menu.Item content={'All EVENTS'}
                           active={predicate.get('filter') === "all"}
                           onClick={() => {
                               dispatch(setFilter());
                               setPredicate('filter', "all")
                           }}

                />
                <Menu.Item content={"I 'm Going"}
                           active={predicate.get('filter') === "isGoing"}
                           onClick={() => {
                               dispatch(setFilter());
                               setPredicate('filter', "isGoing");
                           }}


                />
                <Menu.Item content={"I 'm Hosting"}
                           active={predicate.get('filter') === "isHost"}
                           onClick={() => setPredicate('filter', "isHost")}


                />
            </Menu>
            <Header icon={'calendar'} attached color={'teal'} content={'Select Date'}/>
            <Calendar
            onChange={date=>setPredicate('starDate',date)}
            value={  predicate.get('startDate') || new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString()}
            tileDisabled={()=>loading}
            />
        </>
    );
};

export default EventFilters;
