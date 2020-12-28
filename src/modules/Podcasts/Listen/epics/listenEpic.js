import { combineEpics, ofType } from 'redux-observable';
import { defer } from 'rxjs';
import {
    mergeMap,
    throttleTime,
    pluck,
    distinctUntilChanged,
    switchMap,
    map,
    catchError,
    takeUntil,
} from 'rxjs/operators';
import PodcastsAPI from 'src/api/podcasts';

import * as actions from '../actions/listenActions';

const fetchTopPodcastsEpic = action$ =>
    action$.pipe(
        ofType(actions.FETCH_LISTEN_PAGE_DATA),
        throttleTime(200),
        mergeMap(() =>
            PodcastsAPI.fetchTopPodcasts()
                .then(res => actions.fetchListenPageDataFulfilled({ type: 'trending', data: res.data }))
                .catch(actions.fetchPodcastsRejected),
        ),
    );

const fetchLatestPodcastsEpic = action$ =>
    action$.pipe(
        ofType(actions.FETCH_LISTEN_PAGE_DATA),
        throttleTime(200),
        mergeMap(() =>
            PodcastsAPI.fetchLatestPodcasts()
                .then(res => actions.fetchListenPageDataFulfilled({ type: 'latest', data: res.data }))
                .catch(actions.loadMorePodcastsRejected),
        ),
    );

const fetchPodcastsByCategoryEpic = (action$, store) =>
    action$.pipe(
        ofType(actions.FETCH_PODCASTS_BY_CATEGORY),
        mergeMap(action =>
            (action.payload.type === 'trending'
                ? PodcastsAPI.fetchTopPodcasts(action.payload.category.id)
                : PodcastsAPI.fetchLatestPodcasts(action.payload.from, action.payload.category.id)
            )
                .then(res => actions.fetchPodcastsByCategoryFulfilled({ data: res.data, type: action.payload.type }))
                .catch(actions.fetchPodcastsByCategoryRejected),
        ),
    );

const fetchCantMissShows = action$ =>
    action$.pipe(
        ofType(actions.FETCH_LISTEN_PAGE_DATA),
        throttleTime(200),
        mergeMap(() =>
            PodcastsAPI.fetchCantMissShows()
                .then(res => actions.fetchListenPageDataFulfilled({ type: 'promoted', data: res.data }))
                .catch(actions.loadMorePodcastsRejected),
        ),
    );

const loadMorePodcastsEpic = action$ =>
    action$.pipe(
        ofType(actions.LOAD_MORE_PODCASTS),
        pluck('payload'),
        distinctUntilChanged((prev, next) => prev.from === next.from),
        mergeMap(payload =>
            PodcastsAPI.loadMorePodcasts(payload.path, payload.from)
                .then(res => actions.loadMorePodcastsFulfilled({ type: payload.type, data: res.data }))
                .catch(actions.loadMorePodcastsRejected),
        ),
    );

const loadMorePodcastsByCategoryEpic = (action$, store) =>
    action$.pipe(
        ofType(actions.LOAD_MORE_PODCASTS_BY_CATEGORY),
        throttleTime(400),
        pluck('payload'),
        switchMap(payload =>
            defer(() =>
                PodcastsAPI.fetchLatestPodcasts(payload.from, store.getState().podcasts.listen.category.selected.id),
            ).pipe(
                map(res => actions.loadMorePodcastsByCategoryFulfilled(res.data)),
                takeUntil(action$.pipe(ofType(actions.FETCH_PODCASTS_BY_CATEGORY, actions.CLEAR_PODCASTS_BY_CATEGORY))),
                catchError(actions.loadMorePodcastsByCategoryRejected),
            ),
        ),
    );

const searchPodcastsEpic = action$ =>
    action$.pipe(
        ofType(actions.SEARCH_FOR_PODCASTS),
        throttleTime(400),
        pluck('payload'),
        switchMap(payload =>
            PodcastsAPI.searchPodcasts(payload.from, payload.term)
                .then(res => actions.searchForPodcastsFulfilled(res.data))
                .catch(actions.searchForPodcastsRejected),
        ),
    );

export const listenEpic = combineEpics(
    fetchLatestPodcastsEpic,
    fetchTopPodcastsEpic,
    loadMorePodcastsEpic,
    fetchCantMissShows,
    fetchPodcastsByCategoryEpic,
    loadMorePodcastsByCategoryEpic,
    searchPodcastsEpic,
);
