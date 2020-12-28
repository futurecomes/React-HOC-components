import request from './core';

function fetchCategories(token) {
    return request
        .auth(token)
        .get('show_category')
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

export const fetchShow = id => {
    return request
        .get(`show/${id}`)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
};

function fetchShowWithUrl(customUrl) {
    return request
        .get('show', { customUrl })
        .then(({ data }) => data[0])
        .catch(() => {
            /* Ignore */
        });
}

function fetchEpisodes(id) {
    return request
        .get('podcast', {
            show: id,
            released: true,
            _sort: 'released_at',
            _order: 'ASC',
        })
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchAllShowEpisodes(id) {
    return request
        .get('podcast', {
            show: id,
            _sort: 'created_at',
            _order: 'ASC',
        })
        .then(({ data }) => data);
}

function fetchEpisode(id) {
    return request
        .get(`podcast/${id}`)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchAuthoredPodcasts(id) {
    return request
        .get('show', {
            created_by: id,
        })
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchSubscribedPodcasts(userId) {
    return request
        .get('subscription', {
            active: true,
            user: userId,
        })
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchUnplayedPodcasts(token) {
    return request
        .auth(token)
        .get('subscription/unplayed', {
            released: true,
        })
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchIsPlayed(token, userId, episodeId) {
    return request
        .auth(token)
        .get('play', {
            user: userId,
            podcast: episodeId,
        })
        .then(({ data }) => {
            let isPlayed = 'unplayed';

            if (data.length > 0) {
                isPlayed = data[0].finished ? 'finished' : 'started';
            }

            return {
                episode: episodeId,
                isPlayed,
            };
        })
        .catch(() => {
            /* Ignore */
        });
}

function fetchSearchResults(options) {
    const params = {
        ...options,
        filter: {
            ...options.filter,
            released: true,
        },
        prefixSearch: true,
    };

    return request
        .post('podcast/search/latest', params)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function fetchIsSubscribed(token, user, show) {
    return request
        .auth(token)
        .get('subscription', {
            user,
            show,
            active: true,
        })
        .then(({ data }) => (data.length === 0 ? {} : data.find(s => s.active) || {}))
        .catch(() => {
            /* Ignore */
        });
}

function submitPlayed(token, params) {
    return request
        .auth(token)
        .post('play', params)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function registerListen(id) {
    return request
        .put(`podcast/${id}/register_listen`, {})
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function updatePlayed(token, id, params) {
    return request
        .auth(token)
        .put(`play/${id}`, params)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function toggleSubscribe(token, subId, user, show) {
    if (subId) {
        return request
            .auth(token)
            .put(`subscription/${subId}`, {
                user,
                show,
                active: false,
            })
            .then(() => ({}))
            .catch(({ reason }) => reason);
    }

    return request
        .auth(token)
        .post('subscription', {
            user,
            show,
            active: true,
        })
        .then(({ data }) => data || {})
        .catch(({ reason }) => reason);
}

function createEpisode(token, episode) {
    return request
        .auth(token)
        .post('podcast', {
            ...episode,
            released: true,
        })
        .then(({ data }) => data);
}

function updateShow(token, showId, attributes) {
    return request
        .auth(token)
        .put(`show/${showId}`, attributes)
        .then(({ data }) => data || {})
        .catch(() => {
            /* Ignore */
        });
}

function updateEpisode(token, episodeId, attributes) {
    return request
        .auth(token)
        .put(`podcast/${episodeId}`, attributes)
        .then(({ data }) => data || {})
        .catch(() => {
            /* Ignore */
        });
}

export const fetchShowAnalyticsAPI = token => showID => request.auth(token).get('show_analytics', { showID });

export const fetchEpisodeAnalytics = token => (episode_guid, year, month) => {
    const params = month && year ? { month, year, episode_guid } : { episode_guid };
    return request.auth(token).get('episode_analytics', params);
};

const fetchTopPodcasts = category => request.post('podcast/search/top', { category });

const fetchLatestPodcasts = (from = 0, category) => request.post('podcast/search/latest', { from, category });

const searchPodcasts = (from = 0, term) => request.post('podcast/search', { from, term });

const loadMorePodcasts = (apiPath, from = 0) => request.post(apiPath, { from });

const fetchCantMissShows = () => request.get('show', { promoted: true });

export default {
    fetchCategories,
    fetchAuthoredPodcasts,
    fetchSubscribedPodcasts,
    fetchUnplayedPodcasts,
    fetchIsPlayed,
    fetchEpisodes,
    fetchAllShowEpisodes,
    fetchEpisode,
    fetchShow,
    fetchShowWithUrl,
    fetchSearchResults,
    fetchIsSubscribed,
    submitPlayed,
    updatePlayed,
    registerListen,
    toggleSubscribe,
    createEpisode,
    updateShow,
    updateEpisode,
    fetchEpisodeAnalytics,
    fetchTopPodcasts,
    fetchLatestPodcasts,
    loadMorePodcasts,
    fetchCantMissShows,
    searchPodcasts,
};
