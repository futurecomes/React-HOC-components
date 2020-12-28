export const REACTIVATE_SUBSCRIPTION = 'REACTIVATE_SUBSCRIPTION'
export const reactivateSubscription = subscriptionId => ({
    type: REACTIVATE_SUBSCRIPTION,
    payload: subscriptionId,
})

export const REACTIVATE_SUBSCRIPTION_FULFILLED = 'REACTIVATE_SUBSCRIPTION_FULFILLED'
export const reactivateSubscriptionFulfilled = payload => ({
    type: REACTIVATE_SUBSCRIPTION_FULFILLED,
    payload,
})

export const REACTIVATE_SUBSCRIPTION_REJECTED = 'REACTIVATE_SUBSCRIPTION_REJECTED'
export const reactivateSubscriptionRejected = payload => ({
    type: REACTIVATE_SUBSCRIPTION_REJECTED,
    payload,
})

export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION'
export const cancelSubscription = (subscriptionId, listenerSupport = false) => ({
    type: CANCEL_SUBSCRIPTION,
    payload: subscriptionId,
    meta: {
        listenerSupport,
    },
})

export const CANCEL_SUBSCRIPTION_FULFILLED = 'CANCEL_SUBSCRIPTION_FULFILLED'
export const cancelSubscriptionFulfilled = subscriptionId => ({
    type: CANCEL_SUBSCRIPTION_FULFILLED,
    payload: subscriptionId,
})

export const CANCEL_SUBSCRIPTION_REJECTED = 'CANCEL_SUBSCRIPTION_REJECTED'
export const cancelSubscriptionRejected = error => ({
    type: CANCEL_SUBSCRIPTION_REJECTED,
    error,
})
