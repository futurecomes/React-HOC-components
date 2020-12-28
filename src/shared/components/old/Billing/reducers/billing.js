import { REHYDRATE } from 'redux-persist/constants';

import { AUTH_SIGN_OUT } from 'src/modules/Auth/actions/auth';
import { SIGN_OUT_FULFILLED } from 'src/modules/Auth/actions/authActions';
import {
    FETCH_EXTRAS_DETAILS_FULFILLED,
    SYNC_VIP_EXTRAS_BASKET,
    VIP_EXTRAS_PAYMENT,
    VIP_EXTRAS_PAYMENT_FULFILLED,
    VIP_EXTRAS_PAYMENT_REJECTED,
    RESET_VIP_EXTRAS_STATE,
} from 'src/modules/old/VipExtras/actions';
import createReducer from 'src/reducers/createReducer';

import * as actions from '../actions';
import * as subscriptionsActions from '../actions/subscriptions';
import { vipExtras } from './vipExtras';

const initialState = {
    isFetching: false,
    currentPlan: {},
    isEmbedPodcastActive: false,
    hasCheckedPayment: false,
    subscriptions: [],
    coupons: [],
    isSwitchingPlan: false,
    userPayments: [],
    isSubmittingPayment: false,
    userSubscriptions: [],
    fetchedSubscriptions: false,
    isNewlyBilled: false,
    musicLibraryPayments: [],
    coaching: [],
    freeMusicBasket: {
        data: [],
        isLoading: false,
        error: '',
        musicLibrary: false,
    },
    form: {
        isFetching: false,
        plan: null,
        appliedCode: null,
        codeMessage: '',
    },
    vipExtras: vipExtras(undefined, {}),
};

