import firebase from '../config/firebase';

const db = firebase.firestore();

export const getEventsFromFirestore = observer => db.collection('events').onSnapshot(observer);