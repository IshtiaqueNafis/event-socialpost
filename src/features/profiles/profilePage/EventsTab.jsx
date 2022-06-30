import React, {useState} from 'react';
import {Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import {getUserEventQuery} from "../../../app/firestore/fireStoreService";
import {listenToUserEvents} from "../../../redux/reducer/profileSliceReducer";
import LoadingComponent from "../../../layout/LoadingComponent";
import {format} from "date-fns";

const EventsTab = ({profile, isCurrentUser}) => {
    const [activeTab, setActiveTab] = useState(0); // will let user edit form
    const panes = [
        {menuItem: "Future Events", pane: {key: 'future'}},
        {menuItem: "Past Events", pane: {key: 'past'}},
        {menuItem: "All Events", pane: {key: 'hosting'}}
    ];
    const {profileEvents, status} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useFireStoreCollection({
        query: () => getUserEventQuery(activeTab, profile.id),
        data: events => dispatch(listenToUserEvents({events})),
        deps: [activeTab, dispatch, profile.id]
    })



    return (
        <Tab.Pane loading={status==="pending"}>

            <Grid>
                <Grid.Column width={16}>
                    <Header floated={'left'} icon={'calendar'} content={`Events`}/>


                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                         panes={panes}
                         menu={{secondary: true, pointing: true}}/>
                    <Card.Group itemsPerRow={5} style={{marginTop: 10}}>
                        {profileEvents.map(event => (
                            <Card key={event.id} as={Link} to={`/events/${event.id}`}>
                                <Image src={`/assets/categoryImages/${event.category}.jpg`}
                                       style={{minHeight: 100, objectFit: 'cover'}}/>
                                <Card.Content>
                                    <Card.Header content={event.title} textAlign={'center'}/>
                                    <Card.Meta textAlign={'center'}>
                                        <div>{format(event.date,'dd MMM yyyy')}</div>
                                        <div>{format(event.date,'hh:mm a')}</div>

                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}


                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default EventsTab;
