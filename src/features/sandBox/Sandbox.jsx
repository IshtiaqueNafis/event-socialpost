import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "semantic-ui-react";
import {decrement, increment} from "./testReducer";
import {openModal} from "../../app/common/modals/redux/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import TestMap from "./TestMap";

const Sandbox = () => {
    const dispatch = useDispatch()

    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    }

    const [location, setLocation] = useState(defaultProps);

    const handleSetLocation = latLng => {
        setLocation({...location, center: {lat: latLng.lat, lng: latLng.lng}})
    };


    const data = useSelector(state => state.test.data);
    // this comes from const initalState = {
    //     data: 42
    // }
    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is :{data}</h3>
            <Button content={'Increment'} color={'green'} onClick={() => dispatch(increment(2))}/>
            <Button content={'Decrement'} color={'red'} onClick={() => dispatch(decrement(1))}/>
            <Button content={'Open Modal'}
                    color={'teal'}
                    onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))}

            />
            <div style={{marginTop: 15}}>
                <TestPlaceInput setLocation={handleSetLocation}/>
                <TestMap location={location}/>

            </div>
        </>
    );
};

export default Sandbox;
