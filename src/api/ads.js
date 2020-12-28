import request from './core'

function fetchAd(token, id) {
    return request
        .auth(token)
        .get(`commercial/${id}`)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        })
}

function fetchAds(token, adAttributes) {
    return request
        .auth(token)
        .get('get_dynamic_commercial', adAttributes)
        .then(({ data }) => data)
        .catch(err =>
            Promise.reject({
                reason: err.status === 500 ? 'Not able to get ads right now' : err,
            }),
        )
}

function fetchRandomAd(token, adAttributes) {
    return request
        .get('get_dynamic_commercial', adAttributes)
        .then(({ data }) => data)
        .catch(err =>
            Promise.reject({
                reason: err.status === 500 ? 'Not able to get a random ad right now' : err,
            }),
        )
}

function registerAd(id, adAttributes = {}) {
    return request
        .put(`commercial/${id}/register_listen`, adAttributes)
        .then(({ data }) => data)
        .catch(err =>
            Promise.reject({
                reason: err.status === 500 ? 'Not able to get a random ad right now' : err,
            }),
        )
}

export default {
    fetchAd,
    fetchAds,
    registerAd,
    fetchRandomAd,
}
