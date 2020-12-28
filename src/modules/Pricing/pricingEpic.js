import { combineEpics, ofType } from 'redux-observable';
import { filter, switchMap, mapTo } from 'rxjs/operators';

import BillingApi from 'src/api/billing';

import {
    FETCH_SUBSCRIPTIONS,
    fetchSubscriptionsFulfilled,
    PRICING_PAYMENT,
    pricingPaymentFulfilled,
    pricingPaymentRejected,
    PRICING_PAYMENT_FULFILLED,
} from './pricingActions';
import { vipExtrasApi } from '../old/VipExtras/api';
import { onSuccessfullTransactionNotification } from './components/Notifications';

const fetchSubscriptionsEpic = (action$, store) =>
    action$.pipe(
        ofType(FETCH_SUBSCRIPTIONS),
        filter(() => store.getState().pricing.availableSubscriptions.length === 0),
        switchMap(() => BillingApi.fetchSubscriptions(store.getState().auth.token).then(fetchSubscriptionsFulfilled)),
    );

const makePaymentEpic = (action$, store) =>
    action$.pipe(
        ofType(PRICING_PAYMENT),
        switchMap(({ payload: transactionPayload }) =>
            vipExtrasApi
                .vipExtrasPayment(store.getState().auth.token, transactionPayload)
                .then(pricingPaymentFulfilled)
                .catch(pricingPaymentRejected),
        ),
    );

const onPaymentNotificationEpic = (action$, store) =>
    action$.pipe(
        ofType(PRICING_PAYMENT_FULFILLED),
        mapTo(onSuccessfullTransactionNotification),
    );

export const pricingEpic = combineEpics(fetchSubscriptionsEpic, makePaymentEpic, onPaymentNotificationEpic);
