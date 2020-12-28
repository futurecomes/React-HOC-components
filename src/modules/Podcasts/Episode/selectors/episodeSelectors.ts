import { AppState } from 'src/config/appState';

export const getSingleEpisodeInfo = (state: AppState) => state.singleEpisodeReducer.SingleEpisodeData;

export const getSingleEpisodeData = (state: AppState) => getSingleEpisodeInfo(state).episodeData;
