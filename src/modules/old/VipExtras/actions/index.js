export const FETCH_EXTRAS_DETAILS = 'FETCH_EXTRAS_DETAILS'
export const fetchExtrasDetails = () => ({
    type: FETCH_EXTRAS_DETAILS,
})

export const FETCH_EXTRAS_DETAILS_FULFILLED = 'FETCH_EXTRAS_DETAILS_FULFILLED'
export const fetchExtrasDetailsFulfilled = details => ({
    type: FETCH_EXTRAS_DETAILS_FULFILLED,
    payload: details,
})

export const FETCH_EXTRAS_DETAILS_REJECTED = 'FETCH_EXTRAS_DETAILS_REJECTED'
export const fetchExtrasDetailsRejected = errorMsg => ({
    type: FETCH_EXTRAS_DETAILS_REJECTED,
    error: errorMsg,
})

export const SYNC_VIP_EXTRAS_BASKET = 'SYNC_VIP_EXTRAS_BASKET'
export const syncVipExtrasBasket = basket => ({
    type: SYNC_VIP_EXTRAS_BASKET,
    payload: basket,
})

export const VIP_EXTRAS_PAYMENT = 'VIP_EXTRAS_PAYMENT'
export const vipExtrasPayment = (basket, stripeToken) => ({
    type: VIP_EXTRAS_PAYMENT,
    payload: {
        basket,
        stripeToken,
    },
})

export const VIP_EXTRAS_PAYMENT_FULFILLED = 'VIP_EXTRAS_PAYMENT_FULFILLED'
export const vipExtrasPaymentFulfilled = payload => ({
    type: VIP_EXTRAS_PAYMENT_FULFILLED,
    payload,
})

export const VIP_EXTRAS_PAYMENT_REJECTED = 'VIP_EXTRAS_PAYMENT_REJECTED'
export const vipExtrasPaymentRejected = error => ({
    type: VIP_EXTRAS_PAYMENT_REJECTED,
    error,
})

export const RESET_VIP_EXTRAS_STATE = 'RESET_VIP_EXTRAS_STATE'
export const resetVipExtrasState = () => ({
    type: RESET_VIP_EXTRAS_STATE,
})
