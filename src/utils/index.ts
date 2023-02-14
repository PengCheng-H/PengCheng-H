import moment from "moment";
import { IHCHttpResponse } from "../types/interface";



class HCUtils {
    FormatTime(original_time: string): string {
        return original_time ? moment(original_time).format("YYYY-MM-DD HH:mm:ss") : original_time;
    }

    CreateErrorRes(result: IHCHttpResponse = { result_code: -1, result_msg: "参数不正确!", data: {} }): IHCHttpResponse {
        return result;
    }
}

const utils = new HCUtils();
export default utils;
