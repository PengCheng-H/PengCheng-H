import moment from "moment";

class HCUtils {
  formatTime(original_time: string): string {
    return original_time
      ? moment(original_time).format("YYYY-MM-DD HH:mm:ss")
      : original_time;
  }
}

const utils = new HCUtils();
export default utils;
