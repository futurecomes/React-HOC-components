import createReducer from './createReducer';

import { UI_TOGGLE_PLAYER_MODAL } from 'src/actions/old/ui';

const initialState = {
    isPlayerModalVisible: false,
};

// Action Handlers
const handlers = {
    [UI_TOGGLE_PLAYER_MODAL]: state => ({
        ...state,
        isPlayerModalVisible: !state.isPlayerModalVisible,
    }),
};

// Reducer
export default createReducer(handlers, initialState);
