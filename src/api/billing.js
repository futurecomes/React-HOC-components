import request from './core';
import AuthApi from './auth';

import { STRIPE_KEY } from 'src/config/settings';

const Stripe = window.Stripe;

if (Stripe) {
    Stripe.setPublishableKey(STRIPE_KEY);
} else {
    // eslint-disable-next-line
    console.info('Stripe is not loaded. There may be an issue with the internet connection.');
}

function fetchCurrentPlan(token, userId) {
    return request
        .auth(token)
        .get('payment', {
            userId,
        })
        .then(({ data }) => data || {});
}

function fetchSubscriptions(token) {
    return request
        .auth(token)
        .get('payment_tier')
        .then(({ data }) => data);
}

function setFreePlan(token) {
    return request
        .auth(token)
        .put('user/choose_free_plan', {})
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function applyCoupon(token, code) {
    return request
        .auth(token)
        .get(`coupon/${code}`)
        .then(({ data }) => data);
}

function deactivatePlan(token) {
    return request
        .auth(token)
        .put(`payment`, {
            active: false,
        })
        .then(({ data }) => data)
        .catch(() => {
            /* Ignore */
        });
}

function submitPayment(token, { name, cardNumber, cvc, expirationMonth, expirationYear, planId, promoCode }) {
    return new Promise((resolve, reject) => {
        Stripe.card.createToken(
            {
                name,
                number: cardNumber,
                cvc,
                exp_month: expirationMonth,
                exp_year: expirationYear,
            },
            (_status, { error, id }) => {
                if (error) {
                    return reject(error.message);
                }

                const params = {
                    planId,
                    token: id,
                };

                if (promoCode) {
                    params.coupon = promoCode;
                }

                return request
                    .auth(token)
                    .post('payment', params)
                    .then(res => resolve(res.data))
                    .catch(({ reason }) => reject(reason));
            },
        );
    });
}

function registerMember(token, user) {
    return AuthApi.updateUser(token, user.id, {
        ...user,
        memberSince: Date.now(),
    });
}

function reactivateSubscription(token, subscriptionId) {
    return request.auth(token).post(`reactivate_subscription`, { subscriptionId });
}

function cancelSubscription(token, subscriptionId) {
    return request.auth(token).post('cancel_subscription', { subscriptionId });
}

function buyMusicLibraryItems(token, stripeToken, musicItems) {
    return request.auth(token).post('payment/free_music', { stripeToken, musicItems });
}

function buyMusicLibraryTotalAccess(token, stripeToken) {
    return request.auth(token).post('payment/free_music_total', { stripeToken });
}

const finalizeExpressAccount = (token, authorizationCode) =>
    request.auth(token).post('payment/express/finalize', { authorizationCode });

const createExpressLink = token =>
    request
        .auth(token)
        .get('payment/express/create_link')
        .then(({ data }) => data);

const setDefaultCard = (authToken, stripeToken) =>
    request.auth(authToken).post('stripecard/default', { token: stripeToken });

const cancelMonthlyListenerSupportSubscription = (token, jobId) =>
    request.auth(token).post('show/support/cancel', { jobId });

export default {
    fetchCurrentPlan,
    fetchSubscriptions,
    setFreePlan,
    applyCoupon,
    submitPayment,
    registerMember,
    deactivatePlan,
    reactivateSubscription,
    buyMusicLibraryItems,
    buyMusicLibraryTotalAccess,
    cancelSubscription,
    finalizeExpressAccount,
    createExpressLink,
    setDefaultCard,
    cancelMonthlyListenerSupportSubscription,
};
