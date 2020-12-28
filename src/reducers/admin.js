import { REHYDRATE } from 'redux-persist/constants';

import createReducer from './createReducer';

import * as actions from 'src/actions/old/admin';
import {
    FETCH_ANALYTICS_FULFILLED,
    ADMIN_EDIT_SHOW_FULFILLED,
    FETCH_USER_PAYMENT_HISTORY_FULFILLED,
} from 'src/modules/old/Admin/actions';
import { FETCH_COACHING_LESSONS_FULFILLED, EDIT_COACHING_LESSON_FULFILLED } from 'src/modules/old/Admin/Coaching/actions';

const initialState = {
    isFetching: false,
    analytics: {
        podcast: {},
        user: {},
        show: {},
        audioAd: {
            totalAds: 0,
            ads: [],
            remainingAds: 0,
        },
        visualAd: {
            totalAds: 0,
            ads: [],
            remainingAds: 0,
        },
        tool: {},
        growth: {
            users: [],
        },
    },
    users: {
        data: [],
        totalCount: 0,
    },
    user: {},
    userPlan: {},
    userLogs: {
        data: [],
        totalCount: 0,
        error: false,
    },
    coaching: {
        data: [],
        totalCount: 0,
    },
    shows: {
        data: [],
        totalCount: 0,
    },
    show: {},
    categories: [],
    episodes: {
        data: [],
        totalCount: 0,
    },
    episode: {},
    audioAds: {
        data: [],
        totalCount: 0,
    },
    activeAudioAds: {
        data: [],
        totalCount: 0,
    },
    inactiveAudioAds: {
        data: [],
        totalCount: 0,
    },
    activeVisualAds: {
        data: [],
        totalCount: 0,
    },
    inactiveVisualAds: {
        data: [],
        totalCount: 0,
    },
    ad: {},
    activeFreeMusic: {
        data: [],
        totalCount: 0,
    },
    inactiveFreeMusic: {
        data: [],
        totalCount: 0,
    },
    freeMusic: {},
    freeMusicShows: {
        data: [],
        totalCount: 0,
    },
};

