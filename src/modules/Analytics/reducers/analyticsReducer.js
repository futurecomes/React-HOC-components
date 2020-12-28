import { groupBy } from 'lodash';

import { FETCH_SHOW_ANALYTICS_FULFILLED, FETCH_SHOW_ANALYTICS } from '../actions/analyticsActions';
import { initialShowState } from '../models/analyticsData';

export const analytics = (state = initialShowState, action) => {
    switch (action.type) {
        case FETCH_SHOW_ANALYTICS:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_SHOW_ANALYTICS_FULFILLED:
            return {
                ...state,
                episodes: action.payload.data.map(podcast => ({
                    ...podcast,
                    data: Object.entries(groupBy(podcast.data, e => `${e.year}/${e.month}`)).reduce(
                        (acc, [key, value]) => ({
                            ...acc,
                            [key]: value[0],
                        }),
                        {},
                    ),
                })),
                isFetching: false,
            };
        default:
            return state;
    }
};
