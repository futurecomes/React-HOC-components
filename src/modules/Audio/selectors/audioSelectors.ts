import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';

export const getAudio = (state: AppState) => state.audio;

export const getCurrentPodcast = (state: AppState) => getAudio(state).currentPodcast;

export const getPlayerData = (state: AppState) => getAudio(state).player;

export const getAdData = (state: AppState) => getAudio(state).ad;

export const getIsEpisodePlaying = createSelector(
    getPlayerData,
    (player): boolean => player.isPlaying,
);
