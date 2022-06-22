import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function TestModal({data}) {
    return (
        <div>
            <ModalWrapper size={'mini'} header={'test modal'}>

                <div>The data is:{data}</div>

            </ModalWrapper>
        </div>
    );
}


