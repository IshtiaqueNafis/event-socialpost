//region ***constants***
const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

//endregion

//region ***Actions()***
export const AsyncActionStart = () => {
    return {
        type: ASYNC_ACTION_START,
    };
};

export const AsyncActionFinish = () => {
    return {
        type: ASYNC_ACTION_FINISH
    };
};


export const AsyncActionError = error => {
    return {
        type: ASYNC_ACTION_ERROR,
        payload: error
    };
};

//endregion


//region ***reducer***
const initialState = {
    loading: false,
    error: null,
}
export default function asyncReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ASYNC_ACTION_START: {
            return {
                ...state,
                loading: true, // means its loading
                error: null // no error.
            }
        }
        case ASYNC_ACTION_FINISH: {
            return {
                ...state,
                loading: false, // loading will be false.

            }
        }
        case ASYNC_ACTION_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload // error has occoured.
            }
        }

        default:
            return state;

    }

}
//endregion