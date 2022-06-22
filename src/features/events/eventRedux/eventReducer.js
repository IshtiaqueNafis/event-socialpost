import {CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT} from "./eventConstant";

const INITIAL_STATE = {
    events: []
}
export default function eventReducer(state = INITIAL_STATE, {type, payload}) {
// {type,payload} --> is being destrcured from action
    switch (type) {
        case FETCH_EVENTS:
            return {
                ...state,
                events: payload
                // array of what ever is inside

            }


        case CREATE_EVENT:
            return {
                ...state,
                events: [...state.events, payload]
                // events: [...state.events, payload] --> this makes the state immutable.
                //payload will be event
            }
        case UPDATE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(event => event.id !== payload.event.id), payload]
                //events: [...state.events.filter(event => event.id !== payload.id), payload]
                // ...state.events.filter(event => event.id !== payload.id) --> payload.id comes from event.ID
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(event => event.id !== payload)]
                // do a shallow copy and delete item
                // jsut going to be payload cause it willsend eventID
            }
        default:
            return state;
    }

}