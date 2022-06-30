import React from 'react';
import {Button, Icon, Item, Label, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {format} from "date-fns";
import {deleteEventAsync} from "../../../redux/reducer/eventSliceReducer";

const EventListItem = ({event}) => {
    //region *** event,selectEvent}
    /*event: {description, attendees, date, hostPhotoURL, hostedBy, title, venue} --> is the event object

     */

    //endregion
    const dispatch = useDispatch();


    return (
        <Segment.Group>

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={event.hostPhotoURL}/>
                        <Item.Content>
                            <Item.Header content={event.title}/>
                            <Item.Description>
                                Hosted by <Link to={`profile/${event.hostUid}`}>{event.hostedBy}</Link>

                            </Item.Description>
                            {event.isCancelled && (
                                <Label
                                    style={{top: '-40px'}}
                                    ribbon={"right"}
                                    color={'red'}
                                    content={'this event is cancelled'}
                                />
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
               <span>
                   <Icon name={'clock'}/> {format(event.date, 'MMMM d, yyyy h:mm a')}
                   <Icon name={'marker'}/>{event.venue.address}

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
                    as={Link} to={`/events/${event.id}`}
                    color={'teal'} floated={'right'} content="view"/>
                <Button
                    onClick={() => dispatch(deleteEventAsync({id: event.id}))}
                    color={'red'} floated={'right'} content={'Delete'}
                />
            </Segment>


        </Segment.Group>
    );
};

export default EventListItem;
