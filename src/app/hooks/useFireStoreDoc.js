import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {AsyncActionError, AsyncActionFinish, AsyncActionStart} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firestore/fireStoreService";

export default function useFireStoreDoc({query, data, deps}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AsyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {

                data(dataFromSnapshot(snapshot)); // what do with data
                dispatch(AsyncActionFinish());
            },
            error => dispatch(AsyncActionError()
            )
        );

        return () => {
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}