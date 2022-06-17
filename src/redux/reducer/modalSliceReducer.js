import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modalSlice",
    initialState: null,

    reducers: {

        //region ***openModal,closeModal***
        openModal: (state, {payload}) => {
            const {modalType, modalProps} = payload
            state = {modalType, modalProps}
            return state


        },
        closeModal: (state) => {
            state = null
            return state;
        }
        //endregion
    }

})

export const {openModal, closeModal} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
