// LEGACY

import { buildShow } from 'src/actions/old/shows'

export const CREATE_SHOW = 'CREATE_SHOW'
export const createShow = payload => ({
    type: CREATE_SHOW,
    payload: buildShow(payload),
})

export const CREATE_SHOW_WITHOUT_ART = 'CREATE_SHOW_WITHOUT_ART'
export const createShowWithoutArt = payload => ({
    type: CREATE_SHOW_WITHOUT_ART,
    payload: { ...buildShow(payload), coverArt: 'default' },
})

export const FETCH_USER_SHOWS = 'FETCH_USER_SHOWS'
export const fetchUserShows = () => ({
    type: FETCH_USER_SHOWS,
})

export const FETCH_USER_SHOWS_REJECTED = 'FETCH_USER_SHOWS_REJECTED'
export const fetchUserShowsRejected = error => ({
    type: FETCH_USER_SHOWS_REJECTED,
    error,
})

export const FETCH_SHOW_EPISODES_FULFILLED = 'FETCH_SHOW_EPISODES_FULFILLED'
export const fetchShowEpisodesFulfilled = data => ({
    type: FETCH_SHOW_EPISODES_FULFILLED,
    payload: {
        data: data.episodes,
        showId: data.showId,
    },
})

export const FETCH_SHOW_EPISODES_REJECTED = 'FETCH_SHOW_EPISODES_REJECTED'
export const fetchShowEpisodesRejected = error => ({
    type: FETCH_SHOW_EPISODES_REJECTED,
    error,
})

export const EDIT_SHOW = 'EDIT_SHOW'
export const editShow = (showId, edit) => ({
    type: EDIT_SHOW,
    payload: {
        showId,
        edit,
    },
})

// NEW

export * from './ui'
