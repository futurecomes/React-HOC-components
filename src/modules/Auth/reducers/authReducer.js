import { REHYDRATE } from 'redux-persist/constants';

import createReducer from 'src/reducers/createReducer';

import {
    AUTH_IS_FETCHING,
    AUTH_AUTHENTICATE,
    AUTH_AUTHENTICATE_FAIL,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_SIGN_OUT,
    AUTH_FETCH_USER,
    AUTH_UPDATE_USER,
    AUTH_IS_PENDING_RESET,
    AUTH_PASSWORD_RESET,
    AUTH_SET_RESET_TOKEN,
    AUTH_SET_CREDITCARD_WARNING,
    AUTH_REMEMBER_ME,
} from '../actions/auth';
import {
    BILLING_DONE_SUBMITTING,
    BUY_MUSIC_ITEMS_FULFILLED,
    BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED,
    BILLING_SET_FREE_PLAN,
} from 'src/shared/components/old/Billing/actions';
import { VIP_EXTRAS_PAYMENT_FULFILLED } from 'src/modules/old/VipExtras/actions';
import { UPDATE_USER } from '../actions/authActions';

const initialState = {
    isFetching: false,
    user: {},
    token: null,
    isPendingVerification: false,
    isPendingReset: false,
    resetToken: null,
    showCreditCardWarning: true,
    rememberMeEmail: '',
    rememberMePassword: '',
};

// Action Handlers
const handlers = {
    [BILLING_DONE_SUBMITTING]: (state, action) => ({
        ...state,
        user: {
            ...state.user,
            planId: action.payload.planId,
        },
    }),
    [BILLING_SET_FREE_PLAN]: state => ({
        ...state,
        user: {
            ...state.user,
            planId: 'free',
        },
    }),
    [AUTH_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [AUTH_AUTHENTICATE]: (state, { payload: { token, user } }) => ({
        ...state,
        token,
        user,
        error: null,
        showCreditCardWarning: true,
        isFetching: false,
    }),
    [AUTH_REMEMBER_ME]: (state, { payload }) => ({
        ...state,
        rememberMeEmail: payload.email,
        rememberMePassword: payload.password,
    }),
    [AUTH_AUTHENTICATE_FAIL]: (state, { payload }) => ({
        ...state,
        error: payload,
        isFetching: false,
    }),
    [AUTH_SET_CREDITCARD_WARNING]: (state, { payload }) => ({
        ...state,
        showCreditCardWarning: payload,
    }),
    [AUTH_SIGN_UP_SUCCESS]: state => ({
        ...state,
        isFetching: false,
        isPendingVerification: true,
    }),
    [AUTH_FETCH_USER]: (state, { payload }) => ({
        ...state,
        user: payload,
        isFetching: false,
    }),
    [AUTH_UPDATE_USER]: (state, { payload }) => ({
        ...state,
        user: payload,
        isFetching: false,
    }),
    [UPDATE_USER]: (state, action) => ({
        ...state,
        user: {
            ...state.user,
            ...action.payload,
        },
        isFetching: false,
    }),
    [AUTH_IS_PENDING_RESET]: state => ({
        ...state,
        isPendingReset: true,
    }),
    [AUTH_PASSWORD_RESET]: state => ({
        ...state,
        isPendingReset: false,
        isFetching: false,
        resetToken: null,
    }),
    [AUTH_SET_RESET_TOKEN]: (state, { payload }) => ({
        ...state,
        resetToken: payload,
        isPendingReset: false,
    }),
    [AUTH_SIGN_OUT]: state => ({
        ...initialState,
        rememberMeEmail: state.rememberMeEmail,
        rememberMePassword: state.rememberMePassword,
    }),
    [BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED]: state => ({
        ...state,
        user: {
            ...state.user,
            musicLibraryTotalAccess: true,
        },
    }),
    [BUY_MUSIC_ITEMS_FULFILLED]: (state, action) => ({
        ...state,
        user: {
            ...state.user,
            musicLibrary: [...state.user.musicLibrary, ...action.payload.musicLibraryItems],
        },
    }),
    [VIP_EXTRAS_PAYMENT_FULFILLED]: (state, action) => ({
        ...state,
        user: {
            ...state.user,
            planId: action.payload.plan ? action.payload.plan.id : state.user.planId,
            musicLibrary: action.payload.musicLibrarySongs
                ? [...state.user.musicLibrary, ...action.payload.musicLibrarySongs.map(m => m.id)]
                : state.user.musicLibrary,
            musicLibraryTotalAccess: action.payload.musicLibraryAccess ? true : state.user.musicLibraryTotalAccess,
            adRemoval: action.payload.adRemoval ? true : state.user.adRemoval,
        },
    }),
    [REHYDRATE]: (state, { payload }) => ({
        ...initialState,
        isFetching: state.isFetching,
        token: payload.auth ? payload.auth.token : initialState.token,
        rememberMeEmail: payload.auth ? payload.auth.rememberMeEmail : initialState.rememberMeEmail,
        rememberMePassword: payload.auth ? payload.auth.rememberMePassword : initialState.rememberMePassword,
    }),
};

// Reducer
export const auth = createReducer(handlers, initialState);
