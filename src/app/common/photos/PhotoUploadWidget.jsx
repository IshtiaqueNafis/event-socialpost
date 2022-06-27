import React, {useState} from 'react';
import {Button, Grid, Header} from "semantic-ui-react";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import cuid from "cuid";
import {getFileExtension} from "../utlis/util";
import {updateUserProfilePhoto, uploadToFirebaseStorage} from "../../firestore/fireStoreService";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {asyncAppLoaded} from "../../../redux/reducer/asyncSliceReducer";

const PhotoUploadWidget = ({setEditMode}) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function handleUploadImage() {

        setLoading(true);
        const fileName = `${cuid()}.${getFileExtension(files[0].name)}`;
        const upLoadTask = uploadToFirebaseStorage(image, fileName);
        upLoadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "%done");
        }, error => {
            toast.error(error.message)
        }, () => {
            upLoadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                updateUserProfilePhoto(downloadUrl, fileName).then(() => {
                    setLoading(false);
                    handleCancelCrop();
                    setEditMode(false);
                    dispatch(asyncAppLoaded());
                })
            }).catch(error => {
                toast.error(error.message)
                setLoading(false);

            });
        })
    }

    function handleCancelCrop() {
        setFiles([])
        setImage([])
    }


    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color={'teal'} sub content={'Step 1 - Add Photo'}/>
                <PhotoWidgetDropZone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header color={'teal'} sub content={'Step 2 - Resize'}/>
                {files.length > 0 &&
                <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview}/>}
            </Grid.Column>
            <Grid.Column width={4}>
                <Header color={'teal'} sub content={'Step 3 - Preview & Upload'}/>
                {files.length > 0 &&
                <>
                    <div className={'img-preview'} style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
                    <Button.Group>
                        <Button loading={loading} onClick={handleUploadImage} style={{width: 100}} positive
                                icon={'check'}/>
                        <Button disabled={loading} onClick={handleCancelCrop} style={{width: 100}} icon={'close'}/>
                    </Button.Group>
                </>}
            </Grid.Column>
        </Grid>
    );
};

export default PhotoUploadWidget;
