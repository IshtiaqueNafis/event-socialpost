/* global google  */
import React from 'react';
import {Icon, Segment} from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => {
    return (<Icon name={'marker'} size={'big'} color={'red'}/>)

}


const EventDetailedMap = ({latLng}) => {
    const defaultProps = {
        center: {
            lat: latLng.lat,
            lng: latLng.lng,
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <Segment attached={'bottom'} style={{padding: 0}}>

            <div style={{height: 300, width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDueWXOOU3faxcqVKkJr16w-WTIu-w2p"}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <Marker
                        lat={latLng.lat}
                        lng={latLng.lng}
                    />
                </GoogleMapReact>
            </div>
        </Segment>
    );
}
export default EventDetailedMap;
