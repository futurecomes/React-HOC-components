import { combineReducers } from 'redux';

import { editEpisodeForm } from 'src/modules/old/Shows/reducers/editEpisodeForm';

export const forms = combineReducers({
    editEpisodeForm,
});
