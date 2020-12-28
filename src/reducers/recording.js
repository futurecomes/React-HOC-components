import { REHYDRATE } from 'redux-persist/constants';

import * as recordingActions from 'src/actions/old/recording';
import { BUY_MUSIC_ITEMS_FULFILLED, BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED } from 'src/shared/components/old/Billing/actions';
import * as actions from 'src/modules/old/Recording/actions/actions';
import { CLEAR_EPISODE_EDITION } from 'src/modules/old/Editor/actions';
import { VIP_EXTRAS_PAYMENT_FULFILLED } from 'src/modules/old/VipExtras/actions';
import { changeUrl } from 'src/shared/helpers/changeS3Url';

import createReducer from './createReducer';

const initialState = {
    recordings: [],
    freeMusic: [],
    sessions: [],
    session: {},
    form: {},
    recording: {
        name: '',
        startedAt: null,
        stoppedAt: null,
        progress: 0,
    },
    waveData: { lineTo: 0, data: [] },
    multiPart: {
        uploadId: null,
        map: {
            Parts: [],
        },
        chunksToUpload: [],
        allChunks: [],
        uploadedChunks: 0,
        numberOfChunks: 0,
        fileKey: null,
    },
    timeCounter: null,
    playingId: -1,
    isFreeMusicPlaying: false,
    isSaving: false,
    isFetching: false,
    isFetchingAll: false,
    isRecording: false,
    isMicCheck: false,
    isInitial: true,
    isLoading: false,
    inputDeviceId: 'default',
    devices: [],
    error: '',
};

const noDevices = [{ label: 'No Input Detected', deviceId: '', isNoInput: true }];
const notAllowedDevices = [{ label: 'Permission Denied', deviceId: '', isNoInput: true }];

