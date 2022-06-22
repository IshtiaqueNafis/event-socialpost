import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {registerUserAsync} from "../../redux/reducer/authSliceReducer";
import {closeModal} from "../../redux/reducer/modalSliceReducer";
import MyTextInput from "../../app/common/form/MyTextInput";
import {Button, Label} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";

const RegisterForm = () => {

    const dispatch = useDispatch()
    const {error} = useSelector(state => state.auth);
    return (
        <ModalWrapper size={'mini'} header={'Register In to Revnts'}>
            <Formik initialValues={{email: '', password: '', displayName: ''}}

                    validationSchema={Yup.object({
                        displayName: Yup.string().required(),
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}

                    onSubmit={async (values, {setSubmitting, setErrors}) => {


                        await dispatch(registerUserAsync({credentials: values}));
                        setSubmitting(false)
                        dispatch(closeModal());


                    }}

            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className={'ui form'}>
                        <MyTextInput name="displayName" placeholder={'enter display name '}/>
                        <MyTextInput name="email" placeholder={'Email Addresses'}/>
                        <MyTextInput name="password" placeholder={'password'} type={'password'}/>
                        {errors.auth && <Label basic color={'red'} style={{marginBottom: 10}}>{errors.auth}</Label>}
                        <Button
                            loading={isSubmitting} // sit will load when the form is being submitted.
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'teal'}
                            content={'register'}/>
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
};

export default RegisterForm;
