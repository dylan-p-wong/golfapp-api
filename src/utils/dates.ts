import moment from 'moment';

export const numberInLastMonth = (items) => {
    let count = 0;

    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    for (const item of items) {
        if (item.createdAt) {
            if (moment.unix(item.createdAt / 1000).isAfter(startOfMonth) && moment.unix(item.createdAt / 1000).isBefore(endOfMonth)) {
                count++;
            }
        }
    }

    return count;
}
