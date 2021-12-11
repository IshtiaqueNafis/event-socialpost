import {CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT} from "./eventConstant";
import {AsyncActionError, AsyncActionFinish, AsyncActionStart} from "../../../app/async/asyncReducer";
import {fetchSampleData} from "../../../app/api/mockAPi";

//region loadEvents () loads sample data
export const loadEvents = () => {
    return async function (dispatch) {
        dispatch(AsyncActionStart())
        try {
            const events = await fetchSampleData() // getting the sample data from fetch.
            dispatch({type: FETCH_EVENTS, payload: events})
            dispatch(AsyncActionFinish())


        } catch (error) {
            dispatch(AsyncActionError(error
            ))
        }
    }
}
//endregion

//region ***CreateEvent(event)*** --> Creates an Event
export const createEvent = event => {
    return {
        type: CREATE_EVENT,
        payload: event

    };
};
//endregion

//region ***UpdateEVENT(event)*** --> update an event
export const updateEvent = event => {
    return {
        type: UPDATE_EVENT,
        payload: event

    };
};
//endregion

//region ***deleteEvent(eventId)*** ---> delete an event
export const deleteEvent = eventId => {
    return {
        type: DELETE_EVENT,
        payload: eventId

    };
};
//endregion




