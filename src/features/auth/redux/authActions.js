import {SIGN_IN_USER, SIGN_OUT_USER} from "./authConstants";
//region ***signInUser(payLoad) --> signs in a user. ***

export const signInUser = (payload) => {
    return {
        type: SIGN_IN_USER,
        payload
    }
}

//endregion

//region ***signOutUser() --> signsout user ***
export const SignOutUser = () => {
    return {
        type: SIGN_OUT_USER,
    };
};
//endregion