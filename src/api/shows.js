import request from './core';

function fetchUserShows(token, createdBy) {
    return request
        .auth(token)
        .get('show', { createdBy })
        .then(({ data }) => data);
}

function fetchCustomUrl(token, customUrl) {
    return request
        .auth(token)
        .get('show', { customUrl })
        .then(({ data }) => data);
}

function fetchShowStats(token, params) {
    return request
        .auth(token)
        .get('subscription_history', params)
        .then(({ data }) => data);
}

function deleteShow(token, id) {
    return request
        .auth(token)
        .delete(`show/${id}`)
        .then(({ data }) => data);
}

function fetchShowLocationStats(token, id, params) {
    return request
        .auth(token)
        .get(`show/${id}/locations`, params)
        .then(({ data }) => data);
}

function checkCustomUrl(...args) {
    return new Promise((resolve, reject) =>
        fetchCustomUrl(...args).then(res => (res.length === 0 ? resolve() : reject())),
    );
}

function create(token, show, userId) {
    const coverArt = show.coverArt;
    delete show.coverArt;

    function createShow(file) {
        const showPayload = { ...show };
        if (file && file.data) {
            showPayload.imageUrl = file.data.s3Url;
        }

        return request
            .auth(token)
            .post('show', showPayload)
            .then(({ data }) => data);
    }

    if (coverArt && coverArt !== 'default') {
        return request
            .auth(token)
            .fileUpload('fileupload', {
                blob: coverArt.file,
                filename: `${userId}${Date.now()}.${coverArt.file.type.replace(/image\//, '')}`,
            })
            .then(createShow);
    }

    return createShow();
}

function update(token, updatedShow, userId) {
    const coverArt = updatedShow.coverArt;
    delete updatedShow.coverArt;

    const updateShow = file => {
        const showData = { ...updatedShow };
        if (file && file.data) {
            showData.imageUrl = file.data.s3Url;
        }

        return request
            .auth(token)
            .put(`show/${updatedShow.id}`, showData)
            .then(({ data }) => data);
    };

    if (coverArt && coverArt !== 'default') {
        return request
            .auth(token)
            .fileUpload('fileupload', {
                blob: coverArt.file,
                filename: `${userId}${Date.now()}.${coverArt.file.type.replace(/image\//, '')}`,
            })
            .then(updateShow);
    }

    return updateShow();
}

function imports(token, showData, userId) {
    const show = Object.assign({}, showData);

    function importShow(file) {
        delete show.coverArt;
        if (file && file.data) {
            show.imageUrl = file.data.s3Url;
        }

        return request
            .auth(token)
            .post('show/importRssFeed', show)
            .then(({ data }) => data);
    }

    if (show.coverArt) {
        return request
            .auth(token)
            .fileUpload('fileupload', {
                blob: show.coverArt.file,
                filename: `${userId}${Date.now()}.${show.coverArt.file.type.replace(/image\//, '')}`,
            })
            .then(importShow);
    }

    return importShow();
}

const support = (token, options) => request.auth(token).post('show/support', options);

const promote = (token, showId, stripeToken) => request.auth(token).post('show/promote', { show: showId, stripeToken });

const protect = (token, showId, stripeToken, password) =>
    request
        .auth(token)
        .post('show/protect', {
            show: showId,
            password,
            stripeToken,
        })
        .then(res => res.data);

const unProtect = (token, show) =>
    request.auth(token).post('show/protect/public', {
        show,
    });

const checkIfProtected = showId => request.post('show/protect/check', { show: showId });
const verifyPassword = (showId, password) => request.post('show/protect/verify', { show: showId, password });
const fetchMonthlyAnalytics = (token, showId) => request.auth(token).get('show_history', { show: showId });

export default {
    fetchUserShows,
    fetchCustomUrl,
    checkCustomUrl,
    fetchShowLocationStats,
    fetchShowStats,
    deleteShow,
    create,
    update,
    imports,
    support,
    promote,
    protect,
    unProtect,
    checkIfProtected,
    verifyPassword,
    fetchMonthlyAnalytics,
};
