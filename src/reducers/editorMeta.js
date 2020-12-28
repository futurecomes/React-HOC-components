import createReducer from './createReducer';

import {
    EDITOR_TOGGLE_UPLOAD_MODAL,
    EDITOR_TOGGLE_DRAFT_MODAL,
    EDITOR_SELECTED_FILES,
    EDITOR_REMOVE_UPLOAD_FILE,
    EDITOR_UPLOADED_FILES,
    EDITOR_IS_UPLOADING,
    EDITOR_SET_EPISODE_NAME,
    EDITOR_SET_EPISODE_DESCRIPTION,
    EDITOR_SELECT_SHOW,
    EDITOR_SET_PLAY,
    EDITOR_SET_PAUSE,
    EDITOR_SET_STOP,
    EDITOR_PUBLISH,
    EDITOR_FINISH_PUBLISH,
    EDITOR_SET_TRIM_MODE,
    EDITOR_RESET_PUBLISH,
    EDITOR_CREATE_DRAFT,
    EDITOR_SAVE_DRAFT,
    EDITOR_DONE_LOADING,
    EDITOR_SET_ERROR,
    EDITOR_INITIALIZE,
    UPLOAD_FILE_PROGRESS,
    UPLOAD_FILE_PROGRESS_FINISHED,
} from 'src/actions/old/editor';
import { SET_AUDIO_PROCESSING_PROGRESS } from 'src/middlewares/editor/handlers';
import {
    FETCH_DRAFTS_FULFILLED,
    DRAFT_REHYDRATE,
    START_LOADING_FETCH_DRAFTS,
    DELETE_DRAFT_FULFILLED,
    CLOSE_MODAL_DRAFT,
} from 'src/modules/old/Drafts/actions/actions';
import {
    EDITOR_UPDATE_DRAFT_FULFILLED,
    EDITOR_UPDATE_DRAFT,
    SET_DRAFT_FOR_SAVE,
    CLEAR_EPISODE_EDITION,
    ON_DATE_CHANGE,
    ON_RELEASE_CHANGE,
} from 'src/modules/old/Editor/actions';

const initialState = {
    isUploadOpen: false,
    isSaveDraftOpen: false,
    uploadFiles: [],
    isUploading: false,
    playerStatus: 'stop',
    episodeName: '',
    episodeDescription: '',
    release: 'now',
    releaseDate: null,
    showIdx: -1,
    isPublishing: false,
    didPublish: false,
    isTrimMode: false,
    errorMessage: null,
    drafts: {
        data: [],
        isLoading: false,
        isEmpty: null,
        fetched: false,
        isModalOpen: false,
        isSaving: false,
        saved: true,
    },
    id: null,
    currentTimelineTime: 0,
    progress: {
        percentage: 0,
        message: '',
    },
    uploadFileProgress: 0,
};

