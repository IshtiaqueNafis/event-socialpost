import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignInMenu from "./SignInMenu";

const NavBar = ({setFormOpen}) => {
    return (
        <Menu inverted fixed={'top'}>
            <Container>
                <Menu.Item as={NavLink} exact to={'/'} header>
                    {/*note as={NavLink} exact to={'/'} converts this MenuItem to NavLink*/}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
                    re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/events'} name='Events'/>
                <Menu.Item as={NavLink} to={'/createEvent'}>
                    <Button positive inverted content={'Create Event'}/>
                </Menu.Item>
                <SignedOutMenu/>
                <SignInMenu/>
            </Container>
        </Menu>
    );
};

export default NavBar;
