import { combineEpics, ofType } from 'redux-observable';
import { switchMap, mergeMap } from 'rxjs/operators';

import AdminApi from 'src/api/admin';
import { LogApi } from 'src/api/log';

import * as actions from '../actions';

export function adminAnalyticsEpicFactory() {
    const fetchShowBreakdownEpic = (action$, { getState }) =>
        action$.pipe(
            ofType(actions.ADMIN_FETCH_ANALYTICS),
            switchMap(() => {
                const { token } = getState().auth;
                return Promise.all([
                    AdminApi.fetchAdminAnalytics(token),
                    AdminApi.fetchAudioAdAnalytics(token),
                    AdminApi.fetchVisualAdAnalytics(token),
                    AdminApi.fetchUserGrowth(token),
                ])
                    .then(([analytics, audio, visualAd, userGrowth]) =>
                        actions.fetchAnalyticsFulfilled({
                            analytics,
                            audio,
                            visualAd,
                            userGrowth,
                        }),
                    )
                    .catch(actions.fetchAnalyticsRejected);
            }),
        );

    const createLogEpic = (action$, { getState }) =>
        action$.pipe(
            ofType(actions.CREATE_LOG),
            mergeMap(action => {
                const { user, token } = getState().auth;
                return LogApi.createLog({ ...action.payload, user: user.id }, token)
                    .then(actions.createLogFulfilled)
                    .catch(actions.createLogRejected);
            }),
        );

    return combineEpics(fetchShowBreakdownEpic, createLogEpic);
}
