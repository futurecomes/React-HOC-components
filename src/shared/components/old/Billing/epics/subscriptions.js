import { combineEpics, ofType } from 'redux-observable'
import { switchMap, throttleTime } from 'rxjs/operators'

import BillingApi from 'src/api/billing'

import * as actions from '../actions/subscriptions'

export function subscriptionsEpicFactory() {
    const reactivateSubscriptionEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.REACTIVATE_SUBSCRIPTION),
            throttleTime(3000),
            switchMap(action =>
                BillingApi.reactivateSubscription(store.getState().auth.token, action.payload)
                    .then(() => actions.reactivateSubscriptionFulfilled(action.payload))
                    .catch(actions.reactivateSubscriptionRejected),
            ),
        )

    const cancelSubscriptionEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.CANCEL_SUBSCRIPTION),
            throttleTime(3000),
            switchMap(action =>
                (action.meta.listenerSupport
                    ? BillingApi.cancelMonthlyListenerSupportSubscription
                    : BillingApi.cancelSubscription)(store.getState().auth.token, action.payload)
                    .then(() => actions.cancelSubscriptionFulfilled(action.payload))
                    .catch(actions.cancelSubscriptionRejected),
            ),
        )

    return combineEpics(reactivateSubscriptionEpic, cancelSubscriptionEpic)
}
