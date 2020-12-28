import _shuffle from 'lodash/shuffle';

import { sortByTitleToNumber } from '../models/podcastsData';
import { AUTH_SIGN_OUT } from 'src/modules/Auth/actions/auth';
import { UPDATE_EPISODE_FULFILLED, UPDATE_EPISODE } from 'src/modules/old/Shows/actions/episodeEdit';
import { FETCH_SHOW_EPISODES_FULFILLED } from 'src/modules/old/Shows/actions';
import { serializeData } from 'src/shared/helpers/serializeData';
import { FETCH_SHOW_EPISODES } from 'src/actions/old';
import createReducer from 'src/reducers/createReducer';

import * as listenActions from '../Listen/actions/listenActions';
import * as actions from '../actions/oldPodcastsActions';
import {
    PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST,
    PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS,
    PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL,
} from '../actions/podcastsActions';

const initialState = {
    isFetching: false,
    show: {},
    shows: {},
    episodes: {},
    unplayed: [],
    subscriptions: [],
    play: {},
    listen: {},
    emptyResponse: null,
    canLoadMore: null,
    isUpdatingEpisode: false,
    filter: {
        searchTerm: '',
        category: 0, // is {}
        sortBy: sortByTitleToNumber['top & trending'],
    },
    categories: [],
    protection: {
        isProcessing: false,
        hasProceded: false,
        isAccessGranted: false,
    },
};

