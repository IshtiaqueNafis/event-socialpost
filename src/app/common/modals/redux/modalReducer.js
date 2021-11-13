const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

//region ***actions***
//region ****openModal(payload) --> opens a modal***
export const openModal = payload => {
    return {
        type: OPEN_MODAL,
        payload
    };
};
//endregion

//region ***closeModal***
export const closeMedal = () => {
    return {
        type: CLOSE_MODAL,

    }

}
//endregion
//endregion

//region ***reducer***
const initialState = null;
export default function modalReducer(state = initialState, {type, payload}) {
    switch (type) {
        case OPEN_MODAL:
            const {modalType, modalProps} = payload;
            //modalType is the typeOf modal like is it going to be log in modal or any other type of modal
            // modalProps is for modalProps.
            return {modalType, modalProps};
            // then return the object.

        case CLOSE_MODAL:
            return null;

        default:
            return state
    }
}
//endregion
