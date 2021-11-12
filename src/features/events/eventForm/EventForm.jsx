import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MyTextInput from "../../../app/common/form/MyTextInput";
import {createEvent, updateEvent} from "../eventRedux/eventActions";
import cuid from "cuid";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import {categoryData} from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";


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

    //region ***ValidationSchema --> Yup object to validate forms***
    const validationSchema = Yup.object({

        title: Yup.string().required('You Must provide a title'),// this means required and and a string is required.
        category: Yup.string().required('You Must provide a Category'),// this means required and a string isand a string is required.
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()

    })
    //endregion


    return (
        <Segment clearing>

            <Formik initialValues={initialValues} // this is the value for inital items for the forms
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        //values is part of formikValue
                        selectedEvent ? // cehcks if selected event is a not null
                            dispatch(updateEvent({...selectedEvent, ...values})) // if it is not null then update it
                            :
                            dispatch(createEvent( //else dispatch to create event.
                                {
                                    ...values, id: cuid(),
                                    hostedBy: 'Bob',
                                    attendees: [],
                                    hostPhotoURL: '/assets/user.png'
                                }));


                        history.push('/events')
                    }
                    }>


                <Form className={'ui form'}>
                    <Header sub color={'teal'} content={'Event Details'}/>
                    <MyTextInput name="title" placeholder="Event title"/>
                    <MySelectInput name="category" placeholder="Event Category" options={categoryData}/>
                    <MyTextArea name="description" placeholder="Description" rows={3}/>
                    <Header sub color={'teal'} content={'Event Location Details'}/>
                    <MyTextInput name="city" placeholder="City"/>
                    <MyTextInput name="venue" placeholder="Venue"/>

                    <MyDateInput name="date"
                                 placeholderText="Date"
                                 timeFormat={'HH:mm'} // HH and MM
                                 showTimeSelect // means show time select
                                 timeCaption={'time'} // show caption
                                 dateFormat={'MMMM d,yyyy,h:mm a'} // dateFormat shows date informatted settings.
                    />


                    <Button type="submit" floated={'right'} positive content={'Submit'}/>
                    <Button as={Link} to={'/events'} type="submit" floated={'right'} content={'Cancel'}/>
                </Form>

            </Formik>
        </Segment>
    );
};

export default EventForm;
