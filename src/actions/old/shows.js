import { omit } from 'lodash/fp';

import ShowsApi from 'src/api/shows';

import { setErrors } from './messages';

export const SHOWS_IS_FETCHING = 'SHOWS_IS_FETCHING';
export function setIsFetching(isFetching = true) {
    return {
        type: SHOWS_IS_FETCHING,
        payload: isFetching,
    };
}

export const SHOWS_FETCH_STATS = 'SHOWS_FETCH_STATS';
export function fetchShowStats(params) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch(setIsFetching());

        ShowsApi.fetchShowStats(token, params).then(res =>
            dispatch({
                type: SHOWS_FETCH_STATS,
                payload: res,
            }),
        );
    };
}

export const SHOWS_FETCH_LOCATION_STATS = 'SHOWS_FETCH_LOCATION_STATS';
export function fetchShowLocationStats(id, params) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch(setIsFetching());

        ShowsApi.fetchShowLocationStats(token, id, params).then(res =>
            dispatch({
                type: SHOWS_FETCH_LOCATION_STATS,
                payload: res,
            }),
        );
    };
}

export const SHOWS_TOGGLE_MODAL = 'SHOWS_TOGGLE_MODAL';
export function toggleModal(definitive) {
    return {
        type: SHOWS_TOGGLE_MODAL,
        payload: definitive,
    };
}

export const SHOWS_TOGGLE_IMPORT_MODAL = 'SHOWS_TOGGLE_IMPORT_MODAL';
export function toggleImportModal(definitive) {
    return {
        type: SHOWS_TOGGLE_IMPORT_MODAL,
        payload: definitive,
    };
}

const stripCategoriesFields = omit(['category1', 'category2', 'category3']);
export function buildShow(form) {
    return stripCategoriesFields({
        ...form,
        categories: [form.category1, form.category2, form.category3],
    });
}

export const SHOWS_CREATE = 'SHOWS_CREATE';
export function submitShow(token, show, user) {
    return dispatch => {
        dispatch(setIsFetching());
        ShowsApi.create(token, show, user)
            .then(res =>
                dispatch({
                    type: SHOWS_CREATE,
                    payload: res,
                }),
            )
            .catch(err => {
                dispatch(setIsFetching(false));
                dispatch(setErrors('form', [err.reason]));
            });
    };
}

export const SHOWS_UPDATE = 'SHOWS_UPDATE';
function submitUpdateShow(dispatch, token, show, user) {
    return ShowsApi.update(token, show, user)
        .then(res =>
            dispatch({
                type: SHOWS_UPDATE,
                payload: res,
            }),
        )
        .catch(err => dispatch(setErrors('form', [err])));
}

export const DISPLAY_SHOW_ART_WARNING = 'DISPLAY_SHOW_ART_WARNING';
export const displayShowArtWarning = () => ({
    type: DISPLAY_SHOW_ART_WARNING,
});

export const HIDE_SHOW_ART_WARNING = 'HIDE_SHOW_ART_WARNING';
export const hideShowArtWarning = () => ({
    type: HIDE_SHOW_ART_WARNING,
});

export const editShow = form => (dispatch, getState) => {
    dispatch(setIsFetching());
    dispatch(setErrors('form', []));

    const {
        auth: {
            token,
            user: { id },
        },
        shows: { list },
    } = getState();
    const oldShow = list.find(show => show.id === form.id);
    const show = buildShow(form);

    if (show.customUrl && show.customUrl !== oldShow.customUrl) {
        ShowsApi.checkCustomUrl(token, show.customUrl)
            .then(() => submitUpdateShow(dispatch, token, show, id))
            .catch(() => {
                dispatch(setErrors('form', ['The Custom URL has already been taken']));
                dispatch(setIsFetching(false));
            });
    } else {
        submitUpdateShow(dispatch, token, show, id);
    }
};

export const SHOWS_DELETE = 'SHOWS_DELETE';
export const SHOWS_DELETE_OK = 'SHOWS_DELETE_OK';
export function deleteShow(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch(setIsFetching());
        ShowsApi.deleteShow(token, id)
            .then(([res]) => {
                dispatch({
                    type: SHOWS_DELETE_OK,
                    payload: res,
                });
            })
            .catch(() => dispatch(setIsFetching(false)));
    };
}

export const SHOWS_IMPORT = 'SHOWS_IMPORT';
function submitImportShow(dispatch, token, show, user) {
    return ShowsApi.imports(token, show, user)
        .then(res =>
            dispatch({
                type: SHOWS_IMPORT,
                payload: res,
            }),
        )
        .catch(err => {
            dispatch(setErrors('form', [err.reason]));
            dispatch(setIsFetching(false));
        });
}

export function importShow(form) {
    return (dispatch, getStore) => {
        dispatch(setIsFetching());
        dispatch(setErrors('form', []));

        const {
            auth: {
                token,
                user: { id },
            },
        } = getStore();

        const show = buildShow(form);
        if (show.customUrl) {
            ShowsApi.checkCustomUrl(token, show.customUrl)
                .then(() => submitImportShow(dispatch, token, show, id))
                .catch(() => {
                    dispatch(setErrors('form', ['The Custom URL has already been taken']));
                    dispatch(setIsFetching(false));
                });
        } else {
            submitImportShow(dispatch, token, show, id);
        }
    };
}
