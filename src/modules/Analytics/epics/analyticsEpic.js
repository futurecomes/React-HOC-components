import { ofType, combineEpics } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import ShowsApi from 'src/api/shows';

import {
    FETCH_SHOW_ANALYTICS,
    fetchShowAnalyticsFulfilled,
    fetchShowAnalyticsRejected,
} from '../actions/analyticsActions';

export const fetchShowAnalytics = (action$, { getState }) =>
    action$.pipe(
        ofType(FETCH_SHOW_ANALYTICS),
        switchMap(action =>
            ShowsApi.fetchMonthlyAnalytics(getState().auth.token, action.payload)
                .then(fetchShowAnalyticsFulfilled)
                .catch(fetchShowAnalyticsRejected),
        ),
    );

export const analyticsEpic = combineEpics(fetchShowAnalytics);
