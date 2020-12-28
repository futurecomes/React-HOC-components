import {
    OPEN_EDIT_EPISODE_MODAL,
    CLOSE_EDIT_EPISODE_MODAL,
    UPDATE_EPISODE_FULFILLED,
} from '../actions/episodeEdit'

const initialState = {
    guid: null,
    error: '',
}

export function editEpisodeForm(state = initialState, action) {
    switch (action.type) {
        case OPEN_EDIT_EPISODE_MODAL:
            return {
                ...state,
                guid: action.payload.guid,
            }
        case CLOSE_EDIT_EPISODE_MODAL:
        case UPDATE_EPISODE_FULFILLED:
            return initialState
        default:
            return state
    }
}
