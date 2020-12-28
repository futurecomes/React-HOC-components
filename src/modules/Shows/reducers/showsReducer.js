import { FETCH_USER_SHOWS_FULFILLED } from 'src/actions/old';
import {
    SHOWS_TOGGLE_MODAL,
    SHOWS_TOGGLE_IMPORT_MODAL,
    SHOWS_IS_FETCHING,
    SHOWS_CREATE,
    SHOWS_UPDATE,
    SHOWS_IMPORT,
    SHOWS_DELETE_OK,
    SHOWS_FETCH_STATS,
    SHOWS_FETCH_LOCATION_STATS,
    DISPLAY_SHOW_ART_WARNING,
    HIDE_SHOW_ART_WARNING,
} from 'src/actions/old/shows';
import { FETCH_USER_SHOWS, EDIT_SHOW } from 'src/modules/old/Shows/actions';
import { SIGN_OUT_FULFILLED } from 'src/modules/Auth/actions/authActions';
import { EMAIL_VERIFICATION_FULFILLED } from 'src/modules/Auth/actions/auth';
import createReducer from 'src/reducers/createReducer';

const initialState = {
    list: [],
    isFetching: false,
    isModalOpen: false,
    modalType: '',
    editedShowId: null,
    isImportModalOpen: false,
    stats: [],
    locationStats: {},
    displayWarning: false,
    isLoadingShows: false,
    fetchedShows: false,
};

const handlers = {
    [EDIT_SHOW]: (state, action) => ({
        ...state,
        list: state.list.map(show => {
            if (show.id !== action.payload.showId) {
                return show;
            }

            return {
                ...show,
                ...action.payload.edit,
            };
        }),
    }),
    [HIDE_SHOW_ART_WARNING]: state => ({
        ...state,
        displayWarning: false,
    }),
    [DISPLAY_SHOW_ART_WARNING]: state => ({
        ...state,
        displayWarning: true,
    }),
    [SHOWS_IS_FETCHING]: (state, { payload }) => ({
        ...state,
        isFetching: payload,
    }),
    [SHOWS_TOGGLE_MODAL]: (state, { payload }) => ({
        ...state,
        isModalOpen: !state.isModalOpen,
        modalType: payload.type,
        editedShowId: payload.id,
    }),
    [SHOWS_TOGGLE_IMPORT_MODAL]: (state, { payload }) => ({
        ...state,
        isImportModalOpen: payload === null ? !state.isImportModalOpen : payload,
    }),
    [SHOWS_DELETE_OK]: (state, action) => ({
        ...state,
        isFetching: false,
        list: state.list.filter(show => show.id !== action.payload.id),
    }),
    [SHOWS_CREATE]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        isModalOpen: false,
        list: [payload, ...state.list],
    }),
    [SHOWS_IMPORT]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        isImportModalOpen: false,
        list: [payload, ...state.list],
    }),
    [SHOWS_UPDATE]: (state, { payload }) => {
        const updatedList = state.list.map(show => {
            if (show.id === payload.id) {
                return payload;
            }
            return show;
        });
        return {
            ...state,
            isFetching: false,
            isModalOpen: false,
            list: updatedList,
        };
    },
    [SHOWS_FETCH_STATS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        stats: payload,
    }),
    [SHOWS_FETCH_LOCATION_STATS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        locationStats: payload,
    }),
    [FETCH_USER_SHOWS]: state => ({
        ...state,
        isLoadingShows: !state.list.length,
    }),
    [FETCH_USER_SHOWS_FULFILLED]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        list: payload,
        isLoadingShows: false,
        fetchedShows: true,
    }),
    [EMAIL_VERIFICATION_FULFILLED]: state => ({
        ...state,
        fetchedShows: true,
    }),
    [SIGN_OUT_FULFILLED]: () => initialState,
};

export const shows = createReducer(handlers, initialState);
