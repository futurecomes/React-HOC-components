import { AppState } from 'src/config/appState';

export const getUI = (state: AppState) => state.ui;

export const getIsPlayerModalVisible = (state: AppState) => getUI(state).isPlayerModalVisible;
