export const ENTER_SHOW_ANALYTICS = 'ENTER_SHOW_ANALYTICS'
export const enterShowAnalytics = payload => ({
    type: ENTER_SHOW_ANALYTICS,
    payload,
})

export const FETCH_SHOW_ANALYTICS = 'FETCH_SHOW_ANALYTICS'
export const fetchShowAnalytics = payload => ({
    type: FETCH_SHOW_ANALYTICS,
    payload,
})

export const FETCH_SHOW_EPISODES = 'FETCH_SHOW_EPISODES'
export const fetchShowEpisodes = showId => ({
    type: FETCH_SHOW_EPISODES,
    payload: showId,
})

export const FETCH_USER_SHOWS_FULFILLED = 'FETCH_USER_SHOWS_FULFILLED'
export const fetchUserShowsFulfilled = shows => ({
    type: FETCH_USER_SHOWS_FULFILLED,
    payload: shows,
})
