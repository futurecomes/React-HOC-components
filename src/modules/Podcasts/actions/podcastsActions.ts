import { Action, ActionCreator } from 'src/actions/actions';

export type PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST';
export const PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST';
export type PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS';
export const PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS';
export type PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL';
export const PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL = 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL';

interface PasswordProtectedShowAccessRequestPayload {
    showId: number;
    password: string;
}
export interface PasswordProtectedShowAccessRequestAction
    extends Action<PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST, PasswordProtectedShowAccessRequestPayload> {
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST';
    payload: PasswordProtectedShowAccessRequestPayload;
}
export const passwordProtectedShowAccessRequest: ActionCreator<
    PasswordProtectedShowAccessRequestAction
> = showIdAndPass => ({
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST',
    payload: showIdAndPass,
});

export interface PasswordProtectedShowAccessRequestSuccess
    extends Action<PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS> {
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS';
}
export const passwordProtectedShowAccessRequestSuccess: Action<PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS> = {
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_SUCCESS',
};

export interface PasswordProtectedShowAccessRequestFail extends Action<PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL> {
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL';
}
export const passwordProtectedShowAccessRequestFail: Action<PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL> = {
    type: 'PASSWORD_PROTECTED_SHOW_ACCESS_REQUEST_FAIL',
};

export type PodcastsAction =
    | PasswordProtectedShowAccessRequestAction
    | PasswordProtectedShowAccessRequestSuccess
    | PasswordProtectedShowAccessRequestFail;
