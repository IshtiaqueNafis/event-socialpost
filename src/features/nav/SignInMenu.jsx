import React from 'react';
import {Dropdown, Image, Menu} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SignOutUser} from "../auth/redux/authActions";

const SignInMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(state => state.auth);

    return (

        <Menu.Item position="right">
            <Image avatar spaced={'right'} src={currentUser.photoURL || '/assets/user.png'}></Image>
            <Dropdown pointing={'top left'} text={currentUser.email}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'/createEvent'} text="Create Event" icon={'plus'}/>
                    <Dropdown.Item text="My Profile" icon={'user'}/>
                    <Dropdown.Item onClick={() => {
                        dispatch(SignOutUser())
                        history.push('/');
                    }} text="Sign Out" icon={'power'}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>

    );
};

export default SignInMenu;
