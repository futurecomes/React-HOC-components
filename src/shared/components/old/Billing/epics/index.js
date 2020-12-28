import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import BillingApi from 'src/api/billing';
import { VIP_EXTRAS_PAYMENT_FULFILLED } from 'src/modules/old/VipExtras/actions';

import * as actions from '../actions';
import { determineSubscriptions } from '../helpers';

export function billingEpicFactory() {
    const fetchCurrentPlanEpic = (action$, store) =>
        action$.pipe(
            ofType(
                actions.FETCH_CURRENT_PLAN,
                VIP_EXTRAS_PAYMENT_FULFILLED,
                actions.BUY_MUSIC_ITEMS_FULFILLED,
                actions.BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED,
            ),
            switchMap(() =>
                BillingApi.fetchCurrentPlan(store.getState().auth.token, store.getState().auth.user.id)
                    .then(res =>
                        actions.fetchCurrentPlanFulfilled({
                            ...determineSubscriptions(res.subscriptions.filter(s => s.name !== 'Listener Support')),
                            ...res,
                        }),
                    )
                    .catch(actions.fetchCurrentPlanRejected),
            ),
        );

    return combineEpics(fetchCurrentPlanEpic);
}
