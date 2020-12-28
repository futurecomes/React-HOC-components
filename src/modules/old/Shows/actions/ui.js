export const OPEN_UNPROTECT_PODCAST_MODAL = 'OPEN_UNPROTECT_PODCAST_MODAL'
export const openUnprotectPodcastModal = id => ({
    type: OPEN_UNPROTECT_PODCAST_MODAL,
    payload: id,
})

export const CLOSE_UNPROTECT_PODCAST_MODAL = 'CLOSE_UNPROTECT_PODCAST_MODAL'
export const closeUnprotectPodcastModal = () => ({
    type: CLOSE_UNPROTECT_PODCAST_MODAL,
})
