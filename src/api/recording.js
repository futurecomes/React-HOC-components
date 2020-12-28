import request from './core'

function createSession(token, name = '') {
    return request
        .auth(token)
        .post('recording_session', { name })
        .then(({ data }) => data)
}

function fetchSession(token, id) {
    return request
        .auth(token)
        .get(`recording_session/${id}`)
        .then(({ data }) => data)
}

function fetchSessions(token, userId) {
    return request
        .auth(token)
        .get('recording_session', {
            _sort: 'created_at',
            _order: 'DESC',
            created_by: userId,
        })
        .then(({ data }) => data)
}

function fetchFreeMusic(token) {
    return request
        .auth(token)
        .get('free_music', {})
        .then(({ data }) => data)
}

function updateSession(token, session) {
    return request
        .auth(token)
        .put(`recording_session/${session.id}`, session)
        .then(({ data }) => data)
}

function deleteSession(token, id) {
    return request
        .auth(token)
        .delete(`recording_session/${id}`)
        .then(({ data }) => data)
}

function fetchRecordings(token, session, owner) {
    const params = Object.assign(
        {
            _sort: 'created_at',
            _order: 'DESC',
            owner,
        },
        session ? { session } : {},
    )

    return request
        .auth(token)
        .get('recording', params)
        .then(({ data }) => data)
}

function saveRecording(token, { blob, name, userId, sessionId, duration }) {
    return request
        .auth(token)
        .fileUpload('fileupload', { blob, filename: `${userId}${Date.now()}.wav` })
        .then(({ data }) =>
            request.auth(token).post('recording', {
                name,
                url: data.s3Url,
                owner: userId,
                session: sessionId,
                recorded_size: blob.size,
                duration,
            }),
        )
        .then(({ data }) => data)
}

function deleteRecording(token, id) {
    return request
        .auth(token)
        .delete(`recording/${id}`)
        .then(({ data }) => data)
}

function updateRecording(token, recording) {
    return request
        .auth(token)
        .put(`recording/${recording.id}`, recording)
        .then(({ data }) => data)
}

export default {
    createSession,
    fetchSession,
    fetchSessions,
    updateSession,
    deleteSession,
    fetchRecordings,
    saveRecording,
    deleteRecording,
    updateRecording,
    fetchFreeMusic,
}
