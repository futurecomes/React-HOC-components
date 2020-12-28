import { connect } from 'react-redux';

import { addToBasket, removeFromBasket } from '../pricingActions';

const availablePlans = ['basic', 'premium', 'ad_removal', 'embed_podcast'];

// checking from backend response here
const isPlanSubscribed = (subArr, searchFor) => !!subArr.find(sub => sub.planId.startsWith(searchFor));

export const BasketContainer = connect(
    state => ({
        basket: state.pricing.basketItems,
        userSubscriptionsFetched: state.billing.fetchedSubscriptions,
        userSubscriptions: availablePlans.reduce(
            (prev, curr) => ({ ...prev, [curr]: isPlanSubscribed(state.billing.userSubscriptions, curr) }),
            {},
        ),
    }),
    {
        addToBasket,
        removeFromBasket,
    },
);
