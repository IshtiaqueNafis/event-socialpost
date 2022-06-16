import firebase from '../config/firebase';

const db = firebase.firestore();

//region getEventsFromFirestore = observer --> gets event data fromFireStore.
export const listenToEventsFromFirestore = () => db.collection('events');
//endregion

//region dataFromSnapshot(snapshot) returns data on usable format
export const dataFromSnapshot = snapshot => {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) { // this checks whether date is a child of fireBase.fireStore.TimeStamp
                data[prop] = data[prop].toDate();
            }
        }
    }


    return {
        ...data,
        id: snapshot.id,
    }
};

//endregion

//region listenToEventFromFirestore(eventId) gets a single event from firestore.
export const listenToEventFromFirestore = eventId => db.collection('events').doc(eventId);

//endregion

export const cancelEventToggle = (event) =>
    listenToEventsFromFirestore().doc(event.id).update({
        isCancelled: !event.isCancelled
    })
export const queryDataCollection = async ({query}) => {
    const data = await query().onSnapshot(
        snapshot => {
            snapshot.docs.map(doc => dataFromSnapshot(doc));
        });
    console.log({data});
    return data;
};
