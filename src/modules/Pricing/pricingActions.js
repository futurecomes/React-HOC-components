export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const addToBasket = item => ({
    type: ADD_TO_BASKET,
    payload: item,
});

export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const removeFromBasket = plan_id => ({
    type: REMOVE_FROM_BASKET,
    payload: plan_id,
});

export const FETCH_SUBSCRIPTIONS = 'FETCH_SUBSCRIPTIONS';
export const fetchSubscriptions = () => ({ type: FETCH_SUBSCRIPTIONS });

export const FETCH_SUBSCRIPTIONS_FULFILLED = 'FETCH_SUBSCRIPTIONS_FULFILLED';
export const fetchSubscriptionsFulfilled = subscriptions => ({
    type: FETCH_SUBSCRIPTIONS_FULFILLED,
    payload: subscriptions,
});

export const PRICING_PAYMENT = 'PRICING_PAYMENT';
export const pricingPayment = paymentPayload => ({
    type: PRICING_PAYMENT,
    payload: paymentPayload,
});

export const PRICING_PAYMENT_FULFILLED = 'PRICING_PAYMENT_FULFILLED';
export const pricingPaymentFulfilled = () => ({
    type: PRICING_PAYMENT_FULFILLED,
});

export const PRICING_PAYMENT_REJECTED = 'PRICING_PAYMENT_REJECTED';
export const pricingPaymentRejected = () => ({
    type: PRICING_PAYMENT_REJECTED,
});
