import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Loading } from 'src/shared/components/old/Loading';

export default function requireSubscriptionHOC(ComposedComponent) {
    const RequireSubscription = props => {
        if (!props.fetchedSubscriptions) {
            return <Loading />;
        }

        return props.hasPaidFeatureAccess ? <ComposedComponent {...props} /> : <Redirect to="/my-podcasts" />;
    };

    return connect(state => ({
        hasPaidFeatureAccess: state.billing.userSubscriptions.some(s => /premium|basic/.test(s.planId)),
        fetchedSubscriptions: state.billing.fetchedSubscriptions,
    }))(RequireSubscription);
}
