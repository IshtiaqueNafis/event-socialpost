import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

const EventListItem = () => {
    return (
        <Segment.Group>

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={'/assets/user.png'}/>
                        <Item.Content>
                            <Item.Header content="Event Title"/>
                            <Item.Description>
                                Hosted by bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
               <span>
                   <Icon name={'clock'}/>Date
                   <Icon name={'marker'}/>Venue

               </span>
            </Segment>

            <Segment secondary>
                <List horizontal>
                    <EventListAttendee/>
                    <EventListAttendee/>
                    <EventListAttendee/>
                </List>
            </Segment>

            <Segment clearing>
                {/*clearning means button and items wont go outside the boundarites*/}
                <span>Description of event </span>
                <Button color={'teal'} floated={'right'} content="view" ></Button>
            </Segment>


        </Segment.Group>
    );
};

export default EventListItem;
