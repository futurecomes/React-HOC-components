export const FETCH_SHOW_ANALYTICS = 'FETCH_SHOW_ANALYTICS';
export const fetchShowAnalytics = payload => ({
    type: FETCH_SHOW_ANALYTICS,
    payload,
});

export const FETCH_SHOW_ANALYTICS_FULFILLED = 'FETCH_SHOW_ANALYTICS_FULFILLED';
export const fetchShowAnalyticsFulfilled = payload => ({
    type: FETCH_SHOW_ANALYTICS_FULFILLED,
    payload,
});

export const FETCH_SHOW_ANALYTICS_REJECTED = 'FETCH_SHOW_ANALYTICS_REJECTED';
export const fetchShowAnalyticsRejected = payload => ({
    type: FETCH_SHOW_ANALYTICS_REJECTED,
    payload,
});
