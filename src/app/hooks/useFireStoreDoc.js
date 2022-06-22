import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {dataFromSnapshot} from "../firestore/fireStoreService";
import {AsyncActionError} from "../../redux/reducer/asyncSliceReducer";

export default function useFireStoreDoc({query, data, deps}) {

    useEffect(() => {

        const unsubscribe = query().onSnapshot(
            snapshot => {
                data(dataFromSnapshot(snapshot));

            },

        );

        return () => {
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}