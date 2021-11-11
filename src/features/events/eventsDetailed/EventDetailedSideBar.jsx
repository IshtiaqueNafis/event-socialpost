import React from 'react';
import {Item, Segment} from "semantic-ui-react";

const EventDetailedSideBar = ({attendes}) => {
    return (
        <>
            <Segment
                textAlign="center"
                style={{border: 'none'}}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendes.length}   {attendes.length>1?'People':'Person '}   Going
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {attendes.map((attendee=>(
                        <Item key={attendee.id} style={{position: 'relative'}}>
                            <Item.Image size="tiny" src={attendee.photoURL || '/assets/user.png'}/>
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <span>{attendee.displayName}</span>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    )))}
                </Item.Group>
            </Segment>
        </>
    );
};

export default EventDetailedSideBar;
