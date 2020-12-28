import {
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET,
    FETCH_SUBSCRIPTIONS_FULFILLED,
    PRICING_PAYMENT,
    PRICING_PAYMENT_FULFILLED,
    PRICING_PAYMENT_REJECTED,
} from './pricingActions';

const initialState = {
    basketItems: [],
    availableSubscriptions: [],
    paymentStatus: {
        processing: false,
        fulfilled: false,
        rejected: false,
    },
};

export const pricing = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_BASKET:
            const isItemAlreadyInBasket = !!state.basketItems.find(item => item.plan_id === payload.plan_id);

            return !isItemAlreadyInBasket ? { ...state, basketItems: [...state.basketItems, payload] } : { ...state };
        case REMOVE_FROM_BASKET:
            return {
                ...state,
                basketItems: [...state.basketItems.filter(item => item.plan_id !== payload.plan_id)],
            };
        case FETCH_SUBSCRIPTIONS_FULFILLED:
            return { ...state, availableSubscriptions: payload };
        case PRICING_PAYMENT:
            return {
                ...state,
                paymentStatus: { ...state.paymentStatus, processing: true },
            };
        case PRICING_PAYMENT_FULFILLED:
            return {
                ...state,
                basketItems: [],
                paymentStatus: { ...state.paymentStatus, processing: false, fulfilled: true },
            };
        case PRICING_PAYMENT_REJECTED:
            return {
                ...state,
                paymentStatus: { ...state.paymentStatus, processing: false, rejected: true },
            };
        default:
            return state;
    }
};
