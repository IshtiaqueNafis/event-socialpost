import firebase from '../config/firebase';
import {toast} from "react-toastify";

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

export const setUserProfileData = (user) => {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const socialLogin = async (selectedProvider) => {
    let provider;
    if (selectedProvider === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    }

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        if (result.additionalUserInfo.isNewUser) {
            await setUserProfileData(result.user);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

export const updateUserPassword = (creds) => {
    const user = firebase.auth().currentUser
    return user.updatePassword(creds.newPassword1);
}

export const getUserProfile = (userId) => db.collection('users').doc(userId)

export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    try {
        if (user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            })
        }
        return await db.collection('users').doc(user.uid).update(profile);
    } catch (e) {
        throw e;
    }
}

export function uploadToFirebaseStorage(file, filename) {
    const user = firebase.auth().currentUser;

    const storageRef = firebase.storage().ref();
    return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export async function updateUserProfilePhoto(downloadUrl, filename) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection('users').doc(user.uid);
    try {
        const userDoc = await userDocRef.get(); // get the user document
        if (!userDoc.data().photoUrl) {
            await db.collection('users').doc(user.uid).update({
                photoURL: downloadUrl
            })
            // update user current profile
            await user.updateProfile({
                photoURL: downloadUrl
            })

        }
        return await db.collection('users').doc(user.uid).collection('photos').add({
            name: filename,
            url: downloadUrl
        })
    } catch (e) {
        console.log({e})
        throw  e
    }
}

export const getUserPhotos = (userUid) => {
    return db.collection('users').doc(userUid).collection('photos')
}

export const setMainPhoto = async (photo) => {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.url
        });
        return user.updateProfile({
            photoURL: photo.url
        })

    } catch (e) {
        throw e;
    }
}

export const deleteFromFirebaseStorage = (fileName) => {
    const userUid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const photoRef = storageRef.child(`${userUid}/user_images/${fileName}`);
    return photoRef.delete();
}

export const deletePhotoFromCollection = (photoId) => {
    const userUid = firebase.auth().currentUser.uid;
    return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}