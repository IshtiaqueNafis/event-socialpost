export function fireBaseObjectToArray(snapshot){
    if(snapshot){
        return Object.entries(snapshot).map(e => Object.assign({}, e[1], {id: e[0]})); // create a new object
    }
}