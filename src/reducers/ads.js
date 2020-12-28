import { REHYDRATE } from 'redux-persist/constants';

import createReducer from './createReducer';
import { ADS_IS_FETCHING, ADS_FETCH_ADS, ADS_FETCH_RANDOM_AD, ADS_FETCH_RANDOM_AUDIO_AD } from 'src/actions/old/ads';

const initialState = {
    isFetching: false,
    ads: [],
    audioAds: [],
    randomAds: [],
};

// Action Handlers
const handlers = {
    [ADS_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [ADS_FETCH_ADS]: (state, { payload }) => ({
        ...state,
        ads: payload,
        isFetching: false,
    }),
    [ADS_FETCH_RANDOM_AD]: (state, { payload }) => ({
        ...state,
        randomAds: payload,
        isFetching: false,
    }),
    [ADS_FETCH_RANDOM_AUDIO_AD]: (state, { payload }) => ({
        ...state,
        audioAds: payload,
        isFetching: false,
    }),
    [REHYDRATE]: state => ({
        ...initialState,
        isFetching: state.isFetching,
    }),
};

// Reducer
export default createReducer(handlers, initialState);
