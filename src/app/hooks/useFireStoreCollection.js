import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {AsyncActionError, AsyncActionFinish, AsyncActionStart} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firestore/fireStoreService";

export default function useFireStoreCollection({query,data,deps}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AsyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
                data(docs); // what do with data
                dispatch(AsyncActionFinish());
            },
            error => dispatch(AsyncActionError()
            )
        );

        return () =>{
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}