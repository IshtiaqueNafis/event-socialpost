import React, {useState} from 'react';
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";

const PhotosTab = ({profile, isCurrentUser}) => {
    const [editMode, setEditMode] = useState(false); // will let user edit form

    return (
        <Tab.Pane>

            <Grid>
                <Grid.Column width={16}>
                    <Header floated={'left'} icon={'user'} content={`Photos`}/>
                    {isCurrentUser &&
                    <Button onClick={() => setEditMode(!editMode)} floated={'right'} basic
                            content={editMode ? 'Cancel' : 'Add a Photo'}>

                    </Button>
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? <p>photo widget will go here</p> : <>
                        <Card.Group itemsPerRow={5}>
                            <Image src={'assets/user.png'}/>
                            <Button.Group fluid widths={2}>
                                <Button basic color={'green'} content={'Main'}/>
                                <Button basic color={'green'} icon={'trash'}/>
                            </Button.Group>
                        </Card.Group>
                    </>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default PhotosTab;
