import { connect } from 'react-redux';

import { fetchCurrentPlan } from 'src/shared/components/old/Billing/actions';

import { fetchSubscriptions } from '../pricingActions';

export const PricingContainer = connect(
    state => ({ userSubscriptionsFetched: state.billing.fetchedSubscriptions }),
    { fetchSubscriptions, fetchCurrentPlan },
);
