import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';
import { Episode, Show } from 'src/modules/Podcasts/models/podcasts';

import { getPodcasts } from '../selectors/podcastsSelectors';

export const getShow = (state: AppState) => getPodcasts(state).show;

export const isPasswordProtected = createSelector(
    getShow,
    (show: Show): boolean | undefined => show && show.protected,
);

export const getShowProtection = (state: AppState) => state.podcasts.protection;

export const isAccessGranted = (state: AppState) => getShowProtection(state).isAccessGranted;

export const isPodcastsFetching = (state: AppState) => getPodcasts(state).isFetching;

export const getAllShowEpisodes = (state: AppState) => getPodcasts(state).episodes;

export const getShowId = (state: AppState) => getShow(state).id;

export const isAudioPlaying = (state: AppState) => state.audio.player.isPlaying;

export const getCurrentPlayingPodcastGuid = (state: AppState) => state.audio.currentPodcast.guid;

export const getSingleShowEpisodes = createSelector(
    getAllShowEpisodes,
    getShowId,
    (allEpisodes, showId): Episode[] => allEpisodes[showId],
);
