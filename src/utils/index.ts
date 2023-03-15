import moment from "moment";
import { IHCResponse } from "../types/http_response.interface";



class HCUtils {
    FormatTime(original_time: string): string {
        return original_time ? moment(original_time).format("YYYY-MM-DD HH:mm:ss") : original_time;
    }

    CreateErrorRes(result: IHCResponse = { result_code: -1, result_msg: "参数不正确!", data: {} }): IHCResponse {
        return result;
    }
}

const utils = new HCUtils();
export default utils;