const handlers = {
    [ON_RELEASE_CHANGE]: (state, action) => ({
        ...state,
        release: action.payload,
    }),
    [ON_DATE_CHANGE]: (state, action) => ({
        ...state,
        releaseDate: action.payload,
    }),
    [CLEAR_EPISODE_EDITION]: state => ({
        ...initialState,
        drafts: {
            ...state.drafts,
            isModalOpen: state.drafts.data.length !== 0,
        },
    }),
    [SET_DRAFT_FOR_SAVE]: state => ({
        ...state,
        drafts: {
            ...state.drafts,
            saved: false,
        },
    }),
    [EDITOR_UPDATE_DRAFT]: state => ({
        ...state,
        drafts: {
            ...state.drafts,
            isSaving: true,
        },
    }),
    [EDITOR_UPDATE_DRAFT_FULFILLED]: (state, action) => ({
        ...state,
        drafts: {
            ...state.drafts,
            isSaving: false,
            saved: true,
            data: state.drafts.data.map(draft => {
                if (draft.id !== action.payload.id) {
                    return draft;
                }
                return {
                    ...draft,
                    name: action.payload.name,
                    data: action.payload.data,
                };
            }),
        },
    }),
    [CLOSE_MODAL_DRAFT]: state => ({
        ...state,
        drafts: {
            ...state.drafts,
            isModalOpen: false,
        },
    }),
    [DELETE_DRAFT_FULFILLED]: (state, action) => {
        const filtered = state.drafts.data.filter(d => d.id !== action.payload);
        return {
            ...state,
            drafts: {
                ...state.drafts,
                data: filtered,
                isEmpty: filtered.length === 0,
                isModalOpen: filtered.length !== 0,
            },
        };
    },
    [START_LOADING_FETCH_DRAFTS]: state => ({
        ...state,
        drafts: {
            ...state.drafts,
            isLoading: true,
        },
    }),
    [FETCH_DRAFTS_FULFILLED]: (state, action) => ({
        ...state,
        drafts: {
            ...state.drafts,
            data: action.payload,
            isLoading: false,
            isEmpty: action.payload.length === 0,
            fetched: true,
            isModalOpen: action.payload.length !== 0,
        },
    }),
    [EDITOR_TOGGLE_UPLOAD_MODAL]: (state, { payload }) => ({
        ...state,
        isUploadOpen: payload === null ? !state.isUploadOpen : payload,
    }),
    [EDITOR_TOGGLE_DRAFT_MODAL]: (state, { payload }) => ({
        ...state,
        isSaveDraftOpen: payload === null ? !state.isSaveDraftOpen : payload,
    }),
    [EDITOR_SELECTED_FILES]: (state, { payload }) => ({
        ...state,
        uploadFiles: state.uploadFiles.concat(payload),
    }),
    [EDITOR_REMOVE_UPLOAD_FILE]: (state, { payload }) => ({
        ...state,
        uploadFiles: state.uploadFiles.filter((__, idx) => idx !== payload),
    }),
    [EDITOR_IS_UPLOADING]: state => ({
        ...state,
        isUploading: true,
    }),
    [EDITOR_UPLOADED_FILES]: state => ({
        ...state,
        uploadFiles: [],
        isUploadOpen: false,
        isUploading: false,
    }),
    [EDITOR_SET_EPISODE_NAME]: (state, { payload }) => ({
        ...state,
        episodeName: payload,
    }),
    [EDITOR_SET_EPISODE_DESCRIPTION]: (state, { payload }) => ({
        ...state,
        episodeDescription: payload,
    }),
    [EDITOR_SELECT_SHOW]: (state, { payload }) => ({
        ...state,
        showIdx: payload,
    }),
    [EDITOR_SET_PLAY]: (state, { playerStatus }) => ({
        ...state,
        playerStatus,
    }),
    [EDITOR_SET_PAUSE]: (state, { playerStatus }) => ({
        ...state,
        playerStatus,
    }),
    [EDITOR_SET_STOP]: (state, { playerStatus }) => ({
        ...state,
        playerStatus,
        currentTimelineTime: 0,
    }),
    [EDITOR_PUBLISH]: state => ({
        ...state,
        isPublishing: true,
    }),
    [EDITOR_DONE_LOADING]: state => ({
        ...state,
        isPublishing: false,
    }),
    [EDITOR_FINISH_PUBLISH]: () => ({
        ...initialState,
        isPublishing: false,
        didPublish: true,
        progress: initialState.progress,
    }),
    [EDITOR_RESET_PUBLISH]: state => ({
        ...state,
        isPublishing: false,
        didPublish: false,
    }),
    [EDITOR_INITIALIZE]: () => ({
        ...initialState,
    }),
    [EDITOR_SET_TRIM_MODE]: (state, { isTrimMode }) => ({
        ...state,
        isTrimMode,
    }),
    [EDITOR_SAVE_DRAFT]: state => ({
        ...state,
        isUploading: true,
    }),
    [SET_AUDIO_PROCESSING_PROGRESS]: (state, action) => ({
        ...state,
        progress: action.payload,
    }),
    [EDITOR_SET_ERROR]: (state, { message }) => ({
        ...state,
        errorMessage: message,
    }),
    [EDITOR_CREATE_DRAFT]: (state, { payload }) => {
        const filtered = state.drafts.data.filter(thisDraft => thisDraft.id !== payload.draft.id);
        const data = [payload.draft, ...filtered];
        return {
            ...state,
            episodeName: payload.draft.name,
            id: payload.draft.id,
            showIdx: payload.draft.show,
            isSaveDraftOpen: false,
            drafts: {
                ...state.drafts,
                data,
                isEmpty: data.length === 0,
                isModalOpen: payload.openModal,
                saved: true,
            },
            isUploading: false,
        };
    },
    [DRAFT_REHYDRATE]: (state, action) => ({
        ...state,
        drafts: {
            ...state.drafts,
            isModalOpen: false,
            saved: true,
        },
        id: action.draft.id,
        episodeName: action.draft.name,
        showIdx: action.draft.show,
    }),
    [UPLOAD_FILE_PROGRESS]: (state, { percent }) => ({
        ...state,
        uploadFileProgress: percent,
    }),
    [UPLOAD_FILE_PROGRESS_FINISHED]: state => ({
        ...state,
        uploadFileProgress: initialState.uploadFileProgress,
    }),
};

export default createReducer(handlers, initialState);
