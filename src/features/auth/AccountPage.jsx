import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import {Link} from "react-router-dom";

const AccountPage = () => {
    return (
        <Segment>
            <Header dividing size={'large'} content='Account'/>
            <div>
                <Header color={'teal'} sub content={'Change password'}>
                    <p>Use this form to change password</p>
                    <Formik initialValues={{newPassword1: '', newPassword2: ''}} validationSchema={Yup.object({
                        newPassword1: Yup.string().required('Password is Required'),
                        newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Password do not match')
                    })} onSubmit={(values) => {
                        console.log({values});
                    }}>

                        {({errors, isSubmitting, isValid, dirty}) => (
                            <Form className={'ui form'}>
                                <MyTextInput name={'newPassword1'} type={'password'} placeholder={'New Password'}/>
                                <MyTextInput name={'newPassword2'} type={'password'} placeholder={'Confirm Password'}/>
                                <Button type={'submit'} disabled={!isValid || isSubmitting || !dirty} size={'large'}
                                        positive content={'Update password'}/>

                            </Form>
                        )}


                    </Formik>
                </Header>
            </div>
            <div>
                <Header color={'teal'} sub content={'Facebook Account'}/>
                <p>Please visit facebook yo update password</p>
                <Button icon={'facebook'} color={'facebook'} as={Link} to={"https://www.facebook.com"} content={'Go to Facebook'}/>
                <p>Please visit google to update password</p>
                <Button icon={'google'} color={'google plus'} as={Link} to={"https://www.google.ca"} content={'Go to Google'}/>

            </div>

        </Segment>
    );
};

export default AccountPage;
