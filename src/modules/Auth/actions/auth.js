import { isEmpty } from 'lodash/fp';
import { AES } from 'crypto-js';

import AuthApi from 'src/api/auth';

import { clearMessages, setErrors, setSuccesses } from 'src/actions/old/messages';
import { FETCH_CURRENT_PLAN } from 'src/shared/components/old/Billing/actions';
import { history } from 'src/shared/helpers/history';

export const AUTH_IS_FETCHING = 'AUTH_IS_FETCHING';
export const AUTH_FETCH_FAIL = 'AUTH_FETCH_FAIL';

export const AUTH_AUTHENTICATE = 'AUTH_AUTHENTICATE';
export const AUTH_AUTHENTICATE_FAIL = 'AUTH_AUTHENTICATE_FAIL';
export const AUTH_REMEMBER_ME = 'AUTH_REMEMBER_ME';
export function signIn(arg, location = {}) {
    const loginInfo = Object.assign({}, arg);
    return dispatch => {
        dispatch({
            type: AUTH_IS_FETCHING,
        });

        dispatch(clearMessages('form'));
        dispatch({
            type: AUTH_REMEMBER_ME,
            payload: {
                email: loginInfo.rememberMe ? loginInfo.email : null,
                password: loginInfo.rememberMe ? AES.encrypt(loginInfo.password, loginInfo.email).toString() : null,
            },
        });

        loginInfo.email = loginInfo.email.toLowerCase();
        AuthApi.signIn(loginInfo)
            .then(res => {
                window.FS.identify(`${res.user.id}`, {
                    displayName: res.user.name,
                    email: res.user.email,
                });
                dispatch({
                    type: AUTH_AUTHENTICATE,
                    payload: res,
                });
                dispatch({ type: FETCH_CURRENT_PLAN });
                if (location.state && location.state.goBack) {
                    history.push(location.state.goBack);
                }
            })
            .catch(({ reason }) => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', [reason]));
            });
    };
}

export const AUTH_SIGN_UP_SUCCESS = 'AUTH_SIGN_UP_SUCCESS';
export function signUp(userInfo) {
    return dispatch => {
        if (!userInfo.agreedToContract) {
            dispatch(setErrors('form', ['Must agree to Terms of Service & Privacy Policy']));

            return;
        }

        dispatch({
            type: AUTH_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        const { ...rest } = userInfo;

        AuthApi.signUp({
            ...rest,
        })
            .then(res =>
                dispatch({
                    type: AUTH_SIGN_UP_SUCCESS,
                    payload: res,
                }),
            )
            .catch(({ reason }) => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', [reason]));
            });
    };
}

export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export function signOut() {
    return {
        type: AUTH_SIGN_OUT,
    };
}

export const EMAIL_VERIFICATION_FULFILLED = 'EMAIL_VERIFICATION_FULFILLED';
const emailVerificationFulfilled = () => ({
    type: EMAIL_VERIFICATION_FULFILLED,
});
export function verify(token) {
    return dispatch => {
        dispatch({
            type: AUTH_IS_FETCHING,
        });

        AuthApi.verify(token)
            .then(res => {
                dispatch({
                    type: AUTH_AUTHENTICATE,
                    payload: res,
                });
                dispatch(emailVerificationFulfilled());
            })
            .catch(err =>
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                    payload: err,
                }),
            );
    };
}

export const AUTH_FETCH_USER = 'AUTH_FETCH_USER';
export function fetchUser(forceUpdate) {
    return (dispatch, getStore) => {
        const { auth } = getStore();

        if (!isEmpty(auth.user) || !forceUpdate) {
            return;
        }

        dispatch({
            type: AUTH_IS_FETCHING,
        });

        AuthApi.fetchUser(auth.token)
            .then(res => {
                window.FS.identify(`${res.id}`, {
                    displayName: res.name,
                    email: res.email,
                });
                dispatch({
                    type: AUTH_FETCH_USER,
                    payload: res,
                });
                dispatch({ type: FETCH_CURRENT_PLAN });
            })
            .catch(err =>
                dispatch({
                    type: AUTH_SIGN_OUT,
                    payload: err,
                }),
            );
    };
}

