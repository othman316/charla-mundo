import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const getRelativeTime = (time: Date) => dayjs(time).fromNow()
