/* eslint-disable */
import cuid from 'cuid'
import _isEmpty from 'lodash/isEmpty'

import EditorApi from 'src/api/editor'
import RecordingApi from 'src/api/recording'
import { fetchRecordings, createSession } from './recording'
import { generatePolylinePoints } from 'src/shared/helpers/listGenerators'
import { fetchShowEpisodes } from 'src/actions/old'

export const EDITOR_TOGGLE_UPLOAD_MODAL = 'EDITOR_TOGGLE_UPLOAD_MODAL'
export function toggleUploadModal(definitive = null) {
    return {
        type: EDITOR_TOGGLE_UPLOAD_MODAL,
        payload: definitive,
    }
}

export const EDITOR_TOGGLE_DRAFT_MODAL = 'EDITOR_TOGGLE_DRAFT_MODAL'
export function toggleDraftModal(definitive = null) {
    return {
        type: EDITOR_TOGGLE_DRAFT_MODAL,
        payload: definitive,
    }
}

export const EDITOR_SELECTED_FILES = 'EDITOR_SELECTED_FILES'
export function selectedFiles(files) {
    return {
        type: EDITOR_SELECTED_FILES,
        payload: files,
    }
}

export const EDITOR_REMOVE_UPLOAD_FILE = 'EDITOR_REMOVE_UPLOAD_FILE'
export function removeUploadFile(idx) {
    return {
        type: EDITOR_REMOVE_UPLOAD_FILE,
        payload: idx,
    }
}

export const EDITOR_IS_UPLOADING = 'EDITOR_IS_UPLOADING'
export const EDITOR_UPLOADED_FILES = 'EDITOR_UPLOADED_FILES'
export const submitUploadFiles = sessionIdx => async (dispatch, getStore) => {
    const {
        auth: {
            token,
            user: { id },
        },
        recording: { sessions },
        editorMeta: { uploadFiles },
    } = getStore()

    dispatch({ type: EDITOR_IS_UPLOADING })
    let session = null
    if (_isEmpty(sessions)) {
        session = await RecordingApi.createSession(token, 'Upload')
        dispatch(createSession(session))
    }

    EditorApi.uploadFiles(token, id, session ? session.id : sessions[sessionIdx].id, uploadFiles).then(() => {
        dispatch({
            type: EDITOR_UPLOADED_FILES,
        })
        dispatch(uploadFileProgressFinished)
        dispatch(fetchRecordings())
    })
}

export const EDITOR_SET_EPISODE_NAME = 'EDITOR_SET_EPISODE_NAME'
export function setEpisodeName(name) {
    return {
        type: EDITOR_SET_EPISODE_NAME,
        payload: name,
    }
}

export const EDITOR_RESET = 'EDITOR_RESET'
export function resetEditor() {
    return {
        type: EDITOR_RESET,
    }
}

export const EDITOR_SET_EPISODE_DESCRIPTION = 'EDITOR_SET_EPISODE_DESCRIPTION'
export function setEpisodeDescription(description) {
    return {
        type: EDITOR_SET_EPISODE_DESCRIPTION,
        payload: description,
    }
}

export const EDITOR_SELECT_SHOW = 'EDITOR_SELECT_SHOW'
export function selectShow(idx) {
    return {
        type: EDITOR_SELECT_SHOW,
        payload: idx,
    }
}

export const EDITOR_FETCH_SHOWS = 'EDITOR_FETCH_SHOWS'
export function fetchShows(userId) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore()

        EditorApi.fetchShows(token, userId).then(res =>
            dispatch({
                type: EDITOR_FETCH_SHOWS,
                payload: res,
            }),
        )
    }
}

export const EDITOR_ADD_LAYER = 'EDITOR_ADD_LAYER'
export function addLayer(recordingOrSnippet) {
    // recordings are dropped to create a new layer - so a layer is always created with a recording
    const layerId = cuid()
    return {
        type: EDITOR_ADD_LAYER,
        recordingOrSnippet,
        layerId,
    }
}

// a recording has been moved on its own layer
export const EDITOR_MOVE_RECORDING_SNIPPET = 'EDITOR_MOVE_RECORDING_SNIPPET'
export function moveRecordingSnippet(recordingSnippet, newOffsetSeconds) {
    return {
        type: EDITOR_MOVE_RECORDING_SNIPPET,
        recordingSnippet,
        newOffsetSeconds,
    }
}

// a recording has been dragged to a different layer
export const EDITOR_SWITCH_RECORDING_SNIPPET = 'EDITOR_SWITCH_RECORDING_SNIPPET'
export function switchRecordingSnippet(snippetId, newLayerId) {
    return {
        type: EDITOR_SWITCH_RECORDING_SNIPPET,
        snippetId,
        newLayerId,
    }
}

