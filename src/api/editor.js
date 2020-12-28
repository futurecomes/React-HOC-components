import uuidv1 from 'uuid/v1'

import request from './core'

const fileFormats = {
    mp3: 'mp3',
    'x-m4a': 'm4a',
    aac: 'aac',
    wav: 'wav',
}

export const uploadFiles = (token, owner, session, files) => {
    const fileUploading = files.map(file => {
        const fileType = file.type.split('/')[1]
        const fileFormat = fileFormats[fileType]
        return request
            .auth(token)
            .fileUpload('fileupload', { blob: file, filename: `${owner}${uuidv1()}.${fileFormat}` })
    })
    return Promise.all(fileUploading).then(uploadedFilesResponse =>
        Promise.all(
            uploadedFilesResponse.map(
                (fileResponse, i) =>
                    new Promise(resolve => {
                        const { s3Url } = fileResponse.data
                        const audio = new Audio(s3Url)
                        audio.addEventListener('loadeddata', () => {
                            request
                                .auth(token)
                                .post('recording', {
                                    name: files[i].name,
                                    url: s3Url,
                                    owner,
                                    session,
                                    duration: audio.duration * 1000,
                                })
                                .then(resolve)
                        })
                    }),
            ),
        ),
    )
}

export function createEpisodeAudio(token, userId, actions) {
    return request.auth(token).post('register', { actions: Object.values(actions), userId })
}

export function createDraft(token, draft) {
    return request
        .auth(token)
        .post('draft_episode', draft)
        .then(data => data || {})
        .catch(({ reason }) => reason)
}

export function requestDrafts(token, user) {
    return request
        .auth(token)
        .get('draft_episode', {
            user,
        })
        .then(({ data }) => data || {})
}

export function deleteDraft(token, draftId) {
    return request
        .auth(token)
        .delete(`draft_episode/${draftId}`, {})
        .then(({ data }) => data || {})
        .catch(({ reason }) => reason)
}

export function deletePodcast(token, podcastId) {
    return request
        .auth(token)
        .delete(`podcast/${podcastId}`, {})
        .then(({ data }) => data)
        .catch(({ reason }) => reason)
}

export default {
    uploadFiles,
    createEpisodeAudio,
    createDraft,
    deletePodcast,
    requestDrafts,
    deleteDraft,
}
