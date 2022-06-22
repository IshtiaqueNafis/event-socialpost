import React from 'react';
import {Grid} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useDispatch, useSelector} from "react-redux";
import {listenCurrentUserProfileAsync, profileSelectors} from "../../../redux/reducer/profileSliceReducer";
import {Redirect, useParams} from "react-router-dom";
import useFireStoreDoc from "../../../app/hooks/useFireStoreDoc";
import {getUserProfile} from "../../../app/firestore/fireStoreService";
import LoadingComponent from "../../../layout/LoadingComponent";


const ProfilePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentUserProfile = useSelector(state => profileSelectors.selectById(state,id));
    const {status, error} = useSelector(state => state.profile);

    useFireStoreDoc({
        query: () => getUserProfile(id),
        data: (profile) => dispatch(listenCurrentUserProfileAsync({profile})),
        deps: [dispatch, id]
    })

    if (status === 'pending' || (!currentUserProfile && !error)) return <LoadingComponent content={'Loading profile Details'}/>
    if (!currentUserProfile &&  error) return <Redirect to={'/error'}/>

    return (
        <Grid>
            <Grid.Column width={16}>
               <ProfileHeader profile={currentUserProfile}/>
                <ProfileContent/>
            </Grid.Column>
        </Grid>
    );
};

export default ProfilePage;
