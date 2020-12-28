import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import ShowAPI from 'src/api/shows';
import { AppState } from 'src/config/appState';

import {
    PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST,
    passwordProtectedShowAccessRequestFail,
    passwordProtectedShowAccessRequestSuccess,
    PodcastsAction,
} from '../actions/podcastsActions';

const protectedShowAccessRequest: Epic<PodcastsAction, AppState> = action$ =>
    action$.pipe(
        ofType(PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST),
        switchMap(action =>
            from(ShowAPI.verifyPassword(action.payload!.showId, action.payload!.password)).pipe(
                pluck('data', 'isValidPassword'),
                map(payload =>
                    payload ? passwordProtectedShowAccessRequestSuccess : passwordProtectedShowAccessRequestFail,
                ),
            ),
        ),
    );

export const podcastEpic = combineEpics(protectedShowAccessRequest);
