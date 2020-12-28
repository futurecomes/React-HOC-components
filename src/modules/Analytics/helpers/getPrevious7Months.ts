import { range } from 'lodash';
import moment from 'moment';

export const getPrevious7Months = (): string[] => {
    const dateNow = new Date();

    return range(7)
        .map(i =>
            moment(dateNow)
                .subtract(i, 'months')
                .format('YYYY-MM'),
        )
        .reverse();
};
