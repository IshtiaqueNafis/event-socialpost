import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modalSlice",
    initialState: {modalType: null, modalProps: null},
    reducers: {

        //region ***openModal,closeModal***
        openModal: (state, {payload}) => {
            state.modalProps = payload.modalProps;
            state.modalType = payload.modalType;
        },
        closeModal: (state) => {
            state.modalProps = null;
            state.modalType = null;
        }
        //endregion
    }

})

export const {openModal, closeModal} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
