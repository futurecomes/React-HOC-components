import { createSelector } from 'reselect';
import { AppState } from 'src/config/appState';

import { Show } from 'src/modules/Podcasts/models/podcasts';

export const getShows = (state: AppState) => state.shows.list;

const extractShowId = (_state: AppState, showId: string) => showId;

export const getUserShowById = createSelector(
    getShows,
    extractShowId,
    (shows: Show[], showId: string): Show | undefined => shows.find(show => show.id.toString() === showId),
);
