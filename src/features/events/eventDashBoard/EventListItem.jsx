import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

const EventListItem = ({
                           event: {description, attendees, date, hostPhotoURL, hostedBy, title, venue},
                           selectEvent
                       }) => {
    //region *** event: {description, attendees, date, hostPhotoURL, hostedBy, title, venue},
    //                            selectEvent}
    /*event: {description, attendees, date, hostPhotoURL, hostedBy, title, venue} --> is the event object
    selectEvent} --> will select the event

     */

    //endregion
    return (
        <Segment.Group>

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={hostPhotoURL}/>
                        <Item.Content>
                            <Item.Header content={title}/>
                            <Item.Description>
                                Hosted by {hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
               <span>
                   <Icon name={'clock'}/>{date}
                   <Icon name={'marker'}/>{venue}

               </span>
            </Segment>

            <Segment secondary>
                <List horizontal>
                    {attendees.map(attendee => (
                        <EventListAttendee key={attendee.id} attendee={attendee}/>

                    ))}

                </List>
            </Segment>

            <Segment clearing>
                {/*clearning means button and items wont go outside the boundarites*/}
                <div> {description}</div>
                <Button
                    onClick={() => selectEvent({description, attendees, date, hostPhotoURL, hostedBy, title, venue})}
                    color={'teal'} floated={'right'} content="view"></Button>
            </Segment>


        </Segment.Group>
    );
};

export default EventListItem;
