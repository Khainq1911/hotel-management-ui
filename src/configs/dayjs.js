import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

//format here is default value , you can input other type format if you want
export const formatDate = (
  date,
  format = "DD/MM/YYYY HH:mm:ss",
  timeZone = "Asia/Saigon"
) => {
  if (!dayjs(date).isValid()) return date;

  return dayjs(date).tz(timeZone).format(format);
};
