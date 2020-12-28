import BillingApi from 'src/api/billing';
import { clearMessages, setErrors } from 'src/actions/old/messages';
import { resetEditor } from 'src/actions/old/editor';

export const FETCH_SUBSCRIPTIONS = 'FETCH_SUBSCRIPTIONS';
export const fetchSubscriptions = () => ({
    type: FETCH_SUBSCRIPTIONS,
});

export const FETCH_SUBSCRIPTIONS_FULFILLED = 'FETCH_SUBSCRIPTIONS_FULFILLED';
export const fetchSubscriptionsFulfilled = payload => ({
    type: FETCH_SUBSCRIPTIONS_FULFILLED,
    payload,
});

export const FETCH_SUBSCRIPTIONS_REJECTED = 'FETCH_SUBSCRIPTIONS_REJECTED';
export const fetchSubscriptionsRejected = () => ({
    type: FETCH_SUBSCRIPTIONS_REJECTED,
});

export const FETCH_CURRENT_PLAN = 'FETCH_CURRENT_PLAN';
export const fetchCurrentPlan = () => ({
    type: FETCH_CURRENT_PLAN,
});

export const FETCH_CURRENT_PLAN_FULFILLED = 'FETCH_CURRENT_PLAN_FULFILLED';
export const fetchCurrentPlanFulfilled = payload => ({
    type: FETCH_CURRENT_PLAN_FULFILLED,
    payload,
});

export const FETCH_CURRENT_PLAN_REJECTED = 'FETCH_CURRENT_PLAN_REJECTED';
export const fetchCurrentPlanRejected = payload => ({
    type: FETCH_CURRENT_PLAN_REJECTED,
    payload,
});

export const BILLING_DONE_SUBMITTING = 'BILLING_DONE_SUBMITTING';
export const billingDoneSubmitting = payload => ({
    type: BILLING_DONE_SUBMITTING,
    payload,
});

export const BUY_MUSIC_ITEMS = 'BUY_MUSIC_ITEMS';
export const buyMusicItems = payload => ({
    type: BUY_MUSIC_ITEMS,
    payload,
});

export const BUY_MUSIC_ITEMS_FULFILLED = 'BUY_MUSIC_ITEMS_FULFILLED';
export const buyMusicItemsFulfiled = payload => ({
    type: BUY_MUSIC_ITEMS_FULFILLED,
    payload,
});

export const BUY_MUSIC_ITEMS_REJECTED = 'BUY_MUSIC_ITEMS_REJECTED';
export const buyMusiItemsRejected = payload => ({
    type: BUY_MUSIC_ITEMS_REJECTED,
    payload,
});

export const ADD_MUSIC_ITEM_TO_BASKET = 'ADD_MUSIC_ITEM_TO_BASKET';
export const addMusicItemToBasket = payload => ({
    type: ADD_MUSIC_ITEM_TO_BASKET,
    payload,
});

export const REMOVE_MUSIC_ITEM_FROM_BASKET = 'REMOVE_MUSIC_ITEM_FROM_BASKET';
export const removeMusicItemFromBasket = payload => ({
    type: REMOVE_MUSIC_ITEM_FROM_BASKET,
    payload,
});

export const START_MUSIC_LIBRARY_PAYMENT_LOADER = 'START_MUSIC_LIBRARY_PAYMENT_LOADER';
export const startMusicLibraryPaymentLoader = () => ({
    type: START_MUSIC_LIBRARY_PAYMENT_LOADER,
});

export const SET_MUSIC_LIBRARY_PAYMENT_ERROR = 'SET_MUSIC_LIBRARY_PAYMENT_ERROR';
export const setMusicLibraryPaymentError = payload => ({
    type: SET_MUSIC_LIBRARY_PAYMENT_ERROR,
    payload,
});

export const BUY_MUSIC_LIBRARY_TOTAL_ACCESS = 'BUY_MUSIC_LIBRARY_TOTAL_ACCESS';
export const buyMusicLibraryTotalAccess = payload => ({
    type: BUY_MUSIC_LIBRARY_TOTAL_ACCESS,
    payload,
});

export const BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED = 'BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED';
export const buyMusicLibraryTotalAccessFulfilled = payload => ({
    type: BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED,
    payload,
});

export const BUY_MUSIC_LIBRARY_TOTAL_ACCESS_REJECTED = 'BUY_MUSIC_LIBRARY_TOTAL_ACCESS_REJECTED';
export const buyMusicLibraryTotalAccessRejected = payload => ({
    type: BUY_MUSIC_LIBRARY_TOTAL_ACCESS_REJECTED,
    payload,
});

export const ADD_MUSIC_LIBRARY_TO_BASKET = 'ADD_MUSIC_LIBRARY_TO_BASKET';
export const addMusicLibraryToBasket = () => ({
    type: ADD_MUSIC_LIBRARY_TO_BASKET,
});

