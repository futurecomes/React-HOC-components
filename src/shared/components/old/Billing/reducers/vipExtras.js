import { SIGN_OUT_FULFILLED } from 'src/modules/Auth/actions/authActions';
import {
    FETCH_EXTRAS_DETAILS_FULFILLED,
    SYNC_VIP_EXTRAS_BASKET,
    VIP_EXTRAS_PAYMENT,
    VIP_EXTRAS_PAYMENT_FULFILLED,
    VIP_EXTRAS_PAYMENT_REJECTED,
    RESET_VIP_EXTRAS_STATE,
} from 'src/modules/old/VipExtras/actions';

const initialState = { basket: [], isProcessingPayment: false, paymentSucceeded: null };

export function vipExtras(state = initialState, action) {
    switch (action.type) {
        case FETCH_EXTRAS_DETAILS_FULFILLED:
            return {
                ...state,
                ...action.payload,
            };
        case SYNC_VIP_EXTRAS_BASKET:
            return { ...state, basket: action.payload };
        case VIP_EXTRAS_PAYMENT:
            return {
                ...state,
                isProcessingPayment: true,
            };
        case VIP_EXTRAS_PAYMENT_FULFILLED:
            return {
                ...state,
                isProcessingPayment: false,
                paymentSucceeded: true,
                basket: [],
            };
        case VIP_EXTRAS_PAYMENT_REJECTED:
            return {
                ...state,
                isProcessingPayment: false,
                paymentSucceeded: false,
            };
        case RESET_VIP_EXTRAS_STATE:
            return {
                ...state,
                isProcessingPayment: false,
                paymentSucceeded: null,
            };
        case SIGN_OUT_FULFILLED:
            return initialState;
        default:
            return state;
    }
}
