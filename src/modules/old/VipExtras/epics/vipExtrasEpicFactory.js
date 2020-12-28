import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as actions from '../actions';
import { vipExtrasApi } from '../api';

export function vipExtrasEpicFactory() {
    const fetchExtrasDetailsEpic = action$ =>
        action$.pipe(
            ofType(actions.FETCH_EXTRAS_DETAILS),
            switchMap(() =>
                vipExtrasApi
                    .fetchExtrasDetails()
                    .then(actions.fetchExtrasDetailsFulfilled)
                    .catch(actions.fetchExtrasDetailsRejected),
            ),
        );

    const vipExtrasPaymentEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.VIP_EXTRAS_PAYMENT),
            switchMap(action => {
                return vipExtrasApi
                    .vipExtrasPayment(store.getState().auth.token, action.payload)
                    .then(actions.vipExtrasPaymentFulfilled)
                    .catch(actions.vipExtrasPaymentRejected);
            }),
        );

    return combineEpics(fetchExtrasDetailsEpic, vipExtrasPaymentEpic);
}
