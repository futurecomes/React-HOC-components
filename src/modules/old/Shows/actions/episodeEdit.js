export const OPEN_EDIT_EPISODE_MODAL = 'OPEN_EDIT_EPISODE_MODAL'
export const openEditEpisodeModal = payload => ({
    type: OPEN_EDIT_EPISODE_MODAL,
    payload,
})

export const CLOSE_EDIT_EPISODE_MODAL = 'CLOSE_EDIT_EPISODE_MODAL'
export const closeEditEpisodeModal = () => ({
    type: CLOSE_EDIT_EPISODE_MODAL,
})

export const UPDATE_EPISODE = 'UPDATE_EPISODE'
export const updateEpisode = (guid, show, data) => ({
    type: UPDATE_EPISODE,
    payload: {
        guid,
        show,
        data,
    },
})

export const UPDATE_EPISODE_FULFILLED = 'UPDATE_EPISODE_FULFILLED'
export const updateEpisodeFulfilled = payload => ({
    type: UPDATE_EPISODE_FULFILLED,
    payload,
})

export const UPDATE_EPISODE_REJECTED = 'UPDATE_EPISODE_REJECTED'
export const updateEpisodeRejected = () => ({
    type: UPDATE_EPISODE_REJECTED,
})
