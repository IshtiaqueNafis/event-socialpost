import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfaBl0XqFnHDtPUZwUaK1xsGDBRZIPWbE",
    authDomain: "re-events-4636f.firebaseapp.com",
    projectId: "re-events-4636f",
    storageBucket: "re-events-4636f.appspot.com",
    messagingSenderId: "366082795654",
    appId: "1:366082795654:web:a91a9a905a732b74930907",
    measurementId: "G-MXMDHFYJYJ"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
