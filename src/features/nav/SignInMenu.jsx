import React from 'react';
import {Dropdown, Image, Menu} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {signOutUser} from "../../redux/reducer/authSliceReducer";

const SignInMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUserProfile} = useSelector(state => state.profile);



    return (

        <Menu.Item position="right">
            <Image avatar spaced={'right'} src={currentUserProfile?.photoURL || '/assets/user.png'}/>
            <Dropdown pointing={'top left'} text={currentUserProfile?.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'/createEvent'} text="Create Event" icon={'plus'}/>
                    <Dropdown.Item text="My Profile" icon={'user'} as={Link} to={`profile/${currentUserProfile?.id}`}/>
                    <Dropdown.Item text="Account" icon={'user'} as={Link} to={'/account'}/>
                    <Dropdown.Item onClick={async () => {
                        await dispatch(signOutUser())
                        history.push('/events');
                    }} text="Sign Out" icon={'power'}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>

    );
};

export default SignInMenu;
