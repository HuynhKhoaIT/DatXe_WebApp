import { ICustomerCare } from '@/interfaces/customerCare';
import { IOrder } from '@/interfaces/order';
import { convertUtcToLocalTime } from '@/utils/until';
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    start: string;
    user: string;
    orderDetail: any;
}
export const mapEventCalendar = (eventCalendar: IOrder, index: number): IEventCalendar => {
    // dayjs.utc(eventCalendar?.dateTime).format('YYYY-MM-DD HH:mm:ss')
    console.log(eventCalendar?.dateTime);
    console.log(convertUtcToLocalTime(eventCalendar?.dateTime,"YYYY-MM-DD HH:mm:ss"))
    return {
        _id: (index + 1).toString(),
        title: eventCalendar?.customerRequest || '',
        start: convertUtcToLocalTime(eventCalendar?.dateTime,"YYYY-MM-DD HH:mm:ss"),
        user: '',
        orderDetail: eventCalendar,
    };
};

export const mapArrayEventCalendar = (listEventsCalendar: any) => {
    const listEventsCalendarFormated = listEventsCalendar?.map((eventCalendar: IOrder, index: number) =>
        mapEventCalendar(eventCalendar, index),
    );
    return listEventsCalendarFormated;
};
