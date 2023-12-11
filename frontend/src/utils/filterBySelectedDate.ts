import dayjs from "dayjs";

export const filterBySelectedDate: <T extends { date: Date }>(data: T[], selectedDate: Date) => T[] = (data, selectedDate) => {
    return data.filter((item) => {
        const date = dayjs(selectedDate).toDate();
        const itemDate = dayjs(item.date).toDate();



        return date.getMonth() === itemDate.getMonth() && date.getFullYear() === itemDate.getFullYear();
    })
}