function createActionAddRecordingSnippet(type) {
    return (recordingOrSnippet, layerId, timelineOffsetSeconds) => {
        const recordingSnippet = {
            frontendId: cuid(),
            name: recordingOrSnippet.name,
            recording: recordingOrSnippet.recording ? recordingOrSnippet.recording : recordingOrSnippet.id,
            url: recordingOrSnippet.url,
            duration: recordingOrSnippet.duration,
            isAd: recordingOrSnippet.isAd,
            layer: layerId,
            startOffset: 0,
            isFreeMusic: false,
            playDuration: recordingOrSnippet.duration / 1000,
            timelineOffset: timelineOffsetSeconds,
            points: generatePolylinePoints(120, 8),
            trim: {
                arrowLeft: 0,
                arrowRight: 0,
                higher: null,
                isTrimming: false,
            },
        }
        return {
            type,
            recordingSnippet,
        }
    }
}

export const EDITOR_ADD_RECORDING_SNIPPET = 'EDITOR_ADD_RECORDING_SNIPPET'
export const addRecordingSnippet = createActionAddRecordingSnippet(EDITOR_ADD_RECORDING_SNIPPET)

export const EDITOR_ADD_AD_RECORDING_SNIPPET = 'EDITOR_ADD_AD_RECORDING_SNIPPET'
export const addAdRecordingSnippet = createActionAddRecordingSnippet(EDITOR_ADD_AD_RECORDING_SNIPPET)

export function addFreeMusicSnippet(recordingOrSnippet, layerId, timelineOffsetSeconds) {
    const { duration } = recordingOrSnippet
    const recordingSnippet = {
        frontendId: cuid(),
        name: recordingOrSnippet.name,
        freeMusicId: recordingOrSnippet.id ? recordingOrSnippet.id : recordingOrSnippet.freeMusicId,
        recording: null,
        url: recordingOrSnippet.url,
        duration: duration,
        layer: layerId,
        startOffset: 0,
        isFreeMusic: true,
        playDuration: duration / 1000,
        timelineOffset: timelineOffsetSeconds,
        points: generatePolylinePoints(120, 8),
        trim: {
            arrowLeft: 0,
            arrowRight: 0,
            isTrimming: false,
            higher: null,
        },
    }
    return {
        type: EDITOR_ADD_RECORDING_SNIPPET,
        recordingSnippet,
    }
}

export const EDITOR_DELETE_RECORDING_SNIPPET = 'EDITOR_DELETE_RECORDING_SNIPPET'
export function deleteRecordingSnippet(recordingSnippet) {
    return {
        type: EDITOR_DELETE_RECORDING_SNIPPET,
        recordingSnippet,
    }
}

export const EDITOR_FADE_RECORDING_SNIPPET = 'EDITOR_FADE_RECORDING_SNIPPET'
export function fadeRecordingSnippet(frontendId, isFadeOut, fadeDuration) {
    return {
        type: EDITOR_FADE_RECORDING_SNIPPET,
        frontendId,
        isFadeOut,
        fadeDuration,
    }
}

export const EDITOR_UPDATE_RECORDING_SNIPPET = 'EDITOR_UPDATE_RECORDING_SNIPPET'
export function editorUpdateSnippet(recordingSnippet) {
    return {
        type: EDITOR_UPDATE_RECORDING_SNIPPET,
        recordingSnippet,
    }
}
// play the editor
export const EDITOR_SET_PLAY = 'EDITOR_SET_PLAY'
export function editorSetPlay() {
    return {
        type: EDITOR_SET_PLAY,
        playerStatus: 'play',
    }
}
// pause the editor
export const EDITOR_SET_PAUSE = 'EDITOR_SET_PAUSE'
export function editorSetPause() {
    return {
        type: EDITOR_SET_PAUSE,
        playerStatus: 'pause',
    }
}
// stop the editor
export const EDITOR_SET_STOP = 'EDITOR_SET_STOP'
export function editorSetStop() {
    return {
        type: EDITOR_SET_STOP,
        playerStatus: 'stop',
    }
}

export const EDITOR_SET_TIMELINE_TIME = 'EDITOR_SET_TIMELINE_TIME'
export function setTimelineTime(timeInSeconds) {
    return {
        type: EDITOR_SET_TIMELINE_TIME,
        newTime: timeInSeconds,
    }
}

export const EDITOR_INCREMENT_TIMELINE = 'EDITOR_INCREMENT_TIMELINE'

export const EDITOR_SET_SNIPPET_DURATION = 'EDITOR_SET_SNIPPET_DURATION'
export function setSnippetDuration(snippet, newDuration) {
    return {
        type: EDITOR_SET_SNIPPET_DURATION,
        snippet,
        newDuration,
    }
}

export const EDITOR_RECOMPUTE_TIMELINE_LENGTH = 'EDITOR_RECOMPUTE_TIMELINE_LENGTH'
export function recomputeTimelineLength(itemTimelineOffset) {
    return {
        type: EDITOR_RECOMPUTE_TIMELINE_LENGTH,
        itemTimelineOffset,
    }
}

