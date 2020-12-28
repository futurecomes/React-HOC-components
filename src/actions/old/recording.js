import { change } from 'redux-form'
import _isEmpty from 'lodash/isEmpty'

import { history } from 'src/shared/helpers/history'
import RecordingApi from 'src/api/recording'

export const CREATE_SESSION = 'CREATE_SESSION'
export const createSession = session => ({
    type: CREATE_SESSION,
    payload: session,
})
export const SET_RECORDING_NAME = 'SET_RECORDING_NAME'
export const setRecordingName = payload => ({
    type: SET_RECORDING_NAME,
    payload,
})

export const RECORDING_IS_SAVING = 'RECORDING_IS_SAVING'
export const RECORDING_IS_FETCHING = 'RECORDING_IS_FETCHING'
export const RECORDING_IS_FETCHING_DONE = 'RECORDING_IS_FETCHING_DONE'
export const RECORDING_FETCH_RECORDINGS = 'RECORDING_FETCH_RECORDINGS'
export function fetchRecordings(sessionId) {
    return (dispatch, getStore) => {
        const {
            auth: {
                token,
                user: { id },
            },
        } = getStore()
        RecordingApi.fetchRecordings(token, sessionId, id).then(res =>
            dispatch({
                type: RECORDING_FETCH_RECORDINGS,
                payload: res,
            }),
        )
    }
}

export const RECORDING_FETCH_FREE_MUSIC = 'RECORDING_FETCH_FREE_MUSIC'
export const fetchFreeMusic = sessionId => async (dispatch, getState) => {
    const {
        auth: {
            token,
            user: { id },
        },
        recording,
    } = getState()
    if (!_isEmpty(recording.freeMusic)) {
        return
    }
    const res = await RecordingApi.fetchFreeMusic(token, sessionId, id)
    dispatch({
        type: RECORDING_FETCH_FREE_MUSIC,
        payload: res,
    })
}

export const RECORDING_FETCH_SESSION = 'RECORDING_FETCH_SESSION'
export function fetchSession(id) {
    return (dispatch, getStore) => {
        dispatch({
            type: RECORDING_IS_FETCHING,
        })

        const {
            auth: { token },
        } = getStore()
        dispatch(fetchRecordings(id))

        RecordingApi.fetchSession(token, id).then(res =>
            dispatch({
                type: RECORDING_FETCH_SESSION,
                payload: res,
            }),
        )
    }
}

export const RECORDING_IS_FETCHING_ALL = 'RECORDING_IS_FETCHING_ALL'
export const RECORDING_FETCH_SESSIONS = 'RECORDING_FETCH_SESSIONS'
export function fetchSessions() {
    return (dispatch, getStore) => {
        dispatch({
            type: RECORDING_IS_FETCHING_ALL,
        })

        const {
            auth: {
                token,
                user: { id },
            },
        } = getStore()

        RecordingApi.fetchSessions(token, id).then(res =>
            dispatch({
                type: RECORDING_FETCH_SESSIONS,
                payload: res,
            }),
        )
    }
}

export const RECORDING_OPEN_SESSION = 'RECORDING_OPEN_SESSION'
export function openSession(id, name = '') {
    return async (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore()
        if (id) {
            return
        }
        if (name) {
            dispatch({
                type: RECORDING_IS_FETCHING,
            })
        }

        try {
            // eslint-disable-next-line
            if (location.pathname === '/create/record') {
                const session = await RecordingApi.createSession(token, name)
                dispatch({
                    type: RECORDING_OPEN_SESSION,
                    payload: session,
                })
                history.push(`/create/record/${session.id}`)
            } else {
                dispatch(fetchSessions())
            }
        } catch (err) {
            dispatch({
                type: RECORDING_IS_FETCHING_DONE,
            })
        }
    }
}

export const RECORDING_CLOSE_SESSION = 'RECORDING_CLOSE_SESSION'
export function closeSession() {
    return {
        type: RECORDING_CLOSE_SESSION,
    }
}

export const RECORDING_SET_SESSION_FORM = 'RECORDING_SET_SESSION_FORM'
export function setSessionForm(values) {
    return {
        type: RECORDING_SET_SESSION_FORM,
        payload: values,
    }
}

export const RECORDING_UPDATE_SESSION = 'RECORDING_UPDATE_SESSION'
export function updateSession(force = false) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
            recording: { session, form },
        } = getStore()

        if (!form.name) {
            if (!force && !session.name) {
                return
            }
        }

        dispatch({
            type: RECORDING_IS_SAVING,
        })

        RecordingApi.updateSession(token, { ...form, id: session.id })
            .then(res => {
                dispatch(fetchSessions())
                return dispatch({
                    type: RECORDING_UPDATE_SESSION,
                    payload: res,
                    meta: { success: true },
                })
            })
            // Patch failed updates
            .catch(() =>
                dispatch({
                    type: RECORDING_UPDATE_SESSION,
                    payload: session,
                    meta: { success: false },
                }),
            )
    }
}

