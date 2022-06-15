import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {dataFromSnapshot} from "../firestore/fireStoreService";
import {AsyncActionError} from "../../redux/reducer/asyncSliceReducer";

export default function useFireStoreCollection({query,data,deps}) {
    const dispatch = useDispatch();
    useEffect(() => {

        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
                data(docs); // what do with data

            },
            error => dispatch(AsyncActionError(error)
            )
        );

        return () =>{
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}