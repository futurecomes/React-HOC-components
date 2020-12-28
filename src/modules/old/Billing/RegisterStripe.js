/* eslint-disable no-restricted-globals */
import React from 'react';

import { stripeConnectClientId } from 'src/config/settings';

import * as S from './styled';

export const RegisterStripe = () => (
    <S.stripeContainer>
        <S.Title>{`Connect your
            Messy.fm account to Stripe `}</S.Title>
        <S.Text>
            Stripe is a well-respected payment processing platform that safely handles all of Messy's credit card
            processing.
        </S.Text>
        <S.Text>
            To start collecting Listener Support payments, you will need to set up an account on Stripe to process your
            Listener Support payments.
        </S.Text>
        <S.Text>
            You only need to do this one time. After you have set up your Stripe account, you can then log into Stripe
            as often as you want to check your Listener Support balance.
        </S.Text>
        <S.Text>
            Your listeners will not need to set up a Stripe account to support your podcast - this is something only you
            need to do as the podcast owner.
        </S.Text>
        <S.StripeLink
            href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${
                location.origin
            }/billing/finalize-express&client_id=${stripeConnectClientId}`}
        >
            Setup Payments
        </S.StripeLink>
    </S.stripeContainer>
);
