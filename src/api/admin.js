import request from './core'

function fetchAdminAnalytics(token) {
    return request
        .auth(token)
        .get('analytics')
        .then(({ data }) => data)
}

function fetchAdminShowAnalytics(token) {
    return request
        .auth(token)
        .get('analytics/show')
        .then(({ data }) => data)
}

function fetchPodcastAnalytics(token) {
    return request
        .auth(token)
        .get('analytics1')
        .then(({ data }) => data)
}

function fetchUserAnalytics(token) {
    return request
        .auth(token)
        .get('analytics2')
        .then(({ data }) => data)
}

function fetchAudioAdAnalytics(token) {
    return request
        .auth(token)
        .get('commercial?type=audio&enabled=true&_start=0&_end=5&_sort=frequency&_order=DESC')
        .then(({ totalCount, data }) => ({
            totalCount,
            data,
        }))
}

function fetchVisualAdAnalytics(token) {
    return request
        .auth(token)
        .get('commercial?type=visual&enabled=true&_start=0&_end=5&_sort=frequency&_order=DESC')
        .then(({ totalCount, data }) => ({
            totalCount,
            data,
        }))
}

function fetchToolAnalytics(token) {
    return request
        .auth(token)
        .get('analytics3')
        .then(({ data }) => data)
}

function fetchShowAnalytics(token, id) {
    return request
        .auth(token)
        .get(`show/${id}/stats`)
        .then(({ data }) => data)
}

const orders = {
    asc: -1,
    desc: 1,
}

function search(token, filter, query, from, size, sort = 'released_at', order = 'asc') {
    const params = {
        collection: filter.entity,
        from: from || 0,
        size: size || 25,
        order: orders[order.toLowerCase()],
        sort,
        prefix_search: true,
        query,
        searchBy: filter.searchBy,
        find: filter.find || {},
    }

    return request
        .auth(token)
        .post('search', params, true)
        .then(({ data }) => data)
}

function fetchUsers(token, ...rest) {
    const filter = {
        entity: 'user',
        searchBy: 'email',
    }

    return search(token, filter, ...rest)
}

function fetchUser(token, id) {
    return request
        .auth(token)
        .get(`user/${id}`)
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        })
}

function fetchUserLogs(token, startDate, userId, _, from, size) {
    let url = `log?user=${userId}&_start=${from || 0}&_end=${(from || 0) + size}&_sort=created_at&_order=DESC`

    if (startDate) {
        url += `&created_at=$gte${startDate}`
    }

    return request
        .auth(token)
        .get(url)
        .then(({ data, totalCount }) => ({
            data,
            totalCount: parseInt(totalCount, 10),
        }))
        .catch(() => {
            /* Ignore */
        })
}

function fetchUserShows(token, userId, ...rest) {
    const filter = {
        entity: 'show',
        find: {
            created_by: Number(userId),
        },
    }

    return search(token, filter, ...rest)
}

function fetchShows(token, ...rest) {
    const filter = {
        entity: 'show',
        searchBy: 'title',
    }

    return search(token, filter, ...rest)
}

function fetchEpisodes(token, showId, ...rest) {
    const filter = {
        entity: 'podcast',
        find: {
            show: Number(showId),
        },
    }

    return search(token, filter, ...rest)
}

