export const SINGLE_EPISODE_FETCHING_START = 'SINGLE_EPISODE_FETCHING_START'
export const singleEpisodeIsFetchingStart = guid => ({
    type: SINGLE_EPISODE_FETCHING_START,
    payload: guid,
})

export const SINGLE_EPISODE_FETCHING_SUCCEED = 'SINGLE_EPISODE_FETCHING_SUCCEED'
export const singleEpisodeFetchingSucceed = episodeData => ({
    type: SINGLE_EPISODE_FETCHING_SUCCEED,
    payload: episodeData,
})

export const SINGLE_EPISODE_FETCHING_FAILED = 'SINGLE_EPISODE_FETCHING_FAILED'
export const singleEpisodeFetchingFailed = errorData => ({
    type: SINGLE_EPISODE_FETCHING_FAILED,
    payload: errorData,
})
