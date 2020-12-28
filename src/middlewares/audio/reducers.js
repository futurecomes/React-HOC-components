import {
    AUDIO_START_PLAYBACK,
    AUDIO_HIDE_BAR,
    AUDIO_STOP_PLAYBACK,
    AUDIO_SET_CURRENT_PODCAST,
    AUDIO_SET_ELAPSED_TIME,
    AUDIO_SET_INTERVAL,
    AUDIO_SET_CURRENT_TIME,
    AUDIO_SET_CURRENT_PLAYER,
    AUDIO_SET_CURRENT_VOLUME,
    AUDIO_SET_PLAYBACK_RATE,
    AUDIO_SET_AD,
} from './actions';

import { EDITOR_DELETE_PODCAST } from 'src/actions/old/editor';

import { AUTH_SIGN_OUT } from 'src/modules/Auth/actions/auth';

const initialState = {
    // the new user selected podcast
    selectedPodcast: {
        showId: -1,
        episodeId: -1,
    },
    // the player's current podcast
    currentPodcast: {
        id: -1,
        guid: -1,
    },
    player: {
        isPlaying: false,
        currentTime: 0,
        duration: 1503,
        volume: 100,
        hide: true,
        rate: 1,
    },
};

const REDUCER_ACTION_HANDLERS = {
    [AUDIO_START_PLAYBACK]: state => ({
        ...state,
        player: {
            ...state.player,
            isPlaying: true,
            hide: false,
            isAd: false,
        },
    }),
    [AUDIO_SET_AD]: (state, { payload }) => ({
        ...state,
        ad: payload.ad,
        player: {
            ...state.player,
            isAd: payload.isAd,
        },
    }),
    [AUDIO_HIDE_BAR]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            hide: payload.hide,
        },
        currentPodcast: {
            ...state.currentPodcast,
            id: payload.close ? -1 : state.currentPodcast.id,
            guid: payload.close ? -1 : state.currentPodcast.guid,
        },
        selectedPodcast: {
            episodeId: payload.close ? -1 : state.selectedPodcast.episodeId,
            showId: payload.close ? -1 : state.selectedPodcast.showId,
        },
    }),
    [AUDIO_STOP_PLAYBACK]: state => ({
        ...state,
        player: {
            ...state.player,
            isPlaying: false,
        },
    }),
    [AUDIO_SET_INTERVAL]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            intervalId: payload,
        },
    }),
    [AUDIO_SET_ELAPSED_TIME]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            currentTime: payload,
        },
    }),
    [AUDIO_SET_CURRENT_PODCAST]: (state, { payload }) => ({
        ...state,
        selectedPodcast: payload.selectedPodcast,
        player: {
            ...state.player,
            isAd: false,
            duration: payload.currentPodcast ? payload.currentPodcast.duration : initialState.player.duration,
            currentTime: 0,
        },
        currentPodcast: payload.currentPodcast ? payload.currentPodcast : initialState.currentPodcast,
    }),
    [AUDIO_SET_CURRENT_TIME]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            currentTime: payload,
        },
    }),
    [AUDIO_SET_CURRENT_PLAYER]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            audioPlayer: payload,
        },
    }),
    [AUDIO_SET_CURRENT_VOLUME]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            volume: payload,
        },
    }),
    [AUDIO_SET_PLAYBACK_RATE]: (state, { payload }) => ({
        ...state,
        player: {
            ...state.player,
            rate: payload,
        },
    }),
    [EDITOR_DELETE_PODCAST]: (state, { payload }) => {
        if (payload.guid === state.currentPodcast.guid) {
            return { ...state, ...initialState };
        }
        return state;
    },
    [AUTH_SIGN_OUT]: () => ({ ...initialState }),
};

export default function deviceReducer(state = initialState, action) {
    const handler = REDUCER_ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