export const EDITOR_SET_LAYER_VOLUME = 'EDITOR_SET_LAYER_VOLUME'
export function setLayerVolume(layerId, volume) {
    return {
        type: EDITOR_SET_LAYER_VOLUME,
        layerId,
        volume,
    }
}

export const EDITOR_CHANGE_ITEM_START_OFFSET = 'EDITOR_CHANGE_ITEM_START_OFFSET'
export function changeStartOffset(snippet, deltaSeconds) {
    return {
        type: EDITOR_CHANGE_ITEM_START_OFFSET,
        snippet,
        deltaSeconds,
    }
}

export const EDITOR_CHANGE_ITEM_PLAY_DURATION = 'EDITOR_CHANGE_ITEM_PLAY_DURATION'
export function changePlayDuration(snippet, deltaSeconds) {
    return {
        type: EDITOR_CHANGE_ITEM_PLAY_DURATION,
        snippet,
        deltaSeconds,
    }
}

export const EDITOR_SET_ZOOM = 'EDITOR_SET_ZOOM'
export function setZoom(pixelsPerSecond) {
    return {
        type: EDITOR_SET_ZOOM,
        pixelsPerSecond,
    }
}

export const EDITOR_PUBLISH = 'EDITOR_PUBLISH'
export function editorPublish(episodeName) {
    return {
        type: EDITOR_PUBLISH,
        episodeName,
    }
}

export const EDITOR_FINISH_PUBLISH = 'EDITOR_FINISH_PUBLISH'
export function editorFinishPublish() {
    return {
        type: EDITOR_FINISH_PUBLISH,
    }
}
export const EDITOR_SET_TRIM_MODE = 'EDITOR_SET_TRIM_MODE'
export function editorSetTrimMode(isTrimMode) {
    return {
        type: EDITOR_SET_TRIM_MODE,
        isTrimMode,
    }
}
export const EDITOR_SET_TRIM_X = 'EDITOR_SET_TRIM_X'
export function setTrimX(trim, snippet) {
    return {
        type: EDITOR_SET_TRIM_X,
        trim,
        snippet,
    }
}

export const EDITOR_TRIM_SELECTIONS = 'EDITOR_TRIM_SELECTIONS'
export function editorTrimSelections() {
    return {
        type: EDITOR_TRIM_SELECTIONS,
    }
}

export const EDITOR_RESET_PUBLISH = 'EDITOR_RESET_PUBLISH'
export function resetPublish() {
    return {
        type: EDITOR_RESET_PUBLISH,
    }
}

export const EDITOR_INITIALIZE = 'EDITOR_INITIALIZE'
export function editorInitialize() {
    return {
        type: EDITOR_INITIALIZE,
    }
}

export const EDITOR_FETCH_DRAFTS_FULFILLED = 'EDITOR_FETCH_DRAFTS_FULFILLED'
export const editorFetchDraftsFulfilled = payload => ({
    type: EDITOR_FETCH_DRAFTS_FULFILLED,
    payload,
})

export const EDITOR_SAVE_DRAFT = 'EDITOR_SAVE_DRAFT'
export function editorSaveDraft() {
    return {
        type: EDITOR_SAVE_DRAFT,
    }
}
export const EDITOR_CREATE_DRAFT = 'EDITOR_CREATE_DRAFT'
export function editorCreateDraft(payload) {
    return {
        type: EDITOR_CREATE_DRAFT,
        payload,
    }
}
export const EDITOR_FETCH_DRAFTS = 'EDITOR_FETCH_DRAFTS'
export function editorFetchDrafts() {
    return {
        type: EDITOR_FETCH_DRAFTS,
    }
}

export const EDITOR_DELETE_PODCAST = 'EDITOR_DELETE_PODCAST'
export function deletePodcast(podcast) {
    return (dispatch, getState) => {
        const {
            auth: { token, user },
        } = getState()
        if (podcast.guid === getState().audio.currentPodcast.guid) {
            window.audio.stop()
        }
        dispatch({ type: EDITOR_DELETE_PODCAST, payload: podcast })
        EditorApi.deletePodcast(token, podcast.guid).then(() => dispatch(fetchShowEpisodes(podcast.show)))
    }
}

export const EDITOR_SET_ERROR = 'EDITOR_SET_ERROR'
export function editorSetError(message) {
    return {
        type: EDITOR_SET_ERROR,
        message,
    }
}

export const EDITOR_DONE_LOADING = 'EDITOR_DONE_LOADING'
export function editorDoneLoading() {
    return {
        type: EDITOR_DONE_LOADING,
    }
}

export const UPLOAD_FILE_PROGRESS = 'UPLOAD_FILE_PROGRESS'
export const uploadFileProgress = percent => ({
    type: UPLOAD_FILE_PROGRESS,
    percent,
})

export const UPLOAD_FILE_PROGRESS_FINISHED = 'UPLOAD_FILE_PROGRESS_FINISHED'
export const uploadFileProgressFinished = {
    type: UPLOAD_FILE_PROGRESS_FINISHED,
}