export const REMOVE_MUSIC_LIBRARY_FROM_BASKET = 'REMOVE_MUSIC_LIBRARY_FROM_BASKET';
export const removeMusicLibraryFromBasket = () => ({
    type: REMOVE_MUSIC_LIBRARY_FROM_BASKET,
});

export const BILLING_IS_FETCHING = 'BILLING_IS_FETCHING';
export const BILLING_APPLY_COUPON = 'BILLING_APPLY_COUPON';
export const BILLING_INVALID_COUPON = 'BILLING_INVALID_COUPON';
export const BILLING_IS_VALIDATING_COUPON = 'BILLING_IS_VALIDATING_COUPON';
function receivedCouponResponse(res) {
    if (!res.valid) {
        return {
            type: BILLING_INVALID_COUPON,
            payload: 'Invalid code',
        };
    }

    return {
        type: BILLING_APPLY_COUPON,
        payload: res,
    };
}

export function applyCoupon() {
    return (dispatch, getStore) => {
        const {
            auth: { token },
            form: {
                billing: {
                    values: { promoCode },
                },
            },
            billing: {
                form: { isFetching },
            },
        } = getStore();

        if (isFetching) {
            return;
        }

        if (!promoCode) {
            dispatch({
                type: BILLING_INVALID_COUPON,
                payload: 'Enter a code to apply',
            });

            return;
        }

        dispatch({ type: BILLING_IS_VALIDATING_COUPON });

        BillingApi.applyCoupon(token, promoCode)
            .then(res => dispatch(receivedCouponResponse(res)))
            .catch(res => dispatch(receivedCouponResponse(res)));
    };
}

export const BILLING_SET_FREE_PLAN = 'BILLING_SET_FREE_PLAN';
export function setFreePlan() {
    return {
        type: BILLING_SET_FREE_PLAN,
    };
}

export const BILLING_SELECT_PLAN = 'BILLING_SELECT_PLAN';
export const BILLING_IS_SWITCHING_PLAN = 'BILLING_IS_SWITCHING_PLAN';
export function setIsSwitchingPlan(isSwitching) {
    return {
        type: BILLING_IS_SWITCHING_PLAN,
        payload: isSwitching,
    };
}

export function selectPlan(plan, isForm) {
    return async (dispatch, getStore) => {
        if (isForm) {
            dispatch(setIsSwitchingPlan(true));

            return;
        }

        if (plan === 'free') {
            const {
                billing: { currentPlan },
                auth: { user, token },
            } = getStore();
            if (currentPlan && currentPlan.active) {
                await BillingApi.deactivatePlan(token);
                await BillingApi.setFreePlan(token);
                dispatch(setFreePlan());
            } else {
                user.plan_id = plan;
                await BillingApi.registerMember(token, getStore().auth.user);
                await BillingApi.setFreePlan(token);
                dispatch(setFreePlan());
            }
            return;
        }

        dispatch({
            type: BILLING_SELECT_PLAN,
            payload: plan,
        });
    };
}

export const BILLING_CLEAR_NEW_BILLING = 'BILLING_CLEAR_NEW_BILLING';
export function clearNewBilling() {
    return {
        type: BILLING_CLEAR_NEW_BILLING,
    };
}

export const BILLING_IS_SUBMITTING = 'BILLING_IS_SUBMITTING';

export const BILLING_SUBMIT_PAYMENT = 'BILLING_SUBMIT_PAYMENT';
export const BILLING_SUBMIT_PAYMENT_FAIL = 'BILLING_SUBMIT_PAYMENT_FAIL';
export function submitPayment(data) {
    return (dispatch, getStore) => {
        dispatch({ type: BILLING_IS_SUBMITTING });

        dispatch(clearMessages('form'));

        const {
            auth: { token },
            billing: {
                subscriptions,
                form: { codeMessage },
            },
        } = getStore();

        if (codeMessage) {
            // eslint-disable-next-line no-param-reassign
            data.promoCode = '';
        }

        const selectedPlan = subscriptions.find(({ id }) => id === data.frequency);
        if (!selectedPlan) {
            return;
        }

        BillingApi.submitPayment(token, {
            ...data,
            planId: selectedPlan.planId,
        })
            .then(res => {
                dispatch({
                    type: BILLING_SUBMIT_PAYMENT,
                    payload: selectedPlan,
                });

                dispatch(resetEditor());
                return {
                    planId: res.plan.id,
                    type: res.plan.id.replace(/:\d+$/, ''),
                    active: res.status === 'active',
                    currentPeriodEnd: new Date(res.currentPeriodEnd * 1000),
                };
            })
            .then(res => {
                dispatch(billingDoneSubmitting(res));
                return Promise.resolve();
            })
            .catch(message => {
                dispatch(setErrors('form', [message]));

                return dispatch({
                    type: BILLING_SUBMIT_PAYMENT_FAIL,
                });
            });
    };
}

export const UPDATE_BILLING_DATA = 'UPDATE_BILLING_DATA';
export const updateBillingData = payload => ({
    type: UPDATE_BILLING_DATA,
    payload,
});
