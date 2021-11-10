import React from 'react';
import {Dropdown, Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

const SignInMenu = ({setAuthenticated}) => {
    return (

        <Menu.Item position="right">
            <Image avatar spaced={'right'} src={'/assets/user.png'}></Image>
            <Dropdown pointing={'top left'} text="BoB">
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'/createEvent'} text="Create Event" icon={'plus'}/>
                    <Dropdown.Item text="My Profile" icon={'user'}/>
                    <Dropdown.Item onClick={() => setAuthenticated(false)} text="Sign Out" icon={'power'}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>

    );
};

export default SignInMenu;
