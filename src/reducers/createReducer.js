export default function createReducer(handlers, initialState = {}) {
    return function reducer(state = initialState, action) {
        const handler = handlers[action.type]

        return handler ? handler(state, action) : state
    }
}
