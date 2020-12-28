import { combineEpics } from 'redux-observable';

import { pricingEpic } from 'src/modules/Pricing/pricingEpic';
import { authEpicFactory } from 'src/epics';
import { billingEpicFactory } from 'src/shared/components/old/Billing/epics';
import { musicLibraryEpicFactory } from 'src/shared/components/old/Billing/epics/musicLibrary';
import { subscriptionsEpicFactory } from 'src/shared/components/old/Billing/epics/subscriptions';
import { fileUploadEpicFactory } from 'src/modules/old/Recording/epics';
import { editorEpicFactory } from 'src/modules/old/Editor/epics';
import { mediaRecorderEpicFactory } from 'src/modules/old/Recording/epics/mediaRecorder';
import { draftsEpicFactory } from 'src/modules/old/Drafts/epics';
import { showEpicFactory } from 'src/modules/old/Shows/epics/showEpic';
import { adminShowsEpicFactory } from 'src/modules/old/Admin/epics/adminShowsEpicFactory';
import { adminAnalyticsEpicFactory } from 'src/modules/old/Admin/epics/analyticsEpicFactory';
import { vipExtrasEpicFactory } from 'src/modules/old/VipExtras/epics/vipExtrasEpicFactory';
import { userEpic } from 'src/modules/old/Admin/epics/userEpic';
import { coachingEpic } from 'src/modules/old/Admin/Coaching/epics/coachingEpicFactory';
import { listenEpic } from 'src/modules/Podcasts/Listen/epics/listenEpic';
import singleEpisodeEpic from 'src/modules/Podcasts/Episode/epics/episodeEpics';
import { podcastEpic } from 'src/modules/Podcasts/epics/podcastEpic';
import { analyticsEpic } from 'src/modules/Analytics/epics/analyticsEpic';

export const rootEpic = combineEpics(
    pricingEpic,
    singleEpisodeEpic,
    podcastEpic,
    listenEpic,
    adminShowsEpicFactory(),
    authEpicFactory(),
    adminAnalyticsEpicFactory(),
    fileUploadEpicFactory(),
    editorEpicFactory(),
    mediaRecorderEpicFactory(),
    draftsEpicFactory(),
    showEpicFactory(),
    billingEpicFactory(),
    musicLibraryEpicFactory(),
    vipExtrasEpicFactory(),
    coachingEpic,
    subscriptionsEpicFactory(),
    userEpic,
    analyticsEpic,
);
