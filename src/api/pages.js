import request from './core'

function fetchPages(token) {
    return request
        .auth(token)
        .get('page')
        .then(({ data }) => data)
        .catch(err => err.reason)
}

export default {
    fetchPages,
}
