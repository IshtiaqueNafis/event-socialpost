//region delay(ms) -->  takes an time and delays an operation.
export const delay = ms => {
    return new Promise((resolve) => setTimeout(resolve, ms)) //returns a new promise
};
//endregion

