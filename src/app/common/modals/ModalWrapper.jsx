import React from 'react';
import {useDispatch} from "react-redux";
import {Modal} from "semantic-ui-react";
import {closeModal} from "../../../redux/reducer/modalSliceReducer";


export default function ModalWrapper({children, size, header}) {
    //region ***{children, size, header}***
    /*
    children, size, header
    childern --> will show the childern property.
    size--> will select the size of the modal
    header --> will select the header of the page like title
     */
    //endregion
    const dispatch = useDispatch();
    return (
        <Modal
            open={true}
            onClose={() => dispatch(closeModal())}
            size={size}>
            {header && <Modal.Header>{header}</Modal.Header>}
            <Modal.Content>
                {children}

            </Modal.Content>
        </Modal>
    );
}


