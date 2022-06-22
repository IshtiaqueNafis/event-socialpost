import React from 'react';
import {useSelector} from "react-redux";
import TestModal from "../../../features/sandBox/TestModal";
import LogInForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";

export default function ModalManager() {
    const modalLookup = {
        TestModal,
        LogInForm,
        RegisterForm


    };

    // pass what type of modal will be passed here. this will look up a modal.
    // will look up what kind of modal what to be opened.
    //region ***{TestModal}***

    /*
    this will be passed as as a function
    export default function TestModal({data}) {
    return (
        <div>
            <ModalWrapper size={'mini'} header={'test modal'}>

                <div>The data is:{data}</div>

            </ModalWrapper>
        </div>
    );
}
     */
    //endregion
    const currentModal = useSelector(state => state.modal) // getting the modal state from reducer.

    let renderedModal;

    if (currentModal) {

        //check if the currentModal is not null
        const {modalType, modalProps} = currentModal;

        const ModalComponent = modalLookup[modalType]; // will select the type of modal selected for the page
        renderedModal = <ModalComponent {...modalProps} /> // this bbecomes component based on ModelType.
    }

    return <span>{renderedModal}</span>

}


