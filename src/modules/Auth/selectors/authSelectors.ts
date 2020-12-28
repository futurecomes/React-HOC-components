import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';

export const getAuth = (state: AppState) => state.auth;

export const getUserToken = (state: AppState) => getAuth(state).token;

export const getUserLoginStatus = createSelector(
    getUserToken,
    (token): boolean => !!token,
);

export const getAuthenticatedUser = (state: AppState) => getAuth(state).user;

export const getIsAuthenticatedUserAdmin = (state: AppState) => !!getAuthenticatedUser(state).admin;

export const getShowCreditCardWarning = (state: AppState) => getAuth(state).showCreditCardWarning;
