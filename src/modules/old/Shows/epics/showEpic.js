import { combineEpics, ofType } from 'redux-observable';
import { map, filter, mapTo, mergeMap, catchError, switchMap, pluck } from 'rxjs/operators';
import _isEmpty from 'lodash/isEmpty';
import { from } from 'rxjs';
import uuidv1 from 'uuid/v1';

import { setErrors } from 'src/actions/old/messages';
import { hideShowArtWarning, submitShow, displayShowArtWarning } from 'src/actions/old/shows';
import ShowsApi from 'src/api/shows';
import PodcastApi from 'src/api/podcasts';
import request from 'src/api/core';
import { getDuration } from 'src/shared/helpers/getDuration';

import { UPDATE_EPISODE, updateEpisodeFulfilled, updateEpisodeRejected } from '../actions/episodeEdit';
import * as actions from '../actions';

import { FETCH_SHOW_EPISODES, fetchUserShowsFulfilled } from 'src/actions/old';

export function showEpicFactory() {
    const fetchUserShowsEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.FETCH_USER_SHOWS),
            filter(() => _isEmpty(store.getState().shows.list)),
            switchMap(() => {
                const { token, user } = store.getState().auth;
                return ShowsApi.fetchUserShows(token, user.id)
                    .then(fetchUserShowsFulfilled)
                    .catch(actions.fetchUserShowsRejected);
            }),
        );

    const fetchUserShowEpisodesEpic = action$ =>
        action$.pipe(
            ofType(FETCH_SHOW_EPISODES),
            mergeMap(action =>
                PodcastApi.fetchAllShowEpisodes(action.payload)
                    .then(data => actions.fetchShowEpisodesFulfilled({ episodes: data, showId: action.payload }))
                    .catch(actions.fetchShowEpisodesRejected),
            ),
        );

    const clearErrorsEpic = action$ =>
        action$.pipe(
            ofType(actions.CREATE_SHOW),
            map(() => setErrors('form', [])),
        );

    const displayWarningEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.CREATE_SHOW),
            filter(() => !store.getState().form.createShow.values.coverArt),
            mapTo(displayShowArtWarning()),
        );

    const createShowWithCustomUrl = (action$, store) =>
        action$.pipe(
            ofType(actions.CREATE_SHOW, actions.CREATE_SHOW_WITHOUT_ART),
            filter(
                action =>
                    action.payload.customUrl &&
                    (store.getState().form.createShow.values.coverArt || action.payload.coverArt),
            ),
            mergeMap(action => {
                const { user } = store.getState().auth;
                return from(ShowsApi.checkCustomUrl(user.token, action.payload.customUrl)).pipe(
                    mergeMap(() => [submitShow(user.token, action.payload, user.id), hideShowArtWarning()]),
                    catchError(() => [
                        setErrors('form', ['The Custom URL has already been taken']),
                        hideShowArtWarning(),
                    ]),
                );
            }),
        );

    const createShowWithoutCustomUrl = (action$, store) =>
        action$.pipe(
            ofType(actions.CREATE_SHOW, actions.CREATE_SHOW_WITHOUT_ART),
            filter(
                action =>
                    !action.payload.customUrl &&
                    (store.getState().form.createShow.values.coverArt || action.payload.coverArt),
            ),
            mergeMap(action => {
                const { user } = store.getState().auth;
                return [submitShow(user.token, action.payload, user.id), hideShowArtWarning()];
            }),
        );

    const updateEpisodeEpic = (action$, store) =>
        action$.pipe(
            ofType(UPDATE_EPISODE),
            filter(action => !action.payload.data.file),
            switchMap(action =>
                PodcastApi.updateEpisode(store.getState().auth.token, action.payload.guid, action.payload.data)
                    .then(data => {
                        const { show, guid } = action.payload;
                        return updateEpisodeFulfilled({ show, guid, data });
                    })
                    .catch(updateEpisodeRejected),
            ),
        );

    const updateEpisodeWithAudioEpic = (action$, store) =>
        action$.pipe(
            ofType(UPDATE_EPISODE),
            filter(action => action.payload.data.file),
            pluck('payload'),
            switchMap(async ({ data, guid, show }) => {
                const { token, user } = store.getState().auth;

                const duration = await getDuration(URL.createObjectURL(data.file));
                const response = await request
                    .auth(token)
                    .fileUpload('fileupload', { blob: data.file, filename: `${user.id}${uuidv1()}.wav` });

                return PodcastApi.updateEpisode(token, guid, {
                    title: data.title,
                    description: data.description,
                    url: response.data.s3Url,
                    duration: duration / 1000,
                })
                    .then(res => {
                        return updateEpisodeFulfilled({ show, guid, data: res });
                    })
                    .catch(updateEpisodeRejected);
            }),
        );

    return combineEpics(
        clearErrorsEpic,
        displayWarningEpic,
        createShowWithCustomUrl,
        createShowWithoutCustomUrl,
        updateEpisodeEpic,
        updateEpisodeWithAudioEpic,
        fetchUserShowsEpic,
        fetchUserShowEpisodesEpic,
    );
}
