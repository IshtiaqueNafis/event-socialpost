import React, {useState} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import cuid from "cuid";
import {Link} from "react-router-dom";

const EventForm = ({setFormOpen, createEvent, selectedEvent, updateEvent}) => {
//region ***{setFormOpen, setEvents, createEvent, selectedEvents}***
    /*
    setFormOpen(boolean) -->  manipulate form state for form to be closed or open by using true or false.
    createEvent(event) --> creates a new event
    selectedEvent (event)--> select a single event
    updateEvent(event) --> updates the event.
     */
    //endregion

    //region ***initialValues***
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
    }
    //selectedEvents ?? --> means if selected event is not null pick the Selected Events if not use the selected event.
    //endregion

    //region ***state***
    const [values, setValues] = useState(initialValues); // means this will be the inital values.
    //endregion

    //region methods ***handleFormSubmit(), handleInputChange(e)***

    //region handleFormSubmit() --> submits the form
    const handleFormSubmit = () => {
        selectedEvent ? // cehcks if selected event is a prop
            updateEvent({...selectedEvent, ...values}) : // ({...selectedEvent, ...values}) --> ...selectedEvent will not be lost original then pass the ...values means it will be updated
            createEvent({
                ...values, id: cuid(),
                hostedBy: 'Bob',
                attendees: [],
                hostPhotoURL: '/assets/user.png'
            })
        //region {...values, id: cuid(), hostedBy: 'Bob', attendees: []}
        /*
        {..values} --> means ...values will be broken down
        id:cuid() --> means will get the id for this
        hostedBy : as for now its empty
        attendees:[] this is an empty array means no one is attending here.
         */
        //endregion
        setFormOpen(false);

    }
    //endregion

    //region  handleInputChange(e)==> sets what input change for the file
    const handleInputChange = (e) => {
        const {name, value} = e.target
        //name and value are being destructed here from event
        setValues({...values, [name]: value})
        //region ***setValues({...values, [name]: value})***
        // ... values --> means copy all the value s
        // [name]:value means set the value [name] lets it be dynamic
        //endregion

    }
    //endregion

//endregion

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'Create new Event'}/>
            <Form>

                <Form.Field>
                    <input type="text"
                           placeholder="Event title"
                           name={'title'}
                           value={values.title}
                           onChange={(e) => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input
                        type="text"
                        placeholder="Category"
                        name={'category'}
                        value={values.category}
                        onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input
                        type="text"
                        placeholder="Description"
                        name={'description'}
                        value={values.description}
                        onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="text"
                           placeholder="City"
                           name={'city'}
                           value={values.city}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="text"
                           placeholder="Venue"
                           name={'venue'}
                           value={values.venue}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>

                <Form.Field>
                    <input type="date"
                           placeholder="Date"
                           name={'date'}
                           value={values.date}
                           onChange={e => handleInputChange(e)}/>
                </Form.Field>
                <Button type="submit" floated={'right'} onClick={handleFormSubmit} positive content={'Submit'}/>
                <Button as={Link} to={'/events'} type="submit" floated={'right'} content={'Cancel'}/>
            </Form>
        </Segment>
    );
};

export default EventForm;
