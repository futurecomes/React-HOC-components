import { AppState } from 'src/config/appState';

import { createSelector } from 'reselect';
import { Episode } from '../../models/podcasts';
import { getPodcasts } from '../../selectors/podcastsSelectors';
import { Category } from '../models/listen';

export const getListenPageInfo = (state: AppState) => getPodcasts(state).listen;

export const getTrendingEpisodes = (state: AppState) => getListenPageInfo(state).trending;

export const getLatestEpisodes = (state: AppState) => getListenPageInfo(state).latest;

export const getPromotedShows = (state: AppState) => getListenPageInfo(state).promoted;

export const getCurrentCategoryData = (state: AppState) => getListenPageInfo(state).category;

export const getCurrentCategory = createSelector(
    getCurrentCategoryData,
    (currentCategoryData): Category | undefined => currentCategoryData && currentCategoryData.currentCategory,
);

export const getCurrentCategoryLatestEpisodes = createSelector(
    getCurrentCategoryData,
    (currentCategoryData): Episode[] | undefined => currentCategoryData && currentCategoryData.latest,
);

export const getCurrentCategoryTrendingEpisodes = createSelector(
    getCurrentCategoryData,
    (currentCategoryData): Episode[] | undefined => currentCategoryData && currentCategoryData.trending,
);

export const getAreMoreLatest = (state: AppState) => !getListenPageInfo(state).noMoreLatest;

export const getListenPageSearchData = (state: AppState) => getListenPageInfo(state).search;

export const getListenPageSearchResults = createSelector(
    getListenPageSearchData,
    (searchData): Episode[] | undefined => searchData && searchData.data,
);

export const getSearchTerm = createSelector(
    getListenPageSearchData,
    (searchData): string | undefined => searchData && searchData.term,
);

export const getIsMoreSearch = (state: AppState) => !getListenPageSearchData(state).noMoreSearch;
