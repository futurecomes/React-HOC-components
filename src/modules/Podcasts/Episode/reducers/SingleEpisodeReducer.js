import { combineReducers } from 'redux';
import {
    SINGLE_EPISODE_FETCHING_START,
    SINGLE_EPISODE_FETCHING_SUCCEED,
    SINGLE_EPISODE_FETCHING_FAILED,
} from '../actions/SingleEpisodeActions';

export default combineReducers({
    SingleEpisodeData: (state = { isFetched: false, isFetching: false }, { type, payload }) => {
        switch (type) {
            case SINGLE_EPISODE_FETCHING_START:
                return { ...state, isFetching: true };
            case SINGLE_EPISODE_FETCHING_SUCCEED:
                return {
                    ...state,
                    isFetching: false,
                    isFetched: true,
                    episodeData: payload,
                };
            case SINGLE_EPISODE_FETCHING_FAILED:
                return {
                    ...state,
                    isFetched: false,
                    isFetching: false,
                };
            default:
                return state;
        }
    },
});
