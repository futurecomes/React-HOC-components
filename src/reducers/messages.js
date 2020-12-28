import createReducer from './createReducer';

import { MESSAGES_SET } from 'src/actions/old/messages';
import { AUTH_SIGN_OUT } from 'src/modules/Auth/actions/auth';

const initialState = {
    form: {
        errors: [],
        successes: [],
    },
};

// Action Handlers
const handlers = {
    [MESSAGES_SET]: (state, { payload }) => ({
        ...state,
        [payload.name]: {
            errors: payload.errors,
            successes: payload.successes,
        },
    }),
    [AUTH_SIGN_OUT]: () => ({
        ...initialState,
    }),
};

// Reducer
export default createReducer(handlers, initialState);
