import {delay} from "../common/utlis/util";
import {sampleData} from "./sampleData";

export const fetchSampleData = () => {
    return delay(1000).then(
        ()=>{
        return Promise.resolve(sampleData);
    }
    )
};