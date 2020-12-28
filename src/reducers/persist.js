import { REHYDRATE } from 'redux-persist/constants'

import createReducer from './createReducer'

// Action Handlers
const handlers = {
    [REHYDRATE]: () => true,
}

const initialState = false

// Reducer
export default createReducer(handlers, initialState)
