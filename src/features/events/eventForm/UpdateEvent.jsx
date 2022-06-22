/* global google  */
// this means global is google part of index.html
import React, {useEffect, useState} from 'react';
import {Button, Confirm, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import {categoryData} from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import {eventSelectors, getEventDetailsAsync, updateEventAsync} from "../../../redux/reducer/eventSliceReducer";
import LoadingComponent from "../../../layout/LoadingComponent";
import {toast} from "react-toastify";


const UpdateEvent = ({match, history}) => {


    //region ***initialValues,Dispatch,selector***
    // const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id)); // geeting the event Id
    const selectedEvent = useSelector(state => eventSelectors.selectById(state, match.params.id));
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const {status, error} = useSelector(state => state.events);
    const initialValues = selectedEvent


    //region ***ValidationSchema --> Yup object to validate forms***
    const validationSchema = Yup.object({

        title: Yup.string().required('You Must provide a title'),// this means required and and a string is required.
        category: Yup.string().required('You Must provide a Category'),// this means required and a string isand a string is required.
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required('city is required')
        }),

        venue: Yup.object().shape({
            address: Yup.string().required('Venue is required')
        }),
        date: Yup.string().required()

    })

    //endregion
    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);

        try {
            dispatch(updateEventAsync({
                event,
                isCancelled: event.isCancelled !== undefined
            }))
            setLoadingCancel(false);
        } catch (e) {
            setLoadingCancel(false);
            toast.error(e.message);
        }
    }

    useEffect(() => {
        if (!selectedEvent) dispatch(getEventDetailsAsync({id: match.params.id}))
    }, [match.params.id, dispatch, selectedEvent])

    if (status === 'pending' || (!selectedEvent && !error)) return <LoadingComponent message={'Loading Event'}/>

    if (!selectedEvent) return <Redirect to={'/error'}/>


    return (
        <Segment clearing>

            <Formik initialValues={initialValues} // this is the value for inital items for the forms
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        //values is part of formikValue


                        dispatch(updateEventAsync({event: values, isCancelled: undefined})) // if it is not null then update it


                        history.push('/events')
                    }
                    }
            >

                {({isSubmitting, dirty, isValid, values}) => (
                    <Form className={'ui form'}>
                        <Header sub color={'teal'} content={'Event Details'}/>
                        <MyTextInput name="title" placeholder="Event title"/>
                        <MySelectInput name="category" placeholder="Event Category" options={categoryData}/>
                        <MyTextArea name="description" placeholder="Description" rows={3}/>
                        <Header sub color={'teal'} content={'Event Location Details'}/>
                        <MyPlaceInput name="city" placeholder="City"/>
                        <MyPlaceInput
                            name="venue"
                            placeholder="Venue"
                            disabled={!values.city.latLng}
                            options={
                                {
                                    location: new google.maps.LatLng(values.city.latLng),
                                    radius: 1000,
                                    types: ['establishment']
                                }
                            }


                        />

                        <MyDateInput name="date"
                                     placeholderText="Date"
                                     timeFormat={'HH:mm'} // HH and MM
                                     showTimeSelect // means show time select
                                     timeCaption={'time'} // show caption
                                     dateFormat={'MMMM d,yyyy,h:mm a'} // dateFormat shows date informatted settings.
                        />

                        <Button
                            type="button"
                            loading={loadingCancel}
                            floated={'left'}
                            color={selectedEvent.isCancelled ? 'green' : 'red'}
                            content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel Event'}
                            onClick={() => setConfirmOpen(true)}


                        />
                        <Button loading={isSubmitting} // this will load the screen
                                disabled={!isValid || !dirty || isSubmitting}
                            // region ***{!isValid || !dirty || isSubmitting} ***
                            /*
                            !isValid --> means fields are empty
                            !dirty values are  deeply equal from initial values
                            isSubmitting means submission is in progress.
                             */

                            //endregion

                                type="submit" floated={'right'} positive content={'Submit'}/>
                        <Button
                            as={Link}
                            to={'/events'}
                            type="submit"
                            floated={'right'}
                            content={'Cancel'}
                            disabled={isSubmitting}

                        />
                    </Form>

                )}

            </Formik>
            <Confirm
                content={selectedEvent?.isCancelled  ? 'This will activate the event - are you sure ' : 'this will deactivate the event - are you sure '}
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    );
};

export default UpdateEvent;
