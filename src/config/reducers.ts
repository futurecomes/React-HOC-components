import { reducer as reduxForm } from 'redux-form';
import undoable, { excludeAction } from 'redux-undo';

import {
    EDITOR_ADD_AD_RECORDING_SNIPPET,
    EDITOR_INCREMENT_TIMELINE,
    EDITOR_RECOMPUTE_TIMELINE_LENGTH,
    EDITOR_SET_PAUSE,
    EDITOR_SET_SNIPPET_DURATION,
    EDITOR_SET_TIMELINE_TIME,
} from 'src/actions/old/editor';
import { reducer as audio } from 'src/middlewares/audio';
import { artCreator } from 'src/modules/old/artCreator/reducers/artCreator';
import billing from 'src/shared/components/old/Billing/reducers/billing';

// LEGACY REDUCERS
import { analytics } from 'src/modules/Analytics/reducers/analyticsReducer';
import { auth } from 'src/modules/Auth/reducers/authReducer';
import podcasts from 'src/modules/Podcasts/reducers/podcastsReducer';
import { profile } from 'src/modules/Profile/reducers/profileReducer';
import { shows } from 'src/modules/Shows/reducers/showsReducer';
import admin from 'src/reducers/admin';
import ads from 'src/reducers/ads';
import editorReducer from 'src/reducers/editor';
import editorMeta from 'src/reducers/editorMeta';
import { forms } from 'src/reducers/forms';
import messages from 'src/reducers/messages';
import pages from 'src/reducers/pages';
import isPersisted from 'src/reducers/persist';
import recording from 'src/reducers/recording';
import ui from 'src/reducers/ui';

// NEW REDUCERS
import showsReducers from 'src/modules/old/Shows/reducers';
import singleEpisodeReducer from 'src/modules/Podcasts/Episode/reducers/SingleEpisodeReducer';
import { pricing } from 'src/modules/Pricing/pricingReducer';

const excludedActions = [
    EDITOR_SET_SNIPPET_DURATION,
    EDITOR_RECOMPUTE_TIMELINE_LENGTH,
    EDITOR_INCREMENT_TIMELINE,
    EDITOR_ADD_AD_RECORDING_SNIPPET,
    EDITOR_SET_TIMELINE_TIME,
    EDITOR_SET_PAUSE,
];

export const reducers = {
    singleEpisodeReducer,
    form: reduxForm,
    ads,
    auth,
    admin,
    messages,
    pages,
    ui,
    podcasts,
    audio,
    recording,
    editor: undoable(editorReducer, {
        filter: excludeAction(excludedActions),
    }),
    editorMeta,
    shows,
    billing,
    profile,
    isPersisted,
    artCreator,
    analytics,
    forms,
    showsReducers,
    pricing,
};
