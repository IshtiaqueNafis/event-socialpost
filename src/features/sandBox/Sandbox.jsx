import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "semantic-ui-react";
import {decrement, increment} from "./testReducer";
import {openModal} from "../../app/common/modals/redux/modalReducer";
import TestPlaceInput from "./TestPlaceInput";

const Sandbox = () => {
    const dispatch = useDispatch()
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
                <TestPlaceInput/>

            </div>
        </>
    );
};

export default Sandbox;