// Action Handlers
const handlers = {
    [actions.COMPLETE_MULTIPART_UPLOAD_REJECTED]: (state, action) => ({
        ...state,
        error: action.payload,
    }),
    [actions.INSTANTIATE_MULTIPART_REJECTED]: (state, action) => ({
        ...state,
        error: action.payload,
    }),
    [actions.UPLOAD_BLOB_REJECTED]: (state, action) => ({
        ...state,
        error: action.payload,
        isSaving: false,
        isRecording: false,
    }),
    [actions.INSTANTIATE_MULTIPART]: state => ({
        ...state,
        isLoading: true,
        multiPart: initialState.multiPart,
    }),
    [actions.STOP_TIME_COUNTER]: state => ({
        ...state,
        timeCounter: null,
        isRecording: true,
        recording: {
            ...state.recording,
            startedAt: Date.now(),
            stoppedAt: null,
        },
    }),
    [actions.INCREMENT_TIME_COUNTER]: state => ({
        ...state,
        timeCounter: state.timeCounter + 1,
    }),
    [actions.INSTANTIATE_MULTIPART_FULFILLED]: (state, action) => ({
        ...state,
        error: '',
        isLoading: false,
        timeCounter: -1,
        multiPart: {
            ...state.multiPart,
            uploadId: action.payload.uploadId,
            fileKey: action.payload.fileKey,
        },
    }),
    [actions.UPLOAD_BLOB]: state => ({
        ...state,
        multiPart: {
            ...state.multiPart,
            chunksToUpload: [],
            numberOfChunks: state.multiPart.numberOfChunks + 1,
        },
    }),
    [actions.UPLOAD_BLOB_FULFILLED]: (state, action) => ({
        ...state,
        error: '',
        multiPart: {
            ...state.multiPart,
            uploadedChunks: state.multiPart.uploadedChunks + 1,
            map: {
                Parts: [...state.multiPart.map.Parts, action.payload],
            },
        },
    }),
    [actions.EMIT_CHUNK]: (state, action) => ({
        ...state,
        multiPart: {
            ...state.multiPart,
            chunksToUpload: [...state.multiPart.chunksToUpload, action.payload],
            allChunks: [...state.multiPart.chunksToUpload, action.payload],
        },
    }),
    [recordingActions.RECORDING_IS_FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [recordingActions.RECORDING_IS_FETCHING_DONE]: state => ({
        ...state,
        isFetching: false,
    }),
    [recordingActions.RECORDING_IS_FETCHING_ALL]: state => ({
        ...state,
        isFetchingAll: true,
    }),
    [recordingActions.RECORDING_OPEN_SESSION]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        isSession: true,
        session: payload,
    }),
    [recordingActions.RECORDING_CLOSE_SESSION]: state => ({
        ...state,
        isRecording: false,
        isSession: false,
        recordings: [],
        recording: initialState.recording,
        session: {},
        form: {},
        error: '',
    }),
    [actions.SET_RECORDING_PROGESS]: (state, { payload }) => ({
        ...state,
        recording: {
            ...state.recording,
            progress: payload,
        },
    }),
    [recordingActions.SET_RECORDING_NAME]: (state, { payload }) => ({
        ...state,
        recording: {
            ...state.recording,
            name: payload,
        },
    }),
    [recordingActions.RECORDING_SET_SESSION_FORM]: (state, { payload }) => ({
        ...state,
        form: {
            ...state.form,
            ...payload,
        },
    }),
    [recordingActions.RECORDING_UPDATE_SESSION]: (state, { payload }) => ({
        ...state,
        session: payload,
        isSaving: false,
        form: {},
    }),
    [recordingActions.RECORDING_FETCH_SESSION]: (state, { payload }) => ({
        ...state,
        session: payload,
        form: {},
        isFetching: false,
        isSession: true,
    }),
    [recordingActions.CREATE_SESSION]: (state, { payload }) => ({
        ...state,
        sessions: [...state.sessions, payload],
    }),
    [recordingActions.RECORDING_FETCH_SESSIONS]: (state, { payload }) => ({
        ...state,
        sessions: payload,
        isFetchingAll: false,
    }),
    [recordingActions.RECORDING_DELETE_SESSION]: (state, { payload }) => ({
        ...state,
        sessions: state.sessions.filter(({ id }) => id !== payload),
    }),
    [recordingActions.RECORDING_FETCH_RECORDINGS]: (state, { payload }) => ({
        ...state,
        recordings: payload.map(changeUrl),
    }),
    [recordingActions.RECORDING_FETCH_FREE_MUSIC]: (state, { payload }) => ({
        ...state,
        freeMusic: Array.isArray(payload)
            ? payload.map(freeAudio => ({
                  ...freeAudio,
                  duration: Math.round(freeAudio.duration / 1000) * 1000 || 0,
              }))
            : [],
    }),
    [recordingActions.RECORDING_START]: state => ({
        ...state,
        timeCounter: -1,
        multiPart: initialState.multiPart,
    }),
    [recordingActions.RECORDING_STOP]: (state, action) => ({
        ...state,
        isRecording: false,
        isSaving: true,
        recording: {
            ...state.recording,
            stoppedAt: action.payload,
        },
    }),
    [recordingActions.START_UPLOADING]: state => ({
        ...state,
        isRecording: false,
        isSaving: true,
    }),
    [actions.SAVE_RECORDING_FILE_FULFILLED]: (state, { payload }) => ({
        ...state,
        isSaving: false,
        error: '',
        recording: initialState.recording,
        recordings: [payload, ...state.recordings],
    }),
    [actions.SAVE_RECORDING_FILE_REJECTED]: state => ({
        ...state,
        recording: initialState.recording,
        isSaving: false,
    }),
    [recordingActions.RECORDING_IS_SAVING]: state => ({
        ...state,
        isSaving: true,
    }),
    [recordingActions.RECORDING_RECEIVED_WAVE_DATA]: (state, { payload }) => ({
        ...state,
        waveData: payload,
    }),
    [recordingActions.RECORDING_TOGGLE_PLAY]: (state, { payload }) => {
        if (state.isFreeMusicPlaying) {
            return {
                ...state,
                isFreeMusicPlaying: false,
                playingId: payload,
            };
        }
        return {
            ...state,
            isFreeMusicPlaying: false,
            playingId: state.playingId === payload ? initialState.playingId : payload,
        };
    },
    [recordingActions.RECORDING_TOGGLE_FREE_PLAY]: (state, { payload }) => {
        if (state.isFreeMusicPlaying) {
            return {
                ...state,
                isFreeMusicPlaying: true,
                playingId: state.playingId === payload ? initialState.playingId : payload,
            };
        }
        return {
            ...state,
            isFreeMusicPlaying: true,
            playingId: payload,
        };
    },
    [CLEAR_EPISODE_EDITION]: state => ({
        ...state,
        isFreeMusicPlaying: false,
        playingId: initialState.playingId,
    }),
    [recordingActions.RECORDING_DELETE_RECORDING]: (state, { payload }) => ({
        ...state,
        recordings: state.recordings.filter(({ id }) => id !== payload),
    }),
    [recordingActions.RECORDING_UPDATE]: (state, { payload }) => ({
        ...state,
        recordings: state.recordings.map(r => (r.id === payload.id ? payload : r)),
    }),
    [recordingActions.FREE_MUSIC_UPDATE]: (state, { payload }) => ({
        ...state,
        freeMusic: state.freeMusic.map(r => (r.id === payload.id ? { ...r, duration: payload.duration } : r)),
    }),
    [recordingActions.RECORDING_TOGGLE_MICCHECK]: (state, { payload }) => ({
        ...state,
        isMicCheck: typeof payload === 'undefined' ? !state.isMicCheck : payload,
    }),
    [recordingActions.RECORDING_SET_INPUT_DEVICE]: (state, { payload }) => ({
        ...state,
        inputDeviceId: state.devices[payload] ? state.devices[payload].deviceId : initialState.inputDeviceId,
    }),
    [recordingActions.RECORDING_RECEIVED_DEVICES]: (state, { payload }) => ({
        ...state,
        devices: payload.length === 0 ? noDevices : payload,
    }),
    [recordingActions.RECORDING_INIT]: state => ({
        ...state,
        isMicCheck: false,
    }),
    [recordingActions.RECORDING_INIT_FAILED]: (state, { payload: { name } }) => ({
        ...state,
        isMicCheck: true,
        devices: name === 'NotAllowedError' ? notAllowedDevices : noDevices,
        inputDeviceId: '',
    }),
    [actions.SHOW_RECORDING_ERROR_MESSAGE]: (state, action) => ({
        ...state,
        multiPart: initialState.multiPart,
        isLoading: false,
        isRecording: false,
        error: `Error! ${action.payload} ${action.error}`,
    }),
    [BUY_MUSIC_ITEMS_FULFILLED]: (state, action) => ({
        ...state,
        freeMusic: state.freeMusic.map(f => {
            if (!action.payload.musicLibraryItems.includes(f.id)) {
                return f;
            }

            return {
                ...f,
                paid: true,
            };
        }),
    }),
    [BUY_MUSIC_LIBRARY_TOTAL_ACCESS_FULFILLED]: state => ({
        ...state,
        freeMusic: state.freeMusic.map(f => ({ ...f, paid: true })),
    }),

    [VIP_EXTRAS_PAYMENT_FULFILLED]: (state, action) => {
        const { musicLibrarySongs, musicLibraryAccess } = action.payload;
        return {
            ...state,
            freeMusic: musicLibrarySongs
                ? state.freeMusic.map(m => {
                      if (!musicLibrarySongs.map(x => x.id).includes(m.id)) {
                          return m;
                      }
                      return {
                          ...m,
                          paid: true,
                      };
                  })
                : musicLibraryAccess
                ? state.freeMusic.map(m => ({ ...m, paid: true }))
                : state.freeMusic,
        };
    },
    [REHYDRATE]: (_state, { payload }) => ({
        ...initialState,
        inputDeviceId: payload.recording ? payload.recording.inputDeviceId : initialState.inputDeviceId,
    }),
};

export default createReducer(handlers, initialState);
