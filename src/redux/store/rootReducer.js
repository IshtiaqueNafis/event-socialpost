import {combineReducers} from "redux";
import testReducer from "../../features/sandBox/testReducer";
import eventReducer from "../../features/events/eventRedux/eventReducer";

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer
})

export default rootReducer

