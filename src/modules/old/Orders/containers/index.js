import React from 'react';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { Elements } from 'react-stripe-elements';

import 'src/shared/components/old/common/Table/table.css';
import { updateBillingData } from 'src/shared/components/old/Billing/actions';
import { cancelSubscription, reactivateSubscription } from 'src/shared/components/old/Billing/actions/subscriptions';

import * as S from '../styled';
import { OrdersHistory } from '../OrdersHistory';
import { UpdateCardForm } from '../UpdateCardForm';

export class OrdersContainer extends React.Component {
    render() {
        return (
            <S.PageWrapper>
                <S.Title>
                    Orders
                </S.Title>
                <OrdersHistory {...this.props} />
                {this.props.isCustomer && (
                    <Elements>
                        <UpdateCardForm
                            updateBillingData={this.props.updateBillingData}
                            authToken={this.props.authToken}
                            last4={this.props.last4}
                        />
                    </Elements>
                )}
            </S.PageWrapper>
        );
    }
}

const mapStateToProps = ({ billing, auth }) => ({
    subscriptions: billing.userSubscriptions,
    musicLibraryPayments: billing.musicLibraryPayments,
    coaching: billing.coaching,
    last4: billing.last4,
    isCustomer: !!auth.user.stripeToken,
    authToken: auth.user.token,
});

export const Orders = connect(
    mapStateToProps,
    {
        cancelSubscription,
        reactivateSubscription,
        updateBillingData,
    },
)(OrdersContainer);
