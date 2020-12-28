import { START_TIMER, STOP_TIMER } from 'redux-timer-middleware';
import cuid from 'cuid';
import { pick as _pick } from 'lodash';

import Howls from 'src/containers/editor/Howls';
import { createDraft } from 'src/api/editor';

import {
    EDITOR_ADD_LAYER,
    EDITOR_SET_PLAY,
    EDITOR_SET_PAUSE,
    EDITOR_SET_STOP,
    EDITOR_INCREMENT_TIMELINE,
    EDITOR_SET_TIMELINE_TIME,
    EDITOR_MOVE_RECORDING_SNIPPET,
    EDITOR_CHANGE_ITEM_START_OFFSET,
    EDITOR_TRIM_SELECTIONS,
    EDITOR_ADD_RECORDING_SNIPPET,
    EDITOR_DELETE_RECORDING_SNIPPET,
    EDITOR_CHANGE_ITEM_PLAY_DURATION,
    EDITOR_SAVE_DRAFT,
    addRecordingSnippet,
    addFreeMusicSnippet,
    switchRecordingSnippet,
    recomputeTimelineLength,
    moveRecordingSnippet,
    editorSetPause,
    setEpisodeName,
    setTimelineTime,
    editorUpdateSnippet,
    editorCreateDraft,
    editorSetError,
} from 'src/actions/old/editor';
import { DRAFT_REHYDRATE } from 'src/modules/old/Drafts/actions/actions';

export const timerInterval = 0.1;
/* eslint-disable */
function triggerTimelinePointer(action) {
    return (dispatch, getState) => {
        dispatch({
            type: START_TIMER,
            payload: {
                actionName: EDITOR_INCREMENT_TIMELINE,
                timerName: 'playTimer',
                timerInterval: timerInterval * 1000,
            },
        });
    };
}

function dispatchStopSideEffects(action) {
    return (dispatch, getState) => {
        Object.keys(Howls).map(key => {
            if (Howls[key]) {
                Howls[key].stop();
            }
        });
        dispatch(stopTimelinePointer(action));
        dispatch(setTimelineTime(0));
    };
}

function stopTimelinePointer(action) {
    return (dispatch, getState) => {
        dispatch({
            type: STOP_TIMER,
            payload: {
                timerName: 'playTimer',
            },
        });
    };
}

function pauseOnTimelineSet(action) {
    return (dispatch, getState) => {
        dispatch(editorSetPause());
    };
}

function dispatchMoveSideEffects(action) {
    return (dispatch, getState) => {
        dispatch(editorSetPause());
        setTimeout(
            () => dispatch(recomputeTimelineLength(action.recordingSnippet.playDuration + action.newOffsetSeconds)),
            200,
        );
    };
}

function autoAddOrSwitchRecordingSnippet(action) {
    return (dispatch, getState) => {
        const {
            editor: { present },
            billing: { currentPlan },
        } = getState();

        const adSnippet = present.layerRecordings.find(r => r.isAd);
        const adDuration = adSnippet ? adSnippet.playDuration : 0;
        const isPremium = /premium/i.test(currentPlan);
        const isOverlappingAd = action.recordingOrSnippet.timelineOffset < adDuration;

        const timelineOffset =
            !isPremium && isOverlappingAd ? adDuration : action.recordingOrSnippet.timelineOffset || 0;
        if (action.recordingOrSnippet.recording || action.recordingOrSnippet.isFreeMusic) {
            // It's already an snippet- just need to switch it
            dispatch(switchRecordingSnippet(action.recordingOrSnippet.frontendId, action.layerId));
        } else if (action.recordingOrSnippet.freeMusicId) {
            dispatch(addFreeMusicSnippet(action.recordingOrSnippet, action.layerId, timelineOffset));
        } else {
            dispatch(addRecordingSnippet(action.recordingOrSnippet, action.layerId, timelineOffset));
        }
    };
}

function recomputeTimelineOffset(action) {
    return (dispatch, getState) => {
        const newTimelineOffset = action.snippet.timelineOffset + action.deltaSeconds;
        dispatch(moveRecordingSnippet(action.snippet, newTimelineOffset));
    };
}

function recomputeLatestSnippet() {
    return (dispatch, getState) => {
        dispatch(recomputeTimelineLength());
    };
}
export const SET_AUDIO_PROCESSING_PROGRESS = 'SET_AUDIO_PROCESSING_PROGRESS';
export const setAudioProcessingProgress = payload => ({
    type: SET_AUDIO_PROCESSING_PROGRESS,
    payload,
});

const arrowsAtTheSamePosition = (arrowLeft, arrowRight, position) => arrowLeft === position && arrowRight === position;

