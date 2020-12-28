import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'react-emotion';
import { Spin } from 'antd';

import { Button } from 'src/shared/components/Button';

import { basketConverter } from '../pricingHelpers';
import { CardFormContainer } from '../containers/CardFormContainer';

const StyledCardElement = styled(CardElement)({
    marginBottom: '1rem',
});

const BasketCardFormComponent = ({ basket, availableSubscriptions, stripe, pricingPayment, paymentStatus }) => (
    <Spin spinning={paymentStatus.processing} size="large">
        <StyledCardElement />
        <Button
            onClick={async e => {
                const stripeTokenCreator = await stripe.createToken();
                pricingPayment({
                    basket: basketConverter(basket, availableSubscriptions),
                    stripe_token: stripeTokenCreator.token,
                });
            }}
            fullWidth
        >
            {paymentStatus.processing ? 'PAYING...' : 'PAY'}
        </Button>
    </Spin>
);

export const BasketCardForm = CardFormContainer(injectStripe(BasketCardFormComponent));
