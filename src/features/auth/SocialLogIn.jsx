import React from 'react';
import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../redux/reducer/modalSliceReducer";
import {socialLogin} from "../../app/firestore/fireStoreService";

const SocialLogIn = () => {
    const dispatch = useDispatch()

    const handleSocialLogin = async provider => {
        dispatch(closeModal());
        await socialLogin(provider);
    };

    return (
        <>

            <Button onClick={() => handleSocialLogin('facebook')} icon={'facebook'} fluid color={'facebook'}
                    style={{marginBottom: 10}} content={'Log in with Facebook'}/>
            <Button onClick={() => handleSocialLogin('google')} icon={'google'} fluid color={'google plus'}
                    style={{marginBottom: 10}}
                    content={'Log in with Google'}/>
        </>
    );
};

export default SocialLogIn;
