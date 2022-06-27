import {useDispatch} from "react-redux";
import {useEffect} from "react";
import firebase from "firebase/compat";
import {dataFromSnapshot, getUserProfile} from "../firestore/fireStoreService";
import {listenToCurrentUserProfile, resetProfileState} from "../../redux/reducer/profileSliceReducer";
import {asyncAppLoaded} from "../../redux/reducer/asyncSliceReducer";
import {resetUser, setUser} from "../../redux/reducer/authSliceReducer";

export const useVerifyAuth = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                
                const profileRef = getUserProfile(user.uid);
                profileRef.onSnapshot(snapshot => {
                    dispatch(setUser(user));
                    dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                    dispatch(asyncAppLoaded());
                })
            } else {
                dispatch(resetUser());
                dispatch(resetProfileState());
                dispatch(asyncAppLoaded());
            }
        })
        return () => {
            unsubscribe();
        }
    }, [dispatch])
} 