export const AUTH_UPDATE_USER = 'AUTH_UPDATE_USER';
export function updateUser(userAttributes) {
    return (dispatch, getStore) => {
        const {
            auth: { token, user },
        } = getStore();

        const { profileImage, ...otherUserAttributes } = userAttributes;

        dispatch({
            type: AUTH_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        AuthApi.updateUser(token, user.id, {
            ...otherUserAttributes,
            profileImage,
        })
            .then(res => {
                dispatch({
                    type: AUTH_UPDATE_USER,
                    payload: res,
                });

                dispatch(setSuccesses('form', ['Personal Info updated successfully']));
            })
            .catch(({ reason }) => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', reason));
            });
    };
}

export const AUTH_VERIFY_CUSTOM_URL = 'AUTH_VERIFY_CUSTOM_URL';
export function verifyCustomUrl(customUrl) {
    return dispatch =>
        AuthApi.verifyCustomUrl(customUrl).then(res => {
            if (res.length > 0) {
                setErrors(dispatch(setErrors('form', 'The Custom Profile URL has already been taken')));

                // eslint-disable-next-line no-throw-literal
                throw {
                    customUrl: 'This URL has already been taken',
                };
            }
        });
}

export const AUTH_IS_PENDING_RESET = 'AUTH_IS_PENDING_RESET';
export function requestResetPassword({ email }) {
    return dispatch => {
        dispatch({
            type: AUTH_IS_FETCHING,
        });

        AuthApi.requestResetPassword(email)
            .then(res =>
                dispatch({
                    type: AUTH_IS_PENDING_RESET,
                    payload: res,
                }),
            )
            .catch(() => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', ["We don't know that email address"]));
            });
    };
}

export const AUTH_SET_RESET_TOKEN = 'AUTH_SET_RESET_TOKEN';
export function setResetToken(token) {
    return {
        type: AUTH_SET_RESET_TOKEN,
        payload: token,
    };
}

export const AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET';
export function resetPassword({ password }) {
    return (dispatch, getStore) => {
        dispatch({
            type: AUTH_IS_FETCHING,
        });

        AuthApi.resetPassword(password, getStore().auth.resetToken)
            .then(res =>
                dispatch({
                    type: AUTH_PASSWORD_RESET,
                    payload: res,
                }),
            )
            .catch(() => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', ['Invalid reset token']));
            });
    };
}

export function updatePassword(currentPassword, newPassword) {
    return (dispatch, getStore) => {
        const {
            auth: { token, user },
        } = getStore();

        dispatch({
            type: AUTH_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        AuthApi.signIn({
            email: user.email,
            password: currentPassword,
        })
            .then(() =>
                AuthApi.updateUser(token, user.id, {
                    password: newPassword,
                })
                    .then(data => {
                        dispatch({
                            type: AUTH_UPDATE_USER,
                            payload: data,
                        });

                        dispatch(setSuccesses('form', ['Password updated successfully']));
                    })
                    .catch(err => {
                        dispatch({
                            type: AUTH_AUTHENTICATE_FAIL,
                        });

                        dispatch(setErrors('form', err));
                    }),
            )
            .catch(() => {
                dispatch({
                    type: AUTH_AUTHENTICATE_FAIL,
                });

                dispatch(setErrors('form', ['Current password is incorrect']));
            });
    };
}

export const AUTH_SET_CREDITCARD_WARNING = 'AUTH_SET_CREDITCARD_WARNING';
export function setCreditCardWarning(show) {
    return dispatch => {
        dispatch({
            type: AUTH_SET_CREDITCARD_WARNING,
            payload: show,
        });
    };
}
