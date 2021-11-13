import {combineReducers} from "redux";
import testReducer from "../../features/sandBox/testReducer";
import eventReducer from "../../features/events/eventRedux/eventReducer";
import modalReducer from "../../app/common/modals/redux/modalReducer";

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    modals: modalReducer
})

export default rootReducer

