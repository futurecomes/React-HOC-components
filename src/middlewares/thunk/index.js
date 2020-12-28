function createThunkMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, getState().auth.token)
        }

        return next(action)
    }
}

export default createThunkMiddleware()
