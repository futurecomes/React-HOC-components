import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';
import { ShowCategory } from 'src/modules/Podcasts/models/podcasts';

import { Show } from '../models/podcastWizard';

export const getPodcastWizard = (state: AppState) => state.podcastWizard;

export const getCurrentPodcastWizardStep = (state: AppState) => getPodcastWizard(state).currentStep;

export const getShow = (state: AppState) => getPodcastWizard(state).show;

export const getShowTitle = createSelector(
    getShow,
    (show: Show): string => show.title,
);

export const getShowDescription = createSelector(
    getShow,
    (show: Show): string => show.description,
);

export const getShowCategoriesIds = createSelector(
    getShow,
    (show: Show): number[] => show.categoriesIds,
);

export const getShowCategories = (state: AppState) => state.podcasts.categories as ShowCategory[];
