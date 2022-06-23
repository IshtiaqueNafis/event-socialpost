import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup'
import {Button, Divider, Label} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";


import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {signInUser} from "../../redux/reducer/authSliceReducer";
import SocialLogIn from "./SocialLogIn";

const LogInForm = () => {

    const dispatch = useDispatch();

    const {error} = useSelector(state => state.auth);
    return (
        <ModalWrapper size={'mini'} header={'Sign In to Reverts'}>
            <Formik initialValues={{email: '', password: '',}}

                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}

                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        try {
                            await dispatch(signInUser({credentials: values}));
                            setSubmitting(false)
                        } catch (e) {

                            if (error) {
                                setErrors({auth: error})
                            }
                            setSubmitting(false)


                        }

                    }}

            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className={'ui form'}>
                        <MyTextInput name="email" placeholder={'Email Addresses'}/>
                        <MyTextInput name="password" placeholder={'password'} type={'password'}/>
                        {error && <Label basic color={'red'} style={{marginBottom: 10}} content={error?.message}/>}
                        <Button
                            loading={isSubmitting} // sit will load when the form is being submitted.
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'teal'}
                            content={'Login'}/>
                        <Divider horizontal>Or</Divider>
                        <SocialLogIn/>
                    </Form>

                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LogInForm;
