export const CLEAR_PODCASTS = 'CLEAR_PODCASTS';
export const clearPodcasts = () => ({
    type: CLEAR_PODCASTS,
});

export const FETCH_LISTEN_PAGE_DATA = 'FETCH_LISTEN_PAGE_DATA';
export const fetchListenPageData = () => ({
    type: FETCH_LISTEN_PAGE_DATA,
});

export const FETCH_LISTEN_PAGE_DATA_FULFILLED = 'FETCH_LISTEN_PAGE_DATA_FULFILLED';
export const fetchListenPageDataFulfilled = payload => ({
    type: FETCH_LISTEN_PAGE_DATA_FULFILLED,
    payload,
});

export const FETCH_PODCASTS_REJECTED = 'FETCH_PODCASTS_REJECTED';
export const fetchPodcastsRejected = () => ({
    type: FETCH_PODCASTS_REJECTED,
});

export const LOAD_MORE_PODCASTS = 'LOAD_MORE_PODCASTS';
export const loadMorePodcasts = options => ({
    type: LOAD_MORE_PODCASTS,
    payload: options,
});

export const LOAD_MORE_PODCASTS_FULFILLED = 'LOAD_MORE_PODCASTS_FULFILLED';
export const loadMorePodcastsFulfilled = podcasts => ({
    type: LOAD_MORE_PODCASTS_FULFILLED,
    payload: podcasts,
});

export const LOAD_MORE_PODCASTS_REJECTED = 'LOAD_MORE_PODCASTS_REJECTED';
export const loadMorePodcastsRejected = () => ({
    type: LOAD_MORE_PODCASTS_REJECTED,
});

export const SEARCH_FOR_PODCASTS = 'SEARCH_FOR_PODCASTS';
export const searchForPodcasts = (from = 0, term) => ({
    type: SEARCH_FOR_PODCASTS,
    payload: {
        from,
        term,
    },
});

export const SEARCH_FOR_PODCASTS_FULFILLED = 'SEARCH_FOR_PODCASTS_FULFILLED';
export const searchForPodcastsFulfilled = podcasts => ({
    type: SEARCH_FOR_PODCASTS_FULFILLED,
    payload: podcasts,
});

export const SEARCH_FOR_PODCASTS_REJECTED = 'SEARCH_FOR_PODCASTS_REJECTED';
export const searchForPodcastsRejected = error => ({
    type: SEARCH_FOR_PODCASTS_REJECTED,
    error,
});

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const changeSearchTerm = term => ({
    type: CHANGE_SEARCH_TERM,
    payload: term,
});

export const CLEAR_SEARCH_PODCASTS = 'CLEAR_SEARCH_PODCASTS';
export const clearSearchPodcasts = () => ({
    type: CLEAR_SEARCH_PODCASTS,
});

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const FETCH_PODCASTS_BY_CATEGORY = 'FETCH_PODCASTS_BY_CATEGORY';
export const fetchPodcastsByCategory = (category, type, from = 0) => ({
    type: FETCH_PODCASTS_BY_CATEGORY,
    payload: {
        category,
        type,
        from,
    },
});

export const FETCH_PODCASTS_BY_CATEGORY_FULFILLED = 'FETCH_PODCASTS_BY_CATEGORY_FULFILLED';
export const fetchPodcastsByCategoryFulfilled = podcasts => ({
    type: FETCH_PODCASTS_BY_CATEGORY_FULFILLED,
    payload: podcasts,
});

export const FETCH_PODCASTS_BY_CATEGORY_REJECTED = 'FETCH_PODCASTS_BY_CATEGORY_REJECTED';
export const fetchPodcastsByCategoryRejected = error => ({
    type: FETCH_PODCASTS_BY_CATEGORY_REJECTED,
    error,
});

export const CLEAR_PODCASTS_BY_CATEGORY = 'CLEAR_PODCASTS_BY_CATEGORY';
export const clearPodcastsByCategory = () => ({
    type: CLEAR_PODCASTS_BY_CATEGORY,
});

export const LOAD_MORE_PODCASTS_BY_CATEGORY = 'LOAD_MORE_PODCASTS_BY_CATEGORY';
export const loadMorePodcastsByCategory = (from, categoryId) => ({
    type: LOAD_MORE_PODCASTS_BY_CATEGORY,
    payload: {
        from,
        categoryId,
    },
});

export const LOAD_MORE_PODCASTS_BY_CATEGORY_FULFILLED = 'LOAD_MORE_PODCASTS_BY_CATEGORY_FULFILLED';
export const loadMorePodcastsByCategoryFulfilled = podcasts => ({
    type: LOAD_MORE_PODCASTS_BY_CATEGORY_FULFILLED,
    payload: podcasts,
});

export const LOAD_MORE_PODCASTS_BY_CATEGORY_REJECTED = 'LOAD_MORE_PODCASTS_BY_CATEGORY_REJECTED';
export const loadMorePodcastsByCategoryRejected = error => ({
    type: LOAD_MORE_PODCASTS_BY_CATEGORY_REJECTED,
    error,
});

export const CHANGE_CURRENT_CATEGORY = 'CHANGE_CURRENT_CATEGORY';
export const changeCurrentCategory = category => ({
    type: CHANGE_CURRENT_CATEGORY,
    payload: category,
});
