import React from 'react';
import {Grid} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useDispatch, useSelector} from "react-redux";
import {listenToSelectedUserProfile} from "../../../redux/reducer/profileSliceReducer";
import {Redirect, useParams} from "react-router-dom";
import useFireStoreDoc from "../../../app/hooks/useFireStoreDoc";
import {getUserProfile} from "../../../app/firestore/fireStoreService";
import LoadingComponent from "../../../layout/LoadingComponent";


const ProfilePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.auth);
    const {status, error, selectedUserProfile} = useSelector(state => state.profile);

    useFireStoreDoc({
        query: () => getUserProfile(id),
        data: (profile) => dispatch(listenToSelectedUserProfile({profile})),
        deps: [dispatch, id]
    })

    if ((status === "pending" && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent
        content={'Loading profile Details'}/>
    if (error || !selectedUserProfile) return <Redirect to={'/error'}/>

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={selectedUserProfile}
                               isCurrentUser={currentUser?.uid === selectedUserProfile.id}/>
                <ProfileContent profile={selectedUserProfile}
                                isCurrentUser={currentUser?.uid === selectedUserProfile.id}/>
            </Grid.Column>
        </Grid>
    );
};

export default ProfilePage;
