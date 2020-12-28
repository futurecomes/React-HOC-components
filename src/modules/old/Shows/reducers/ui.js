import { combineReducers } from 'redux'

import { OPEN_UNPROTECT_PODCAST_MODAL, CLOSE_UNPROTECT_PODCAST_MODAL } from '../actions/ui'

const initialState = {
    unprotectshowId: 0,
    isUnprotectPodcastModalOpen: false,
}

const unprotectPodcastModal = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_UNPROTECT_PODCAST_MODAL:
            return {
                ...state,
                unprotectshowId: action.payload,
                isUnprotectPodcastModalOpen: true,
            }
        case CLOSE_UNPROTECT_PODCAST_MODAL:
            return {
                ...state,
                unprotectshowId: 0,
                isUnprotectPodcastModalOpen: false,
            }
        default:
            return state
    }
}

export default combineReducers({
    unprotectPodcastModal,
})
