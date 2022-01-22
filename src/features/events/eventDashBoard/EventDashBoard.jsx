import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import {useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";
import EventFilters from "./EventFilters";
import LoadingComponent from "../../../layout/LoadingComponent";
import {dataFromSnapshot, getEventsFromFirestore} from "../../../app/firestore/fireStoreService";

const EventDashBoard = () => {

    //region selectors.
    const {events} = useSelector(state => state.event) // event from selectors.
    const {loading} = useSelector(state => state.async); // async fdrom sleelctr.s
    //endregion

    useEffect(()=>{
        const unsubscribe = getEventsFromFirestore({
            next: snapshot => console.log(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))),
            error: error => console.log(error)
        })
        return unsubscribe;
    })

    if (loading) return <LoadingComponent/>


    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                <>
                    <EventListItemPlaceholder/>
                    <EventListItemPlaceholder/>
                </>
                }
                <EventList events={events}

                />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
};

export default EventDashBoard;