// Action Handlers
const handlers = {
    [UPDATE_EPISODE]: state => ({
        ...state,
        isUpdatingEpisode: true,
    }),
    [UPDATE_EPISODE_FULFILLED]: (state, action) => ({
        ...state,
        isUpdatingEpisode: false,
        episodes: {
            ...state.episodes,
            [action.payload.show]: state.episodes[action.payload.show].map(episode => {
                if (episode.guid !== action.payload.guid) {
                    return episode;
                }

                return {
                    ...episode,
                    ...action.payload.data,
                };
            }),
        },
    }),
    [actions.PODCASTS_IS_FETCHING]: (state, action) => ({
        ...state,
        isFetching: action.payload,
    }),
    [actions.PODCASTS_DONE_FETCHING]: state => ({
        ...state,
        isFetching: false,
    }),
    [FETCH_SHOW_EPISODES_FULFILLED]: (state, { payload }) => {
        return {
            ...state,
            episodes: {
                ...state.episodes,
                [payload.showId]: payload.data,
            },
        };
    },
    [FETCH_SHOW_EPISODES]: state => ({
        ...state,
        isFetching: true,
    }),
    [actions.PODCASTS_CREATE]: (state, { payload }) => ({
        ...state,
        isFetching: false,

        episodes: {
            ...state.episodes,
            [payload.show]: state.episodes[payload.show] ? state.episodes[payload.show].concat([payload]) : [payload],
        },
    }),
    [actions.PODCASTS_FETCH_SHOW]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        show: payload,
        shows: payload
            ? {
                  ...state.shows,
                  [payload.id]: payload,
              }
            : state.shows,
    }),
    [actions.PODCASTS_SUBMIT_PLAYED]: (state, { payload }) => ({
        ...state,
        play: {
            ...state.play,
            played: payload,
        },
    }),
    [actions.PODCASTS_UPDATE_PLAYED]: (state, { payload }) => ({
        ...state,
        play: {
            ...state.play,
            played: payload,
        },
    }),
    [actions.PODCASTS_REGISTER_LISTEN]: (state, { payload }) => ({
        ...state,
        play: {
            ...state.play,
            regist_listen: payload,
        },
    }),
    [listenActions.FETCH_PODCASTS_REJECTED]: state => ({
        ...state,
        isFetching: false,
        emptyResponse: true,
        canLoadMore: false,
    }),
    [listenActions.FETCH_PODCASTS_BY_CATEGORY]: (state, action) => ({
        ...state,
        isFetching: true,
        listen: {
            ...state.listen,
            search: null,
            category:
                state.listen.category &&
                state.listen.category.currentCategory &&
                state.listen.category.currentCategory.id !== action.payload.category.id
                    ? {
                          ...state.listen.category,
                          trending: null,
                          latest: null,
                          noMoreLatest: false,
                          currentCategory: action.payload.category,
                      }
                    : {
                          ...state.listen.category,
                          currentCategory: action.payload.category,
                          [action.payload.type]:
                              (state.listen.category && state.listen.category[action.payload.type]) || null,
                      },
        },
    }),
    [listenActions.LOAD_MORE_PODCASTS_BY_CATEGORY_FULFILLED]: (state, action) => ({
        ...state,
        listen: {
            ...state.listen,
            category: {
                ...state.listen.category,
                latest: [...state.listen.category.latest, ...action.payload],
                noMoreLatest: action.payload.length < 10, // Elastic search returns results in batches by 10
            },
        },
    }),
    [listenActions.CLEAR_PODCASTS_BY_CATEGORY]: state => ({
        ...state,
        isFetching: false,
        listen: {
            ...state.listen,
            category: null,
        },
    }),
    [listenActions.FETCH_PODCASTS_BY_CATEGORY_FULFILLED]: (state, action) => {
        const { data, type } = action.payload;
        const previousLatest = state.listen.category.latest;

        if (type === 'trending') {
            return {
                ...state,
                isFetching: false,
                listen: {
                    ...state.listen,
                    category: {
                        ...state.listen.category,
                        [type]: data,
                    },
                },
            };
        }

        return {
            ...state,
            isFetching: false,
            listen: {
                ...state.listen,
                category: {
                    ...state.listen.category,
                    [type]: previousLatest ? [...previousLatest, ...data] : data,
                    noMoreLatest: data.length < 10,
                },
            },
        };
    },
    [listenActions.FETCH_LISTEN_PAGE_DATA_FULFILLED]: (state, action) => ({
        ...state,
        isFetching: false,
        listen: {
            ...state.listen,
            [action.payload.type]:
                action.payload.type !== 'promoted'
                    ? serializeData(action.payload.data)
                    : [
                          ..._shuffle(
                              serializeData(action.payload.data).map(show => {
                                  const isShowUrlValid = show.customUrl && !/\W/.test(show.customUrl);
                                  const url = isShowUrlValid ? show.customUrl : `/show/${show.id}`;
                                  return {
                                      ...show,
                                      url,
                                  };
                              }),
                          ),
                          ...[
                              ...Array(3 - action.payload.data.length < 0 ? 0 : 3 - action.payload.data.length).keys(),
                          ].map(index => ({
                              id: index - 3,
                              showPlaceholder: true,
                          })),
                      ],
        },
        emptyResponse: action.payload.length === 0,
        canLoadMore: action.payload.length === 10,
    }),
    [listenActions.CHANGE_SEARCH_TERM]: (state, action) => ({
        ...state,
        listen: {
            ...state.listen,
            search: {
                ...state.listen.search,
                term: action.payload,
            },
        },
    }),
    [listenActions.SEARCH_FOR_PODCASTS]: (state, action) => ({
        ...state,
        isFetching: true,
        listen: {
            ...state.listen,
            search: {
                ...(state.listen.search || {}),
                term: action.payload.term,
                data: state.listen.search
                    ? state.listen.search.term === action.payload.term && state.listen.search.data
                    : null,
            },
        },
    }),
    [listenActions.SEARCH_FOR_PODCASTS_FULFILLED]: (state, action) => ({
        ...state,
        isFetching: false,
        listen: {
            ...state.listen,
            search: {
                ...(state.listen.search || {}),
                data: [...(state.listen.search ? state.listen.search.data || [] : []), ...(action.payload || [])],
                noMoreSearch: action.payload.length < 10,
            },
        },
    }),
    [listenActions.CLEAR_SEARCH_PODCASTS]: state => ({
        ...state,
        listen: {
            ...state.listen,
            search: null,
        },
    }),
    [listenActions.CLEAR_SEARCH_RESULTS]: state => ({
        ...state,
        listen: {
            ...state.listen,
            search: {
                ...state.listen.search,
                data: null,
            },
        },
    }),
    [listenActions.LOAD_MORE_PODCASTS_FULFILLED]: (state, action) => ({
        ...state,
        isFetching: false,
        listen: {
            ...state.listen,
            [action.payload.type]: [...state.listen[action.payload.type], ...serializeData(action.payload.data)],
        },
        emptyResponse: action.payload.length === 0,
        canLoadMore: action.payload.length === 10,
    }),
    [actions.PODCASTS_FETCH_SUBSCRIBED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        subscriptions: payload,
    }),
    [actions.PODCASTS_FETCH_UNPLAYED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        unplayed: payload,
    }),
    [actions.PODCASTS_FETCH_IS_PLAYED]: (state, { payload }) => {
        const showId = payload.show;
        const episodeId = payload.episode;
        const episode = state.episodes[showId].find(e => e.id === episodeId);
        const episodeIdx = state.episodes[showId].indexOf(episode);

        const episodes = state.episodes;
        episodes[showId][episodeIdx] = {
            ...episode,
            isPlayed: payload.isPlayed,
        };

        return {
            ...state,
            episodes,
        };
    },
    [actions.PODCASTS_FETCH_AUTHORED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        authored: payload,
    }),
    [actions.PODCASTS_FETCH_CATEGORIES]: (state, { payload }) => ({
        ...state,
        categories: payload.reduce(
            (acc, category) => [
                ...acc,
                {
                    id: category.id,
                    name: category.name,
                    urlParam: category.name.replace(/\s/g, '').toLowerCase(),
                },
            ],
            [],
        ),
    }),
    [actions.PODCASTS_FETCH_IS_SUBSCRIBED]: (state, { payload }) => ({
        ...state,
        show: {
            ...state.show,
            isSubscribed: payload.isSubscribed,
        },
        shows: {
            ...state.shows,
            [payload.show]: {
                ...state.shows[payload.show],
                isSubscribed: payload.isSubscribed,
            },
        },
    }),
    [actions.PODCASTS_FETCH_UNPLAYED_COUNT]: (state, { payload }) => ({
        ...state,
        shows: {
            ...state.shows,
            [payload.show]: {
                ...state.shows[payload.show],
                unplayedCount: payload.unplayedCount,
            },
        },
    }),
    [actions.PODCASTS_SET_SEARCH_TERM]: (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            searchTerm: payload,
        },
    }),
    [listenActions.CLEAR_PODCASTS]: state => ({
        ...state,
        emptyResponse: null,
        listen: {},
    }),
    [actions.PODCASTS_SET_CATEGORY]: (state, { payload }) => ({
        ...state,
        isFetching: true,
        filter: {
            ...state.filter,
            category: payload,
        },
    }),
    [listenActions.CHANGE_CURRENT_CATEGORY]: (state, { payload }) => ({
        ...state,
        listen: {
            ...state.listen,
            category: {
                ...state.listen.category,
                currentCategory: payload,
            },
        },
    }),
    [AUTH_SIGN_OUT]: () => initialState,
    [PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST]: state => ({
        ...state,
        protection: { ...state.protection, isProcessing: true },
    }),
    [PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS]: state => ({
        ...state,
        protection: { isProcessing: false, hasProceded: true, isAccessGranted: true },
    }),
    [PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL]: state => ({
        ...state,
        protection: { isProcessing: false, hasProceded: true, isAccessGranted: false },
    }),
};

export default createReducer(handlers, initialState);
