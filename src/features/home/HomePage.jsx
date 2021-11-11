import React from 'react';
import {Button, Container, Header, Icon, Image, Segment} from "semantic-ui-react";

const HomePage = ({history}) => {
    //region ***history***
    /*
    history {}--> <Route exact path={'/'} homepage gives acces to history object
     */
    //endregion

    return (
        <div>
            <Segment inverted textAlign="center" vertical className="masthead">
                <Container>
                    <Header as={'h1'} inverted>
                        <Image size={"massive"} src={'/assets/logo.png'} style={{marginBottom: 12}}></Image>
                        Revents
                    </Header>
                    <Button onClick={() =>history.push('/events')}size={'huge'} inverted>
                        Get Started
                        <Icon name="right arrow" inverted></Icon>
                    </Button>
                </Container>

            </Segment>
        </div>
    );
};

export default HomePage;