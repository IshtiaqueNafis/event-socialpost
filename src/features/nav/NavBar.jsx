import React, {useState} from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {NavLink, useHistory} from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignInMenu from "./SignInMenu";

const NavBar = ({setFormOpen}) => {

    //region ***states***
    const history = useHistory(); // this lets the componenet to have history as Navbar does not have router component.
    const [authenticated, setAuthenticated] = useState(false);
    //endregion

    //region functions -->

    //region ***handleSignOut()***
    const handleSignOut = () => {
        setAuthenticated(false);
        history.push('/'); // push the user to home menu
    }
    //endregion

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
                {authenticated &&
                <Menu.Item as={NavLink} to={'/createEvent'}>
                    <Button positive inverted content={'Create Event'}/>
                </Menu.Item>}
                {authenticated ? <SignInMenu signOut={handleSignOut}/> :
                    <SignedOutMenu setAuthenticated={setAuthenticated}/>}


            </Container>
        </Menu>
    );
};

export default NavBar;
