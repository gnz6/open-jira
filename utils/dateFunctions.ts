import { formatDistanceToNow } from "date-fns"

export const getFormatToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date);

    return fromNow;
}