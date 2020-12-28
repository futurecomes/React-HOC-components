import { createSelector } from 'reselect';

import { AppState } from 'src/config/appState';
import { getAuthenticatedUser } from 'src/modules/Auth/selectors/authSelectors';

export const getProfile = (state: AppState) => state.profile;

export const getIsProfileFetching = (state: AppState) => getProfile(state).isFetching;

export const getUser = (state: AppState) => getProfile(state).user;

export const getIsCurrentUser = createSelector(
    getUser,
    getAuthenticatedUser,
    (user, authUser): boolean => user && authUser && user.id === authUser.id,
);
