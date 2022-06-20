import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {openModal} from "../../redux/reducer/modalSliceReducer";


const SignedOutMenu = () => {

    const dispatch = useDispatch();

    //region ** props explained***
    /*
    setAuthenticated(boolean) --> signs in sign out user
     */
    // endregion
    return (

        <Menu.Item position="right">
            <Button onClick={() => dispatch(openModal({modalType: 'LogInForm'}))} basic inverted content={'Login'}/>
            <Button onClick={() => dispatch(openModal({modalType: 'RegisterForm'}))} basic inverted content={'Register'}
                    style={{marginLeft: '0.5em'}}
            />

        </Menu.Item>

    );
};

export default SignedOutMenu;
