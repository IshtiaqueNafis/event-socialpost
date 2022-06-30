import React from 'react';
import {Tab} from "semantic-ui-react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import EventsTab from "./EventsTab";

const ProfileContent = ({profile, isCurrentUser}) => {
    const panes = [
        {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
        {menuItem: 'Photos', render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser}/>},
        {menuItem: 'Events', render: () => <EventsTab profile={profile} isCurrentUser={isCurrentUser}/>},
        {menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane>},
    ]

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition={'right'}
            panes={panes}

        />
    );
};

export default ProfileContent;
