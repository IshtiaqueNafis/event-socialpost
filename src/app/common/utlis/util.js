//region delay(ms) -->  takes an time and delays an operation.
export const delay = ms => {
    return new Promise((resolve) => setTimeout(resolve, ms)) //returns a new promise
};

//endregion

export function getFileExtension(fileName) {
    const name= fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
    console.log({name})
    return name;
}