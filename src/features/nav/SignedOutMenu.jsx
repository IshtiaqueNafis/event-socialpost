import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {openModal} from "../../app/common/modals/redux/modalReducer";

const SignedOutMenu = ({setAuthenticated}) => {

    const dispatch = useDispatch();

    //region ** props explained***
    /*
    setAuthenticated(boolean) --> signs in sign out user
     */
    // endregion
    return (

        <Menu.Item position="right">
            <Button onClick={() => dispatch(openModal({modalType: 'LogInForm'}))} basic inverted content={'Login'}/>
            <Button basic inverted content={'Register'} style={{marginLeft: '0.5em'}}/>
        </Menu.Item>

    );
};

export default SignedOutMenu;