// Action Handlers
const handlers = {
    [FETCH_USER_PAYMENT_HISTORY_FULFILLED]: (state, action) => ({
        ...state,
        user: {
            ...state.user,
            payments: action.payload,
        },
    }),
    [actions.ADMIN_IS_FETCHING]: (state, { payload }) => ({
        ...state,
        ad: payload === 'ad' ? {} : state.ad,
        freeMusic: payload === 'freeMusic' ? {} : state.freeMusic,
        isFetching: true,
    }),
    [actions.ADMIN_FETCH_COMPLETE]: state => ({
        ...state,
        isFetching: false,
    }),
    [FETCH_ANALYTICS_FULFILLED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        analytics: {
            ...state.analytics,
            data: payload.analytics,
            audioAd: {
                totalAds: payload.audio.totalCount,
                ads: payload.audio.data,
            },
            visualAd: {
                totalAds: payload.audio.totalCount,
                ads: payload.audio.data,
            },
            growth: {
                users: payload.userGrowth.reverse(),
            },
        },
    }),
    [actions.ADMIN_FETCH_SHOW_ANALYTICS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        analytics: {
            ...state.analytics,
            show: payload,
        },
    }),
    [actions.ADMIN_FETCH_USERS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        users: {
            ...state.users,
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_USER]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        user: {
            ...state.user,
            ...payload,
        },
    }),
    [actions.ADMIN_FETCH_USER_PLAN]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        userPlan: payload,
    }),
    [actions.ADMIN_FETCH_USER_LOGS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        userLogs: {
            ...state.userLogs,
            data: payload.data,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_USER_LOGS_REJECTED]: state => ({
        ...state,
        isFetching: false,
        userLogs: {
            ...state.userLogs,
            error: true,
        },
    }),
    [actions.ADMIN_FETCH_USER_SHOWS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        shows: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_SHOWS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        shows: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [ADMIN_EDIT_SHOW_FULFILLED]: (state, { payload }) => ({
        ...state,
        shows: {
            ...state.shows,
            data: state.shows.data.map(show => {
                if (show.id !== payload.showId) {
                    return show;
                }

                return {
                    ...show,
                    sourceUrl: payload.rssUrl,
                };
            }),
        },
    }),
    [actions.ADMIN_FETCH_SHOW]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        show: payload,
    }),
    [actions.ADMIN_FETCH_CATEGORIES]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        categories: payload,
    }),
    [actions.ADMIN_FETCH_EPISODES]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        episodes: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_EPISODE]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        episode: payload,
    }),
    [actions.ADMIN_FETCH_AUDIO_ADS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        audioAds: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_ACTIVE_AUDIO_ADS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        activeAudioAds: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_INACTIVE_AUDIO_ADS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        inactiveAudioAds: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_AUDIO_AD_EPISODES]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        episodes: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_ACTIVE_VISUAL_ADS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        activeVisualAds: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_INACTIVE_VISUAL_ADS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        inactiveVisualAds: {
            data: payload.results,
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_AD]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        ad: payload,
    }),
    [actions.ADMIN_FETCH_ACTIVE_FREE_MUSIC]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        activeFreeMusic: {
            data: payload.results.map(a => ({
                ...a,
                duration: Math.round(a.duration / 1000) || 'not defined',
            })),
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_INACTIVE_FREE_MUSIC]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        inactiveFreeMusic: {
            data: payload.results.map(a => ({
                ...a,
                duration: Math.round(a.duration / 1000) || 'not defined',
            })),
            totalCount: payload.totalCount,
        },
    }),
    [actions.ADMIN_FETCH_FREE_MUSIC]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        freeMusic: payload,
    }),
    [actions.ADMIN_FETCH_FREE_MUSIC_SHOWS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        freeMusicShows: payload,
    }),
    [actions.ADMIN_CREATE_AUDIO_AD]: state => ({
        ...state,
        isFetching: false,
        activeAudioAds: initialState.activeAudioAds,
        inactiveAudioAds: initialState.inactiveAudioAds,
    }),
    [actions.ADMIN_CREATE_VISUAL_AD]: state => ({
        ...state,
        isFetching: false,
        activeVisualAds: initialState.activeVisualAds,
        inactiveVisualAds: initialState.inactiveVisualAds,
    }),
    [actions.ADMIN_CREATE_FREE_MUSIC]: (state, action) => {
        const key = action.payload.active ? 'activeFreeMusic' : 'inactiveFreeMusic';
        return {
            ...state,
            isFetching: false,
            [key]: {
                data: [{ ...action.payload, duration: Math.round(action.payload.duration / 1000) }, ...state[key].data],
                totalCount: state[key].totalCount + 1,
            },
        };
    },
    [actions.ADMIN_UPDATE_USER]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        user: {
            ...state.user,
            ...payload,
        },
    }),
    [actions.ADMIN_UPDATE_SHOW]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        show: payload,
    }),
    [actions.ADMIN_UPDATE_EPISODE]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        episode: payload,
    }),
    [actions.ADMIN_UPDATE_AUDIO_AD]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        ad: payload,
    }),
    [actions.ADMIN_UPDATE_VISUAL_AD]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        ad: payload,
    }),
    [actions.ADMIN_UPDATE_FREE_MUSIC]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        freeMusic: payload,
    }),
    [actions.ADMIN_DELETE_USERS]: state => ({
        ...state,
        isFetching: false,
        users: initialState.users,
    }),
    [actions.ADMIN_DELETE_SHOWS]: state => ({
        ...state,
        isFetching: false,
        shows: initialState.shows,
    }),
    [actions.ADMIN_DELETE_EPISODES]: state => ({
        ...state,
        isFetching: false,
        episodes: initialState.episodes,
    }),
    [actions.ADMIN_DELETE_ACTIVE_AUDIO_ADS]: state => ({
        ...state,
        isFetching: false,
        activeAudioAds: initialState.activeAudioAds,
    }),
    [actions.ADMIN_DELETE_INACTIVE_AUDIO_ADS]: state => ({
        ...state,
        isFetching: false,
        inactiveAudioAds: initialState.inactiveAudioAds,
    }),
    [actions.ADMIN_DELETE_AUDIO_ADS]: state => ({
        ...state,
        isFetching: false,
    }),
    [actions.ADMIN_DELETE_ACTIVE_VISUAL_ADS]: state => ({
        ...state,
        isFetching: false,
        activeVisualAds: initialState.activeVisualAds,
    }),
    [actions.ADMIN_DELETE_INACTIVE_VISUAL_ADS]: state => ({
        ...state,
        isFetching: false,
        inactiveVisualAds: initialState.inactiveVisualAds,
    }),
    [actions.ADMIN_DELETE_VISUAL_ADS]: state => ({
        ...state,
        isFetching: false,
    }),
    [actions.ADMIN_DELETE_ACTIVE_FREE_MUSIC]: state => ({
        ...state,
        isFetching: false,
        activeFreeMusic: initialState.activeFreeMusic,
    }),
    [actions.ADMIN_DELETE_INACTIVE_FREE_MUSIC]: state => ({
        ...state,
        isFetching: false,
        inactiveFreeMusic: initialState.inactiveFreeMusic,
    }),
    [FETCH_COACHING_LESSONS_FULFILLED]: (state, action) => ({
        ...state,
        coaching: {
            ...state.coaching,
            data: action.payload,
            totalCount: action.payload.length,
        },
    }),
    [EDIT_COACHING_LESSON_FULFILLED]: (state, action) => ({
        ...state,
        coaching: {
            ...state.coaching,
            data: state.coaching.data.map(lesson => {
                if (lesson.id !== action.payload.id) {
                    return lesson;
                }
                return {
                    ...lesson,
                    ...action.payload,
                };
            }),
        },
    }),
    [REHYDRATE]: (state, { payload }) => ({
        ...initialState,
        isFetching: state.isFetching,
        analytics: payload.analytics || initialState.analytics,
        users: payload.users || initialState.users,
        user: payload.user || initialState.user,
        userPlan: payload.userPlan || initialState.userPlan,
        userLogs: payload.userLogs || initialState.userLogs,
        shows: payload.shows || initialState.shows,
        show: payload.show || initialState.show,
        categories: payload.categories || initialState.categories,
        episodes: payload.episodes || initialState.episodes,
        episode: payload.episode || initialState.episode,
        audioAds: payload.audioAds || initialState.audioAds,
        activeAudioAds: payload.activeAudioAds || initialState.activeAudioAds,
        inactiveAudioAds: payload.inactivAudioAds || initialState.inactiveAudioAds,
        ad: payload.ad || initialState.ad,
        activeFreeMusic: payload.activeFreeMusic || initialState.activeFreeMusic,
        inactiveFreeMusic: payload.inactiveFreeMusic || initialState.inactiveFreeMusic,
        freeMusic: payload.freeMusic || initialState.freeMusic,
        freeMusicShows: payload.freeMusicShows || initialState.freeMusicShows,
    }),
};

// Reducer
export default createReducer(handlers, initialState);