function fetchAudioAdsByShow(token, showId, ...rest) {
    const filter = {
        entity: 'ad_instance',
        ad_type: 'audio',
        show: showId,
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchAudioAdsByEpisode(token, episodeId, ...rest) {
    const filter = {
        entity: 'ad_instance',
        ad_type: 'audio',
        podcast: episodeId,
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchActiveAudioAds(token, ...rest) {
    const filter = {
        entity: 'ad',
        find: {
            type: 'audio',
            enabled: true,
        },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchInactiveAudioAds(token, ...rest) {
    const filter = {
        entity: 'ad',
        find: {
            type: 'audio',
            enabled: false,
        },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchAudioAdEpisodes(token, adId, ...rest) {
    const filter = {
        entity: 'ad_instance',
        ad: adId,
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchActiveVisualAds(token, ...rest) {
    const filter = {
        entity: 'ad',
        find: {
            type: 'visual',
            enabled: true,
        },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchInactiveVisualAds(token, ...rest) {
    const filter = {
        entity: 'ad',
        find: {
            type: 'visual',
            enabled: false,
        },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchActiveFreeMusic(token, ...rest) {
    const filter = {
        entity: 'free_music',
        find: { active: true },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchInactiveFreeMusic(token, ...rest) {
    const filter = {
        entity: 'free_music',
        find: {
            active: false,
        },
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function fetchFreeMusicShows(token, id, ...rest) {
    const filter = {
        entity: 'free_music_instance',
        free_music: id,
        searchBy: 'name',
    }

    return search(token, filter, ...rest)
}

function uploadAudioFile(token, fileObj) {
    const filenameTokens = fileObj.file.name.split('.')
    const fileExtension = filenameTokens.length > 1 ? filenameTokens[filenameTokens.length - 1] : ''

    return request.auth(token).fileUpload('fileupload', {
        blob: fileObj.file,
        filename: `${Date.now()}.${fileExtension}`,
    })
}

function createAudioAd(token, attributes) {
    const { audioFile, ...otherAttributes } = attributes

    return uploadAudioFile(token, audioFile)
        .then(({ data }) =>
            request
                .auth(token)
                .post('commercial', {
                    ...otherAttributes,
                    type: 'audio',
                    url: data.s3Url,
                })
                .catch(err => err),
        )
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function imageUploader(token, image) {
    if (!image) {
        return new Promise(resolve => resolve({ data: {} }))
    }

    const randomName = Math.round(Math.random() * 10000)
    return request.auth(token).fileUpload('fileupload', {
        blob: image.file,
        filename: `${randomName}${Date.now()}.${image.file.type.replace(/image\//, '')}`,
    })
}

function createVisualAd(token, attributes) {
    const { pagesEnabled, imageLeaderboard, imageHalfPage, imageMobile, ...otherAttrs } = attributes

    // bypass a bug in our snakecase transform for array values
    const params = {
        type: 'visual',
        pages_enabled: pagesEnabled,
        ...otherAttrs,
    }

    return imageUploader(token, imageLeaderboard)
        .then(({ data: { s3Url } }) => {
            params.image_leaderboard = s3Url
            return imageUploader(token, imageHalfPage)
        })
        .then(({ data: { s3Url } }) => {
            params.image_half_page = s3Url
            return imageUploader(token, imageMobile)
        })
        .then(({ data: { s3Url } }) => {
            params.image_mobile = s3Url
            return request.auth(token).post('commercial', params, true)
        })
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function createFreeMusic(token, attributes) {
    const { audioFile, ...otherAttributes } = attributes

    return uploadAudioFile(token, audioFile)
        .then(({ data }) =>
            request
                .auth(token)
                .post('free_music', {
                    ...otherAttributes,
                    url: data.s3Url,
                })
                .catch(err => err),
        )
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function updateAudioAd(token, id, attributes) {
    const { audioFile, ...otherAttributes } = attributes

    if (audioFile) {
        return uploadAudioFile(token, audioFile)
            .then(({ data }) =>
                request.auth(token).put(`commercial/${id}`, {
                    ...otherAttributes,
                    url: data.s3Url,
                }),
            )
            .then(({ data }) => data)
            .catch(err => err.reason)
    }

    return request
        .auth(token)
        .put(`commercial/${id}`, {
            ...otherAttributes,
        })
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function updateVisualAd(token, id, attributes) {
    const { pagesEnabled, imageLeaderboard, imageHalfPage, imageMobile, ...otherAttrs } = attributes

    // bypass a bug in our snakecase transform for array values
    const params = {
        type: 'visual',
        pages_enabled: pagesEnabled,
        ...otherAttrs,
    }

    return imageUploader(token, imageLeaderboard)
        .then(({ data: { s3Url } }) => {
            if (s3Url) {
                params.image_leaderboard = s3Url
            }

            return imageUploader(token, imageHalfPage)
        })
        .then(({ data: { s3Url } }) => {
            if (s3Url) {
                params.image_half_page = s3Url
            }

            return imageUploader(token, imageMobile)
        })
        .then(({ data: { s3Url } }) => {
            if (s3Url) {
                params.image_mobile = s3Url
            }

            return request.auth(token).put(`commercial/${id}`, params, true)
        })
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function updateFreeMusic(token, id, attributes) {
    const { audioFile, ...otherAttributes } = attributes

    if (audioFile) {
        return uploadAudioFile(token, audioFile)
            .then(({ data }) =>
                request.auth(token).put(`free_music/${id}`, {
                    ...otherAttributes,
                    url: data.s3Url,
                }),
            )
            .then(({ data }) => data)
            .catch(err => err.reason)
    }

    return request
        .auth(token)
        .put(`free_music/${id}`, {
            ...otherAttributes,
        })
        .then(({ data }) => data)
        .catch(err => err.reason)
}

function deleteUser(token, id) {
    return request.auth(token).delete(`user/${id}`)
}

function deleteShow(token, id) {
    return request.auth(token).delete(`show/${id}`)
}

function deleteEpisode(token, id) {
    return request.auth(token).delete(`podcast/${id}`)
}

function deleteAd(token, id) {
    return request.auth(token).delete(`commercial/${id}`)
}

function deleteFreeMusic(token, id) {
    return request.auth(token).delete(`free_music/${id}`)
}

function download(token, objectName, ids) {
    const params = {
        object: objectName,
    }

    if (ids) {
        params.query = {
            id: {
                $in: ids,
            },
        }
    }

    return request.auth(token).post('export', params, true)
}

const fetchUserGrowth = token =>
    request
        .auth(token)
        .get('analytics/user_growth')
        .then(({ data }) => data)

export default {
    fetchAdminAnalytics,
    fetchPodcastAnalytics,
    fetchUserAnalytics,
    fetchAudioAdAnalytics,
    fetchVisualAdAnalytics,
    fetchToolAnalytics,
    fetchShowAnalytics,
    fetchUsers,
    fetchUser,
    fetchUserLogs,
    fetchUserShows,
    fetchShows,
    fetchEpisodes,
    fetchAudioAdsByShow,
    fetchAudioAdsByEpisode,
    fetchActiveAudioAds,
    fetchInactiveAudioAds,
    fetchAudioAdEpisodes,
    fetchActiveVisualAds,
    fetchInactiveVisualAds,
    fetchActiveFreeMusic,
    fetchInactiveFreeMusic,
    fetchFreeMusicShows,
    createAudioAd,
    createVisualAd,
    createFreeMusic,
    updateAudioAd,
    updateVisualAd,
    updateFreeMusic,
    deleteUser,
    deleteShow,
    deleteEpisode,
    deleteAd,
    deleteFreeMusic,
    download,
    fetchAdminShowAnalytics,
    fetchUserGrowth,
}
