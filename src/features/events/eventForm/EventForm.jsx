import React, {useState} from 'react';
import {Button, FormField, Header, Segment} from "semantic-ui-react";
import cuid from "cuid";
import {Field, Form, Formik} from 'formik';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createEvent, updateEvent} from "../eventRedux/eventActions";

const EventForm = ({match, history}) => {


    //region ***initialValues,Dispatch,selector***
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id)); // geeting the event Id
    const dispatch = useDispatch();
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

    //region methods ***handleFormSubmihandleChange***

    //region handleFormSubmit() --> submits the form
    const handleFormSubmit = () => {
        selectedEvent ? // cehcks if selected event is a prop
            dispatch(updateEvent({...selectedEvent, ...values}))

            : // ({...selectedEvent, ...values}) --> ...selectedEvent will not be lost original then pass the ...values means it will be updated
            dispatch(createEvent({
                ...values, id: cuid(),
                hostedBy: 'Bob',
                attendees: [],
                hostPhotoURL: '/assets/user.png'
            }))
        //region {...values, id: cuid(), hostedBy: 'Bob', attendees: []}
        /*
        {..values} --> means ...values will be broken down
        id:cuid() --> means will get the id for this
        hostedBy : as for now its empty
        attendees:[] this is an empty array means no one is attending here.
         */
        //endregion
        history.push('/events')


    }
    //endregion

    //reghandleChange==> sets what input change for the file
    const chandleChange = (e) => {
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
            <Formik initialValues={initialValues} // this is the value for inital items for the forms
                    onSubmit={values => console.log(values)}>
                <Form className={'ui form'}>
                    <FormField>
                        <Field name={'title'}
                               placeholder={'Enter Title'}/>
                    </FormField>
                    <FormField>
                        <Field name={'category'}
                               placeholder={'Category'}/>
                    </FormField>

                    <FormField>
                        <Field name={'description'}
                               placeholder={'Description'}/>
                    </FormField>

                    <FormField>
                        <Field name={'city'}
                               placeholder={'City'}/>
                    </FormField>

                    <FormField>
                        <Field name={'venue'}
                               placeholder={'Venue'}/>
                    </FormField>

                    <FormField>
                        <Field name={'date'}
                               placeholder={'Enter Date'}
                               type="date"
                        />
                    </FormField>


                    <Button type="submit" floated={'right'} onClick={handleFormSubmit} positive content={'Submit'}/>
                    <Button as={Link} to={'/events'} type="submit" floated={'right'} content={'Cancel'}/>
                </Form>

            </Formik>
        </Segment>
    );
};

export default EventForm;
