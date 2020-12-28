import React, { Component } from 'react';
import { connect } from 'react-redux';

import Confirmation from 'src/shared/components/old/Billing/Confirmation';
import { clearNewBilling } from 'src/shared/components/old/Billing/actions';

function mapStateToProps({
    billing: { isFetching, currentPlan, subscriptions, hasCheckedPayment, isNewlyBilled },
    auth,
}) {
    return {
        isAuthLoaded: !auth.isFetching,
        isFetching,
        isUpgraded: !!currentPlan,
        hasSubscriptions: subscriptions.length > 0,
        hasFetchedPlan: hasCheckedPayment && !isFetching,
        isNewlyBilled,
    };
}

class RequireUpgradeComp extends Component {
    render() {
        if (this.props.isFetching || !this.props.isAuthLoaded) {
            return null;
        }

        return (
            <div className={this.props.className}>
                {this.props.isNewlyBilled && <Confirmation clearNewBilling={this.props.clearNewBilling} />}
                {this.props.children}
            </div>
        );
    }
}

RequireUpgradeComp.defaultProps = {
    currentPlan: null,
    className: '',
};

export const RequireUpgrade = connect(
    mapStateToProps,
    {
        clearNewBilling,
    },
)(RequireUpgradeComp);

export default function requireUpgradeHOC(ComposedComponent) {
    return props => (
        <RequireUpgrade>
            <ComposedComponent {...props} />
        </RequireUpgrade>
    );
}
