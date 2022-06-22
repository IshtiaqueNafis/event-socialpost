import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "semantic-ui-react";
import {decrement, increment} from "./testReducer";
import {openModal} from "../../app/common/modals/redux/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import TestMap from "./TestMap";

const Sandbox = () => {
    const dispatch = useDispatch()

    const [target, setTarget] = useState(null);

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
    const {loading} = useSelector(state => state.async);

    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is :{data}</h3>
            <Button
                name={'increment'}
                loading={loading && target === 'increment'}
                content={'Increment'}
                color={'green'}
                onClick={(e) => {
                    dispatch(increment(2))
                    setTarget(e.target.name);
                }}/>
            <Button
                name={'decrement'}
                loading={loading && target === 'decrement'}
                content={'Decrement'}
                color={'red'}
                onClick={(e) => {
                    dispatch(decrement(2))
                    setTarget(e.target.name);
                }}/>
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
