import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import React from 'react';

import { pricingPayment } from '../pricingActions';

export const CardFormContainer = Component =>
    connect(
        state => ({
            basket: state.pricing.basketItems,
            availableSubscriptions: state.pricing.availableSubscriptions,
            paymentStatus: state.pricing.paymentStatus,
        }),
        {
            pricingPayment,
        },
    )(props => (
        <Elements>
            <Component {...props} />
        </Elements>
    ));
