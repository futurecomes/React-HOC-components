export const SIGN_OUT_FULFILLED = 'SIGN_OUT_FULFILLED'
export const signOutFulfilled = () => ({
    type: SIGN_OUT_FULFILLED,
})

export const SIGN_OUT_REJECTED = 'SIGN_OUT_REJECTED'
export const signOutRejected = () => ({
    type: SIGN_OUT_REJECTED,
})

export const UPDATE_USER = 'UPDATE_USER'
export const updateUser = payload => ({
    type: UPDATE_USER,
    payload,
})
