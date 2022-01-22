import firebase from '../config/firebase';

const db = firebase.firestore();

//region getEventsFromFirestore = observer --> gets data fromFireStore.
export const getEventsFromFirestore = observer => db.collection('events').onSnapshot(observer);
//endregion

//region dataFromSnapshot(snapshot) returns data on usable format
export function dataFromSnapshot(snapshot){
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();

    for(const prop in data){
        if(data.hasOwnProperty(prop)){
            if(data[prop] instanceof firebase.firestore.Timestamp){ // this checks whether date is a child of fireBase.fireStore.TimeStamp
                data[prop] = data[prop].toDate();
            }
        }
    }


    return {
        ...data,
        id: snapshot.id,
    }
}
//endregion