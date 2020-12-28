import { REHYDRATE } from 'redux-persist/constants';

import createReducer from 'src/reducers/createReducer';

import { PROFILE_IS_FETCHING, PROFILE_FETCH_USER } from '../actions/profileActions';

const initialState = {
    isFetching: false,
    user: {},
};

const handlers = {
    [PROFILE_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [PROFILE_FETCH_USER]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        user: payload,
    }),
    [REHYDRATE]: (state, { payload }) => ({
        ...initialState,
        isFetching: state.isFetching,
        user: payload.user ? payload.user : state.user,
    }),
};

export const profile = createReducer(handlers, initialState);
