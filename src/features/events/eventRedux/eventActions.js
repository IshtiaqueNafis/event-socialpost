import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT} from "./eventConstant";

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




