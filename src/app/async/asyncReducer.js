//region ***constants***
const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

//endregion

//region ***Actions()***
export function AsyncActionStart() {
    return {
        type: ASYNC_ACTION_START,
    }
}

export function AsyncActionFinish() {
    return {
        type: ASYNC_ACTION_FINISH
    }
}


export function AsyncActionError(error) {
    return {
        type: ASYNC_ACTION_ERROR,
        payload: error
    }
}

//endregion


//region ***reducer***
const initalState = {
    loading: false,
    error: null,
}
export default function asyncReducer(state = initalState, {type, payload}) {
    switch (type) {
        case ASYNC_ACTION_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case ASYNC_ACTION_FINISH: {
            return {
                ...state,
                loading: false,

            }
        }
        case ASYNC_ACTION_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }

        default:
            return state;

    }

}
//endregion