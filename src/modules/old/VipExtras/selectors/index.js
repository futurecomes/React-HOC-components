import { createSelector } from 'reselect';
import _isEmpty from 'lodash/isEmpty';
import _orderBy from 'lodash/orderBy';
import _omitBy from 'lodash/omitBy';

import { BASKET_ELEMENTS } from '../constants/basketElements';

export const getBasicSubscriptions = createSelector(
    state => state.billing.subscriptions,
    subscriptions => _orderBy(subscriptions.filter(t => t.type === 'basic'), 'amount'),
);

export const getPremiumSubscriptions = createSelector(
    state => state.billing.subscriptions,
    subscriptions => _orderBy(subscriptions.filter(t => t.type === 'premium'), 'amount'),
);

export const getEmbedPodcastSubscriptions = createSelector(
    state => state.billing.subscriptions,
    subscriptions => _orderBy(subscriptions.filter(s => s.id.startsWith('embed_podcast')), 'amount'),
);

export const getAdRemovalSubscriptions = createSelector(
    state => state.billing.subscriptions,
    subscriptions => _orderBy(subscriptions.filter(s => s.id.startsWith('ad_removal')), 'amount'),
);

export const isAuthenticated = createSelector(
    state => state.auth.user,
    user => !_isEmpty(user),
);

export const getCurrentUserPlan = createSelector(
    state => state.auth.user,
    state => state.billing.subscriptions,
    (user, subscriptions) => {
        const subscription = subscriptions.find(t => t.id === user.planId);
        return subscription ? subscription.planId : '';
    },
);

export const adRemovalSubscription = createSelector(
    state => state.billing.userSubscriptions,
    subscriptions => subscriptions.find(s => /ad_removal/.test(s.planId)) || {},
);

export const embedPodcastSubscription = createSelector(
    state => state.billing,
    billing => billing.userSubscriptions.find(us => us.planId.startsWith('embed_podcast')) || {},
);

export const getMusicLibrary = createSelector(
    state => state.auth.user,
    state => state.recording.freeMusic,
    (user, musicLibrarySongs) =>
        _isEmpty(user)
            ? musicLibrarySongs.map(e => ({ ...e, paid: false, amount: 500 }))
            : musicLibrarySongs.map(e => ({ ...e, paid: user.musicLibrary.includes(e.id), amount: 500 })),
);

export const isFetchingData = createSelector(
    state => state.recording.freeMusic,
    state => state.billing.subscriptions,
    state => state.billing.vipExtras,
    (freeMusic, subscriptions, vipExtras) => _isEmpty(freeMusic) || _isEmpty(subscriptions) || _isEmpty(vipExtras),
);

export const hasMusicLibraryAccess = createSelector(
    state => state.auth.user,
    user => user.musicLibraryTotalAccess,
);

export const musicItemsAlreadyBought = createSelector(
    getMusicLibrary,
    musicLibraries => musicLibraries.filter(e => e.paid).map(m => m.name),
);

export const getVipExtrasPrices = createSelector(
    state => state.billing.vipExtras,
    vipExtras =>
        Object.entries(_omitBy(vipExtras, e => !Number.isInteger(e))).reduce(
            (acc, [key, amount]) => ({ ...acc, [key]: amount }),
            {},
        ),
);

const determineWhetherToStayInBasket = (musicSongsPaid, plan, musicLibraryAccess) => e => {
    switch (e.basketElement) {
        case BASKET_ELEMENTS.song:
            return !musicSongsPaid.includes(e.name);
        case BASKET_ELEMENTS.plan:
            return plan !== e.planId;
        case BASKET_ELEMENTS.musicLibraryAccess:
            return !musicLibraryAccess;
        default:
            return true;
    }
};

export const getBasket = createSelector(
    state => state.billing.vipExtras.basket,
    getCurrentUserPlan,
    musicItemsAlreadyBought,
    hasMusicLibraryAccess,
    (basket, plan, musicSongsPaid, musicLibraryAccess) =>
        basket.filter(determineWhetherToStayInBasket(musicSongsPaid, plan, musicLibraryAccess)),
);