export function saveSession() {
    return (dispatch, getStore) => {
        const {
            recording: {
                session: { name },
            },
        } = getStore()

        dispatch(setSessionForm({ name }))
        dispatch(updateSession(true))
    }
}

export const RECORDING_DELETE_SESSION = 'RECORDING_DELETE_SESSION'
export function deleteSession(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore()

        // eslint-disable-next-line
        if (!window.confirm("Are you sure you want to do this? This action can't be undone")) {
            return
        }

        RecordingApi.deleteSession(token, id).then(() =>
            dispatch({
                type: RECORDING_DELETE_SESSION,
                payload: id,
            }),
        )
    }
}

export const RECORDING_RECEIVED_WAVE_DATA = 'RECORDING_RECEIVED_WAVE_DATA'
export function receivedWaveData(data) {
    return {
        type: RECORDING_RECEIVED_WAVE_DATA,
        payload: data,
    }
}

export const RECORDING_START = 'RECORDING_START'
export function startRecording() {
    return {
        type: RECORDING_START,
    }
}

export const RECORDING_SAVED = 'RECORDING_SAVED'
export const START_UPLOADING = 'START_UPLOADING'
export function startUploading({ blob }) {
    return (dispatch, getState) => {
        const {
            auth: { token, user },
            recording: { recording, session },
        } = getState()

        dispatch({
            type: START_UPLOADING,
            payload: {
                token,
                blob,
                name: recording.name,
                userId: user.id,
                sessionId: session.id,
                duration: recording.stoppedAt - recording.startedAt,
            },
        })
    }
}

export const RECORDING_STOP = 'RECORDING_STOP'
export function stopListening(payload) {
    return {
        type: RECORDING_STOP,
        payload,
    }
}

export const RECORDING_TOGGLE_PLAY = 'RECORDING_TOGGLE_PLAY'
export function togglePlay(id) {
    return {
        type: RECORDING_TOGGLE_PLAY,
        payload: id,
    }
}

export const RECORDING_TOGGLE_FREE_PLAY = 'RECORDING_TOGGLE_FREE_PLAY'
export function toggleFreePlay(id) {
    return {
        type: RECORDING_TOGGLE_FREE_PLAY,
        payload: id,
    }
}

export const RECORDING_DELETE_RECORDING = 'RECORDING_DELETE_RECORDING'
export function deleteRecording(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore()

        RecordingApi.deleteRecording(token, id).then(() =>
            dispatch({
                type: RECORDING_DELETE_RECORDING,
                payload: id,
            }),
        )
    }
}

export const RECORDING_UPDATE = 'RECORDING_UPDATE'
export function updateRecording(recording) {
    return (dispatch, getStore) => {
        const {
            auth: {
                token,
                user: { id },
            },
        } = getStore()
        RecordingApi.updateRecording(token, recording, id).then(res =>
            dispatch({
                type: RECORDING_UPDATE,
                payload: res,
            }),
        )
    }
}

export const FREE_MUSIC_UPDATE = 'FREE_MUSIC_UPDATE'
export function updateFreeMusic(freeMusic) {
    return {
        type: FREE_MUSIC_UPDATE,
        payload: freeMusic,
    }
}

export const RECORDING_SET_INPUT_DEVICE = 'RECORDING_SET_INPUT_DEVICE'
export function setInputDevice(id) {
    return {
        type: RECORDING_SET_INPUT_DEVICE,
        payload: id,
    }
}

export const RECORDING_TOGGLE_MICCHECK = 'RECORDING_TOGGLE_MICCHECK'
export function toggleMicCheck(definitive) {
    return (dispatch, getStore) => {
        const {
            recording: { inputDeviceId },
            form: { miccheck },
        } = getStore()
        if (miccheck && miccheck.values.deviceId !== inputDeviceId) {
            dispatch(setInputDevice(miccheck.values.deviceId))
        }

        dispatch({
            type: RECORDING_TOGGLE_MICCHECK,
            payload: definitive,
        })
    }
}

export const RECORDING_INIT_FAILED = 'RECORDING_INIT_FAILED'
export function didFailToGetStream(err) {
    return dispatch => {
        dispatch({
            type: RECORDING_INIT_FAILED,
            payload: err,
        })

        dispatch(change('miccheck', 'deviceId', 0))
    }
}

export const RECORDING_INIT = 'RECORDING_INIT'
export function initRecorder() {
    return {
        type: RECORDING_INIT,
    }
}

export const RECORDING_RECEIVED_DEVICES = 'RECORDING_RECEIVED_DEVICES'
export function receivedInputDevices(list) {
    return (dispatch, getStore) => {
        const {
            recording: { inputDeviceId },
        } = getStore()

        if (list[0] && list[0].label === '') {
            dispatch(didFailToGetStream({ name: 'NotAllowedError' }))
            return
        }

        dispatch(change('miccheck', 'deviceId', list.findIndex(({ deviceId }) => deviceId === inputDeviceId)))

        dispatch({
            type: RECORDING_RECEIVED_DEVICES,
            payload: list,
        })
    }
}
