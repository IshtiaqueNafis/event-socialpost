import React, {useCallback} from 'react';

import {useDropzone} from "react-dropzone";
import {Header, Icon} from "semantic-ui-react";

const PhotoWidgetDropZone = ({setFiles}) => {
    const dropzoneStyles = {
        border: 'dashed 3px #eee',
        borderRadius: '5%',
        paddingTop: '30px',
        textAlign: 'center'
    };

    const dropzoneActive = {
        border: 'dashed 3px green',

    }


    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file=>Object.assign(file,{
            preview: URL.createObjectURL(file) // create a string object from the property
        })))
        // Do something with the files
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={isDragActive?{...dropzoneStyles,...dropzoneActive}:{...dropzoneActive}}>
            <input {...getInputProps()} />
           <Icon name={'upload'} size={'huge'}/>
            <Header content={'Drop image here'}/>
        </div>
    );
};

export default PhotoWidgetDropZone;
