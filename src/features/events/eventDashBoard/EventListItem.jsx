import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

const EventListItem = ({event, selectEvent, deleteEvent}) => {
    //region *** event,selectEvent}
    /*event: {description, attendees, date, hostPhotoURL, hostedBy, title, venue} --> is the event object
    selectEvent} --> will select the event is amethod

     */

    //endregion
    return (
        <Segment.Group>

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={event.hostPhotoURL}/>
                        <Item.Content>
                            <Item.Header content={event.title}/>
                            <Item.Description>
                                Hosted by {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
               <span>
                   <Icon name={'clock'}/>{event.date}
                   <Icon name={'marker'}/>{event.venue}

               </span>
            </Segment>

            <Segment secondary>
                <List horizontal>
                    {event.attendees.map(attendee => (
                        <EventListAttendee key={attendee.id} attendee={attendee}/>

                    ))}

                </List>
            </Segment>

            <Segment clearing>
                {/*clearning means button and items wont go outside the boundarites*/}
                <div> {event.description}</div>
                <Button
                    onClick={() => selectEvent(event)}
                    color={'teal'} floated={'right'} content="view"/>
                <Button
                    onClick={() => deleteEvent(event.id)}
                    color={'red'} floated={'right'} content={'Delete'}
                />
            </Segment>


        </Segment.Group>
    );
};

export default EventListItem;
