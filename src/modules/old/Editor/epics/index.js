import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, map, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

import request from 'src/api/core';

import * as actions from '../actions';
import * as editorActions from 'src/actions/old/editor';
import { cleanPodcastName, processSnippets } from 'src/shared/helpers/audioprocessing';
import { createEpisodeAudio } from 'src/api/editor';
import { setAudioProcessingProgress } from 'src/middlewares/editor/handlers';
import { createPodcast } from 'src/modules/Podcasts/actions/oldPodcastsActions';

function getPublishProgress(token) {
    return Observable.create(observer => {
        const source = new EventSource(`/audio/process/${token}`);

        source.addEventListener('message', e => {
            const data = JSON.parse(e.data);
            observer.next(data);

            if (data.done || data.error) {
                source.close();
            }
        });
    });
}

export function editorEpicFactory() {
    const updateDraftEpisodeEpic = (action$, { getState }) =>
        action$.pipe(
            ofType(actions.EDITOR_UPDATE_DRAFT),
            mergeMap(action => {
                const { auth, editor, editorMeta } = getState();

                const draftItems = editor.present.layerRecordings.map(snippet => snippet.frontendId);

                return request
                    .put(`draft_episode/${action.payload}`, {
                        user: auth.user.id,
                        name: editorMeta.episodeName,
                        show: editorMeta.showIdx,
                        data: JSON.stringify({
                            ...editor.present,
                            draftItems,
                        }),
                    })
                    .then(res => actions.editorUpdateDraftFulfilled(res.data))
                    .catch(actions.editorUpdateDraftRejected);
            }),
        );

    const editorPublishEpisodeEpic = (action$, { getState }) =>
        action$.pipe(
            ofType(editorActions.EDITOR_PUBLISH),
            mergeMap(action => {
                const {
                    auth,
                    editor: { present },
                } = getState();
                cleanPodcastName(action.episodeName);
                const tasks = processSnippets(present.layerRecordings, present.layers, action.episodeName);
                return createEpisodeAudio(auth.token, auth.user.id, tasks).catch(editorActions.editorSetError);
            }),
            mergeMap(response =>
                getPublishProgress(response.data.token).pipe(
                    map(data => {
                        const isError = data.error;
                        if (isError) {
                            return editorActions.editorSetError(data.error);
                        }
                        if (!isError && !data.done) {
                            return setAudioProcessingProgress({
                                percentage: Math.floor(data.percentage),
                                message: data.message,
                            });
                        }
                        if (!isError && data.done) {
                            return createPodcast(data.res.outputUrl);
                        }
                    }),
                ),
            ),
        );

    const editorDoneLoadingEpic = action$ =>
        action$.pipe(
            ofType(editorActions.EDITOR_SET_ERROR),
            mapTo(editorActions.editorDoneLoading()),
        );

    const setDraftForSaveEpic = action$ =>
        action$.pipe(
            ofType(
                editorActions.EDITOR_ADD_RECORDING_SNIPPET,
                editorActions.EDITOR_MOVE_RECORDING_SNIPPET,
                editorActions.EDITOR_FADE_RECORDING_SNIPPET,
                editorActions.EDITOR_DELETE_RECORDING_SNIPPET,
                editorActions.EDITOR_SET_EPISODE_NAME,
                editorActions.EDITOR_TRIM_SELECTIONS,
            ),
            mapTo(actions.setDraftForSave()),
        );

    return combineEpics(updateDraftEpisodeEpic, editorPublishEpisodeEpic, editorDoneLoadingEpic, setDraftForSaveEpic);
}
