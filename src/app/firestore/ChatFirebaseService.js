import firebase from "firebase/compat";

export function addEventChatComments(eventId, values) {
    const user = firebase.auth().currentUser;
    const newComment =
        {
            uid: user.uid,
            text: values.comment,
            date: Date.now(),
            displayName: user.displayName,
            photoUrl: user.photoURL,
            parentId :values.parentId,
        }
    return firebase.database().ref(`chat/${eventId}`).push(newComment)
}

export function getEventsChatRef(eventId){
    return firebase.database().ref(`chat/${eventId}`).orderByKey();
}

