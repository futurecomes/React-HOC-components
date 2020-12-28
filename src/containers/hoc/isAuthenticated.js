import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser, setCreditCardWarning } from 'src/modules/Auth/actions/auth';
import { fetchCurrentPlan } from 'src/shared/components/old/Billing/actions';

function mapStateToProps(state) {
    const user = state.auth.user;
    return {
        isLoading: !state.isPersisted,
        isAdmin: !!user.admin,
        isAuthenticated: !!state.auth.token,
        hasUser: !!user.id,
        isFetching: state.auth.isFetching,
        user,
        showCreditCardWarning: state.auth.showCreditCardWarning,
        hasCheckedPayment: state.billing.hasCheckedPayment,
        currentPlan: state.billing.currentPlan,
        hasPaidFeatureAccess: state.billing.userSubscriptions.some(s => /premium|basic/.test(s.planId)),
        fetchedSubscriptions: state.billing.fetchedSubscriptions,
    };
}

export default function isAuthenticatedHOC(ComposedComponent) {
    class IsAuthenticated extends Component {
        componentWillReceiveProps({ isAuthenticated, isLoading }) {
            if (!isLoading && this.props.isLoading && !this.hasFetched) {
                this.props.fetchUser(isAuthenticated);
                this.hasFetched = true;
            }
        }

        render() {
            return this.props.isFetching ? null : <ComposedComponent {...this.props} />;
        }
    }

    IsAuthenticated.defaultProps = {
        currentPlan: {},
    };

    return connect(
        mapStateToProps,
        {
            fetchUser,
            setCreditCardWarning,
            fetchBillingInfo: fetchCurrentPlan,
        },
    )(IsAuthenticated);
}
