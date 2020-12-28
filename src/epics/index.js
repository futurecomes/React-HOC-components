// TO BE REMOVED AND MOVED TO APPROPRIATE EPICS
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';
import { purgeStoredState } from 'redux-persist';
import { asyncLocalStorage } from 'redux-persist/storages';
import request from 'src/api/core';

import { signOutFulfilled, signOutRejected, SIGN_OUT_FULFILLED } from 'src/modules/Auth/actions/authActions';
import { AUTH_SIGN_OUT } from 'src/modules/Auth/actions/auth';
import { deleteAllCookies } from 'src/shared/helpers/deleteCookies';

export const authEpicFactory = () => {
    const signOutEpic = action$ =>
        action$.pipe(
            ofType(AUTH_SIGN_OUT),
            mergeMap(() =>
                request
                    .get('logout')
                    .then(signOutFulfilled)
                    .catch(signOutRejected),
            ),
        );

    const onSignOutFulfilled = action$ =>
        action$.pipe(
            ofType(SIGN_OUT_FULFILLED),
            tap(() => {
                purgeStoredState({ storage: asyncLocalStorage });
                localStorage.clear();
                deleteAllCookies();
            }),
            ignoreElements(),
        );

    return combineEpics(signOutEpic, onSignOutFulfilled);
};
