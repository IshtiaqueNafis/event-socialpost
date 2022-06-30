import React from 'react';
import {Field, Form, Formik} from 'formik'
import {addEventChatComments} from "../../../app/firestore/ChatFirebaseService";
import {toast} from "react-toastify";
import {Loader} from "semantic-ui-react";
import * as Yup from 'yup';

const EventDetailedChatForm = ({eventId, parentId, closeForm}) => {


    return (
        <Formik initialValues={{comment: ''}} validationSchema={Yup.object({
            comment: Yup.string().required()
        })} onSubmit={async (values, {setSubmitting, resetForm}) => {
            try {
                await addEventChatComments(eventId, {...values, parentId})
                resetForm();
            } catch (e) {
                toast.error(e.message)
            } finally {
                setSubmitting(false);
                closeForm({open: false, commentId: null});
            }
        }}>
            {({isSubmitting, handleSubmit, isValid}) => (
                <Form className={'ui form'}>
                    <Field name={'comment'}>
                        {({field}) => (
                            <div style={{position: 'relative'}}>
                                <Loader active={isSubmitting}/>
                                <textarea {...field} rows="2"
                                          placeholder={'Enter your comment (Enter to submit Shift + Enter for new line'}
                                          onKeyPress={e => {
                                              if (e.key === "Enter" && e.shiftKey) {
                                                  return;
                                              }
                                              if (e.key === "Enter" && !e.shiftKey) {
                                                  e.preventDefault();

                                                  isValid && handleSubmit()
                                              }
                                          }}/>


                            </div>
                        )}
                    </Field>
                </Form>
            )}

        </Formik>
    );
};

export default EventDetailedChatForm;
