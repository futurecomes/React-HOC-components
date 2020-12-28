import React, { useState, useEffect } from 'react';
import styled from 'react-emotion';

import { FirstLook } from './components/FirstLook';
import { BundlesPicker } from './components/BundlesPicker';
import { PackagesPicker } from './components/PackagesPicker';
import { Basket } from './components/Basket';
import { PricingContainer } from './containers/PricingContainer';

const PricingWrapper = styled.div({
    width: '100%',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app, only on new pages for now
});

const Pricing = ({ userSubscriptionsFetched, fetchSubscriptions, fetchCurrentPlan }) => {
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        if (!initialized) {
            fetchSubscriptions();
            !userSubscriptionsFetched && fetchCurrentPlan();
            setInitialized(true);
        }
    });

    return (
        <PricingWrapper>
            <FirstLook />
            <BundlesPicker />
            <PackagesPicker />
            <Basket />
        </PricingWrapper>
    );
};

export default PricingContainer(Pricing);
