/* eslint-disable no-restricted-globals */

import { omit } from 'lodash/fp'

import request from './core'

const filterInfo = omit(['confirmPassword', 'agreedToContract'])

function signIn(loginInfo) {
    return request
        .post('login', loginInfo)
        .then(({ data }) => data)
        .catch(err =>
            Promise.reject({
                reason:
                    err.reason === 'Wrong password' || err.reason === 'No such user'
                        ? 'Email and password do not match'
                        : err.reason || 'There was an error with the server.',
            }),
        )
}

function signUp(userData) {
    const userInfo = Object.assign({}, userData)
    const cb = file => {
        if (file) {
            userInfo.image = file.s3Url
        }

        delete userInfo.profileImage

        return request
            .post('user', {
                ...filterInfo(userInfo),
                redirect: `${location.protocol}//${location.host}`,
            })
            .then(({ data }) => data)
            .catch(err =>
                Promise.reject({
                    reason: err.status === 409 ? 'Email already registered' : err.reason,
                }),
            )
    }

    if (userInfo.profileImage) {
        const random = Math.floor(Math.random() * 100000)
        return request
            .fileUpload('fileupload', {
                blob: userInfo.profileImage.file,
                filename: `${random}${Date.now()}.${userInfo.profileImage.file.type.replace(/image\//, '')}`,
            })
            .then(({ data }) => cb(data))
    }

    return cb()
}

function verify(token) {
    return request.get(`verify/email/${token}`).then(({ data }) => data)
}

function fetchUser(token) {
    return request
        .auth(token)
        .get('whoami')
        .then(({ data }) => data)
}

function verifyCustomUrl(customUrl) {
    return request
        .get('user', {
            custom_url: customUrl,
        })
        .then(({ data }) => data)
}

function requestResetPassword(email) {
    return request
        .post('reset', {
            email,
            // redirect: `${location.protocol}//${location.host}`,
            redirect: `http://${location.host}`,
        })
        .then(({ data }) => data)
}

function resetPassword(password, token) {
    return request
        .post(`reset/${token}`, {
            password,
        })
        .then(({ data }) => data)
}

function updateUser(token, userId, userAttributes) {
    const payload = userAttributes
    const cb = file => {
        if (file) {
            payload.image = file.s3Url
        }

        delete payload.profileImage
        return request
            .auth(token)
            .put(`user/${userId}`, payload)
            .then(({ data }) => data)
            .catch(err =>
                Promise.reject({
                    reason: err.status === 409 ? 'Email is already taken' : err.reason,
                }),
            )
    }

    if (userAttributes.profileImage) {
        return request
            .auth(token)
            .fileUpload('fileupload', {
                blob: userAttributes.profileImage.file,
                filename: `${userId}${Date.now()}.${userAttributes.profileImage.file.type.replace(
                    /image\//,
                    '',
                )}`,
            })
            .then(({ data }) => cb(data))
    }

    return cb()
}

export default {
    signIn,
    signUp,
    verify,
    verifyCustomUrl,
    fetchUser,
    requestResetPassword,
    resetPassword,
    updateUser,
}
