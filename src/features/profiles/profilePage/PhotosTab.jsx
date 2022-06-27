import React, {useState} from 'react';
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import {deletePhotoFromCollection, getUserPhotos, setMainPhoto} from "../../../app/firestore/fireStoreService";
import {useDispatch, useSelector} from "react-redux";
import {listenToUserPhotosAsync} from "../../../redux/reducer/profileSliceReducer";
import {toast} from "react-toastify";

const PhotosTab = ({profile, isCurrentUser}) => {
    const [editMode, setEditMode] = useState(true); // will let user edit form
    const dispatch = useDispatch();
    const {loading, photos} = useSelector(state => state.profile);
    const [updating, setUpdating] = useState({isUpdating: false, target: null});
    const [deleting, setDeleting] = useState({isDeleting: false, target: null});

    async function handleSetMainPhoto(photo, target) {
        setUpdating({isUpdating: true, target});
        try {
            await setMainPhoto(photo);
        } catch (e) {

            toast.error(e.message)
        } finally {

            setUpdating({target: null, isUpdating: false})
        }
    }

    async function handleDeletePhoto(photo, target) {
        setDeleting({isDeleting: true, target})
        try {
            await deletePhotoFromCollection(photo.id);
            await deletePhotoFromCollection(photo.id);
        } catch (e) {

            toast.error(e.message)
        } finally {

            setDeleting({target: null, isDeleting: false})
        }
    }

    useFireStoreCollection({
        query: () => getUserPhotos(profile.id),
        data: (photos) => dispatch(listenToUserPhotosAsync({photos})),
        deps: [dispatch, profile.id]
    })


    return (
        <Tab.Pane loading={loading === "pending"}>


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
                    {editMode ? <PhotoUploadWidget setEditMode={setEditMode}/> : <>
                        <Card.Group itemsPerRow={5}>
                            {photos.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    <Button.Group fluid widths={2}>
                                        <Button loading={updating.isUpdating && updating.target === photo.id}
                                                onClick={(e) => handleSetMainPhoto(photo, e.target.name)} basic
                                                color={'green'}
                                                disabled={photo.url === profile.photoURL}
                                                content={'Main'}/>
                                        <Button basic color={'red'}
                                                loading={deleting.isDeleting && deleting.target === photo.id}
                                                onClick={(e) => handleDeletePhoto(photo, e.target.name)} icon={'trash'}
                                                disabled={photo.url === profile.photoURL}

                                        />

                                    </Button.Group>
                                </Card>
                            ))}

                        </Card.Group>
                    </>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default PhotosTab;