function editorCutAudio(action) {
    return (dispatch, getState) => {
        const {
            editor: {
                present: { layerRecordings, pixelsPerSecond },
            },
        } = getState();
        layerRecordings
            .filter(
                snippet =>
                    !arrowsAtTheSamePosition(snippet.trim.arrowLeft, snippet.trim.arrowRight, 0) &&
                    !arrowsAtTheSamePosition(snippet.trim.arrowLeft, snippet.trim.arrowRight, snippet.playDuration) &&
                    (snippet.trim.arrowLeft !== 0 || snippet.trim.arrowRight !== snippet.playDuration),
            )
            .forEach(snippet => {
                const { arrowLeft, arrowRight } = snippet.trim;

                const start = arrowLeft;
                const end = arrowRight;

                const isExact = arrowLeft === arrowRight;
                const isTrimHidden = arrowLeft === 0 && arrowRight === snippet.playDuration;

                const x1 = isTrimHidden ? null : start;
                const x2 = isExact || isTrimHidden ? null : end;

                if (x1 === null && x2 === null) {
                    return;
                }

                let startTrimSeconds;
                let endTrimSeconds;
                if (x1 === null) {
                    startTrimSeconds = x2 / pixelsPerSecond;
                    endTrimSeconds = x2 / pixelsPerSecond;
                } else if (x2 === null) {
                    startTrimSeconds = x1 / pixelsPerSecond;
                    endTrimSeconds = x1 / pixelsPerSecond;
                } else {
                    startTrimSeconds = x1 < x2 ? x1 / pixelsPerSecond : x2 / pixelsPerSecond;
                    endTrimSeconds = x1 > x2 ? x1 / pixelsPerSecond : x2 / pixelsPerSecond;
                }
                //to split audio we create a copied new snippet with start offset at endTrimSeconds
                const recordingSnippet = {
                    ...snippet,
                    frontendId: cuid(),
                    timelineOffset: snippet.timelineOffset + endTrimSeconds,
                    startOffset: snippet.startOffset + endTrimSeconds,
                    playDuration:
                        snippet.playDuration - endTrimSeconds >= 0 ? snippet.playDuration - endTrimSeconds : 0,
                    trimmedPart: true,
                };

                dispatch({
                    type: EDITOR_ADD_RECORDING_SNIPPET,
                    recordingSnippet,
                });
                //and we trim the existing snippet to end at startTrimSeconds
                dispatch(
                    editorUpdateSnippet({
                        ...snippet,
                        playDuration: startTrimSeconds,
                        trimmedPart: true,
                    }),
                );
            });
    };
}

function saveDraftData() {
    return (dispatch, getState) => {
        const {
            auth: {
                token,
                user: { id },
            },
            editor: { present },
            editorMeta: { episodeName, showIdx },
            shows,
        } = getState();

        const draftItems = present.layerRecordings.map(snippet => snippet.frontendId);

        const draft = {
            user: id,
            name: episodeName,
            show: showIdx,
            data: JSON.stringify({
                ...present,
                draftItems,
            }),
        };
        createDraft(token, draft)
            .then(response => {
                const show = shows.list.find(show => show.id === response.show);
                const responseDraft = _pick(response, ['id', 'name', 'data', 'createdAt']);
                const openModal = !location.pathname.includes('editor');
                dispatch(editorCreateDraft({ draft: { ...responseDraft, showTitle: show.title }, openModal }));
            })
            .catch(error => {
                console.log(error);
                dispatch(editorSetError('Draft creation failed.'));
            });
    };
}

function rehydrateName(action) {
    return (dispatch, getState) => {
        dispatch(setEpisodeName(action.draft.name));
    };
}

export const handlers = {
    [EDITOR_ADD_LAYER]: autoAddOrSwitchRecordingSnippet,
    [EDITOR_SET_PLAY]: triggerTimelinePointer,
    [EDITOR_SET_PAUSE]: stopTimelinePointer,
    [EDITOR_SET_STOP]: dispatchStopSideEffects,
    [EDITOR_SET_TIMELINE_TIME]: pauseOnTimelineSet,
    [EDITOR_MOVE_RECORDING_SNIPPET]: dispatchMoveSideEffects,
    [EDITOR_CHANGE_ITEM_START_OFFSET]: recomputeTimelineOffset,
    [EDITOR_TRIM_SELECTIONS]: editorCutAudio,
    [EDITOR_ADD_RECORDING_SNIPPET]: recomputeLatestSnippet,
    [EDITOR_CHANGE_ITEM_PLAY_DURATION]: recomputeLatestSnippet,
    [EDITOR_DELETE_RECORDING_SNIPPET]: recomputeLatestSnippet,
    [EDITOR_SAVE_DRAFT]: saveDraftData,
    [DRAFT_REHYDRATE]: rehydrateName,
};
