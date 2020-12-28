import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';

import { Show } from '../models/podcasts';

export const getPodcasts = (state: AppState) => state.podcasts;

export const getIsPodcastsDataFetching = (state: AppState) => getPodcasts(state).isFetching;

export const getPodcastsCategories = (state: AppState) => getPodcasts(state).categories;

export const getAuthoredShowsById = (state: AppState) => getPodcasts(state).authored;

export const getAuthoredShows = createSelector(
    getAuthoredShowsById,
    (authoredShowsById): Show[] => authoredShowsById && Object.values(authoredShowsById),
);

export const getCurrentShow = (state: AppState) => getPodcasts(state).show;

export const getCurrentShowTitle = createSelector(
    getCurrentShow,
    (show): string | undefined => show && show.title,
);