// Action Handlers
const handlers = {
    [actions.UPDATE_BILLING_DATA]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [actions.BILLING_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [actions.FETCH_CURRENT_PLAN_FULFILLED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        currentPlan: payload.plan,
        hasCheckedPayment: true,
        isEmbedPodcastActive: payload.isEmbedPodcastActive,
        userSubscriptions: payload.subscriptions,
        musicLibraryPayments: payload.musicLibraryPayments,
        coaching: payload.coaching,
        fetchedSubscriptions: true,
        last4: payload.last4,
    }),
    [actions.FETCH_SUBSCRIPTIONS_FULFILLED]: (state, { payload }) => ({
        ...state,
        subscriptions: payload
            .map(d => (d.planId ? d : { ...d, planId: d.id }))
            .map(d => ({ ...d, type: d.planId.replace(/:\d+$/, '') })),
    }),
    [actions.BILLING_SELECT_PLAN]: (state, { payload }) => ({
        ...state,
        form: {
            ...state.form,
            plan: payload,
        },
    }),
    [actions.BILLING_IS_SWITCHING_PLAN]: (state, { payload }) => ({
        ...state,
        isSwitchingPlan: payload,
        form: {
            ...state.form,
            plan: initialState.form.plan,
        },
    }),
    [actions.BILLING_IS_VALIDATING_COUPON]: state => ({
        ...state,
        form: {
            ...state.form,
            isFetching: true,
            codeMessage: '',
        },
    }),
    [actions.BILLING_APPLY_COUPON]: (state, { payload }) => ({
        ...state,
        form: {
            ...state.form,
            isFetching: false,
            appliedCode: payload,
            codeMessage: '',
        },
    }),
    [actions.BILLING_INVALID_COUPON]: (state, { payload }) => ({
        ...state,
        form: {
            ...state.form,
            isFetching: false,
            codeMessage: payload,
        },
    }),
    [actions.BILLING_IS_SUBMITTING]: state => ({
        ...state,
        isSubmittingPayment: true,
    }),
    [actions.BILLING_DONE_SUBMITTING]: (state, action) => ({
        ...state,
        isSubmittingPayment: false,
        currentPlan: action.payload,
    }),
    [actions.BILLING_SUBMIT_PAYMENT]: state => ({
        ...state,
        isSubmittingPayment: false,
        currentPlan: initialState.currentPlan,
        form: initialState.form,
        isSwitchingPlan: false,
        isNewlyBilled: true,
    }),
    [actions.BILLING_SUBMIT_PAYMENT_FAIL]: state => ({
        ...state,
        isSubmittingPayment: false,
    }),
    [actions.BILLING_CLEAR_NEW_BILLING]: state => ({
        ...state,
        isNewlyBilled: false,
    }),
    [AUTH_SIGN_OUT]: () => initialState,
    [REHYDRATE]: (state, { payload }) => ({
        ...(payload.billing || initialState),
        isFetching: false,
        isSubmittingPayment: false,
        hasCheckedPayment: false,
        isNewlyBilled: false,
        form: {
            ...((payload.billing && payload.billing.form) || initialState.form),
            isFetching: false,
            appliedCode: initialState.form.appliedCode,
            codeMessage: initialState.form.codeMessage,
        },
    }),
    [actions.ADD_MUSIC_ITEM_TO_BASKET]: (state, action) => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            data: !state.freeMusicBasket.data.includes(action.payload)
                ? [...state.freeMusicBasket.data, action.payload]
                : state.freeMusicBasket.data,
        },
    }),
    [actions.REMOVE_MUSIC_ITEM_FROM_BASKET]: (state, action) => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            musicLibrary: false,
            data: state.freeMusicBasket.data.filter(id => id !== action.payload),
        },
    }),
    [actions.START_MUSIC_LIBRARY_PAYMENT_LOADER]: state => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            isLoading: true,
            error: '',
        },
    }),
    [actions.SET_MUSIC_LIBRARY_PAYMENT_ERROR]: (state, action) => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            isLoading: false,
            error: action.payload,
        },
    }),
    [actions.BUY_MUSIC_ITEMS_FULFILLED]: state => ({
        ...state,
        freeMusicBasket: initialState.freeMusicBasket,
    }),
    [actions.BUY_MUSIC_ITEMS_REJECTED]: (state, action) => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            isLoading: false,
            error: action.payload,
        },
    }),
    [actions.ADD_MUSIC_LIBRARY_TO_BASKET]: state => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            data: [],
            isLoading: false,
            musicLibrary: true,
        },
    }),
    [actions.REMOVE_MUSIC_LIBRARY_FROM_BASKET]: state => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            data: [],
            isLoading: false,
            musicLibrary: false,
        },
    }),
    [actions.BUY_MUSIC_LIBRARY_TOTAL_ACCESS_REJECTED]: (state, action) => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            isLoading: false,
            error: action.payload,
        },
    }),
    [actions.BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED]: state => ({
        ...state,
        freeMusicBasket: {
            ...state.freeMusicBasket,
            isLoading: false,
            musicLibrary: false,
            error: '',
        },
    }),
    [subscriptionsActions.REACTIVATE_SUBSCRIPTION_FULFILLED]: (state, action) => ({
        ...state,
        userSubscriptions: state.userSubscriptions.map(subscription => {
            if (subscription.id !== action.payload) {
                return subscription;
            }

            return {
                ...subscription,
                cancelAtPeriodEnd: false,
                status: 'active',
            };
        }),
    }),
    [subscriptionsActions.CANCEL_SUBSCRIPTION_FULFILLED]: (state, action) => ({
        ...state,
        userSubscriptions: state.userSubscriptions.map(subscription => {
            if (subscription.id !== action.payload) {
                return subscription;
            }

            return {
                ...subscription,
                cancelAtPeriodEnd: true,
                disabled: true,
                status: 'canceled',
            };
        }),
    }),
    [FETCH_EXTRAS_DETAILS_FULFILLED]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [SYNC_VIP_EXTRAS_BASKET]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [VIP_EXTRAS_PAYMENT]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [VIP_EXTRAS_PAYMENT_FULFILLED]: (state, action) => ({
        ...state,
        currentPlan: {
            ...state.currentPlan,
            planId: action.payload.plan ? action.payload.plan.id : state.currentPlan.planId,
        },
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [VIP_EXTRAS_PAYMENT_REJECTED]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [RESET_VIP_EXTRAS_STATE]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
    [SIGN_OUT_FULFILLED]: (state, action) => ({
        ...state,
        vipExtras: vipExtras(state.vipExtras, action),
    }),
};
// Reducer
export default createReducer(handlers, initialState);
