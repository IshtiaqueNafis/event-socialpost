import {sampleData} from "../../../app/api/sampleData";
import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT} from "./eventConstant";

const INITAL_STATE = {
    events: sampleData
}
export default function eventReducer(state = INITAL_STATE, {type, payload}) {
// {type,payload} --> is being destrcured from action
    switch (type) {
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
                events: [...state.events.filter(event => event.id !== payload.id), payload]
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