import React from 'react';
import {useDispatch} from "react-redux";
import {Modal} from "semantic-ui-react";
import {closeMedal} from "./redux/modalReducer";

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
            onClose={() => dispatch(closeMedal())}
            size={size}>
            {header && <Modal.Header>{header}</Modal.Header>}
            <Modal.Content>
                {children}
                {/*    childern is considered opening and closing tags. */}
            </Modal.Content>
        </Modal>
    );
}


