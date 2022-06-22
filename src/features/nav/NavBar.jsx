import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignInMenu from "./SignInMenu";
import {useSelector} from "react-redux";

const NavBar = () => {

    //region ***states***
    // this lets the componenet to have history as Navbar does not have router component.

    const {authenticated} = useSelector(state => state.auth);
    //geeting the autheticated object from the reducer.
    //endregion


    return (
        <Menu inverted fixed={'top'}>
            <Container>
                <Menu.Item as={NavLink} exact to={'/'} header>
                    {/*note as={NavLink} exact to={'/'} converts this MenuItem to NavLink*/}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
                    re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/events'} name='Events'/>
                <Menu.Item as={NavLink} to={'/sandBox'} name='Sandbox'/>
                {authenticated &&
                <Menu.Item as={NavLink} to={'/createEvent'}>
                    <Button positive inverted content={'Create Event'}/>
                </Menu.Item>}
                {authenticated ? <SignInMenu/> :
                    <SignedOutMenu/>}


            </Container>
        </Menu>
    );
};

export default NavBar;
