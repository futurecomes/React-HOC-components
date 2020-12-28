import request from './core'

function fetchFreeMusic(token, id) {
    return request
        .auth(token)
        .get(`free_music/${id}`)
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function createFreeMusicInstance(token, podcastId, showId, freeMusicId) {
    return request
        .auth(token)
        .post('free_music_instance', {
            show: showId,
            podcast: podcastId,
            free_music: freeMusicId,
        })
        .then(({ data }) => data)
}

export default {
    fetchFreeMusic,
    createFreeMusicInstance,
}
