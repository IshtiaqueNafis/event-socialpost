import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {updateUserPassword} from "../../app/firestore/fireStoreService";

const AccountPage = () => {
    const {currentUser} = useSelector(state => state.auth);
    return (
        <Segment>
            <Header dividing size={'large'} content='Account'/>
            {currentUser.providerId === "password" && (
                <>
                    <Header color={'teal'} sub content={'Change password'}>
                        <p>Use this form to change password</p>
                        <Formik initialValues={{newPassword1: '', newPassword2: ''}} validationSchema={Yup.object({
                            newPassword1: Yup.string().required('Password is Required'),
                            newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Password do not match')
                        })} onSubmit={async (values, {setSubmitting, setErrors}) => {
                            try {
                                await updateUserPassword(values);

                            } catch (e) {
                                setErrors({auth: e.message});

                            } finally {
                                setSubmitting(false);
                            }
                        }}>

                            {({errors, isSubmitting, isValid, dirty}) => (
                                <Form className={'ui form'}>
                                    <MyTextInput name={'newPassword1'} type={'password'} placeholder={'New Password'}/>
                                    <MyTextInput name={'newPassword2'} type={'password'}
                                                 placeholder={'Confirm Password'}/>
                                    <Button style={{display: 'block'}} type={'submit'}
                                            disabled={!isValid || isSubmitting || !dirty} loading={isSubmitting}
                                            size={'large'}
                                            positive content={'Update password'}/>

                                </Form>
                            )}


                        </Formik>
                    </Header>
                </>)}
            {currentUser.providerId === "facebook" &&
            <>
                <Header color={'teal'} sub content={'Facebook Account'}/>
                <p>Please visit facebook yo update password</p>
                <Button icon={'facebook'} color={'facebook'} as={Link} to={"https://www.facebook.com"}
                        content={'Go to Facebook'}/>
            </>
            }
            {currentUser?.providerId === "google.com" &&
            <>
                <p>Please visit google to update password</p>
                <Button icon={'google'} color={'google plus'} as={Link} to={"https://www.google.ca"}
                        content={'Go to Google'}/>
            </>

            }
        </Segment>
    );
};

export default AccountPage;
