import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup'
import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeMedal} from "../../app/common/modals/redux/modalReducer";
import {signInUser} from "./redux/authActions";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

const LogInForm = () => {

    const dispatch = useDispatch();


    return (
        <ModalWrapper size={'mini'} header={'Sign In to Reverts'}>
            <Formik initialValues={{email: '', password: '',}}

                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}

                    onSubmit={(values,{setSubmitting}) => {
                        //setSub,itting comes from Forms.
                        dispatch(signInUser(values));
                        // setSubmitting(false);//means done submitting
                        dispatch(closeMedal());
                    }}

            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className={'ui form'}>
                        <MyTextInput name="email" placeholder={'Email Addresses'}/>
                        <MyTextInput name="password" placeholder={'password'} type={'password'}/>
                        <Button
                            loading={isSubmitting} // sit will load when the form is being submitted.
                            disabled={!isValid || !dirty || isSubmitting}
                            type={'submit'}
                            fluid
                            size={'large'}
                            color={'teal'}
                            content={'Login'}/>
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LogInForm;
