import { REHYDRATE } from 'redux-persist/constants';

import createReducer from './createReducer';

import { PAGES_IS_FETCHING, PAGES_FETCHED } from 'src/actions/old/pages';

const initialState = {
    isFetching: false,
    list: [],
};

// Action Handlers
const handlers = {
    [PAGES_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [PAGES_FETCHED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        list: payload,
    }),
    [REHYDRATE]: (state, { payload }) => ({
        ...initialState,
        isFetching: state.isFetching,
        list: payload.list || initialState.list,
    }),
};

// Reducer
export default createReducer(handlers, initialState);
