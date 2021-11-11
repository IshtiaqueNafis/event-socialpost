import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "semantic-ui-react";
import {decrement, increment} from "./testReducer";

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
        </>
    );
};

export default Sandbox;
