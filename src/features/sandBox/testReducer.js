import {AsyncActionError, AsyncActionFinish, AsyncActionStart} from "../../app/async/asyncReducer";
import {delay} from "../../app/common/utlis/util";

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function increment(amount) {
    return async function (dispatch) { // dipsatch comes from the store.
        dispatch(AsyncActionStart()) //start the operation
        try {
            await delay(1000); // checks the delay
            dispatch({type: INCREMENT_COUNTER, payload: amount}) //dispatches the action for increaseing fpr this
            dispatch(AsyncActionFinish()); // dispatch asyncActionFinish
        } catch (error) {
            dispatch(AsyncActionError(error)); // if there is any error catches the error.
        }


    }

}

export function decrement(amount) {
    return async function (dispatch) {
        dispatch(AsyncActionStart());
        try {
            await delay(1000);
            dispatch({type: DECREMENT_COUNTER, payload: amount})
            dispatch(AsyncActionFinish());

        } catch (error) {
            dispatch(AsyncActionError(error))
        }


    }

}

const initialState = {
    data: 42
}
export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload

            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state;
    }


}