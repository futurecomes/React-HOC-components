import { combineEpics, ofType } from 'redux-observable'
import { throttleTime, mergeMap } from 'rxjs/operators'

import BillingAPI from 'src/api/billing'

import {
    FETCH_USER_PAYMENT_HISTORY,
    fetchUserPaymentHistoryFulfilled,
    fetchUserPaymentHistoryRejected,
} from '../actions'

const fetchUserPaymentHistoryEpic = (action$, store) =>
    action$.pipe(
        ofType(FETCH_USER_PAYMENT_HISTORY),
        throttleTime(1000),
        mergeMap(action =>
            BillingAPI.fetchCurrentPlan(store.getState().auth.token, action.payload)
                .then(fetchUserPaymentHistoryFulfilled)
                .catch(fetchUserPaymentHistoryRejected),
        ),
    )

export const userEpic = combineEpics(fetchUserPaymentHistoryEpic)
