import React from 'react';
import styled from 'react-emotion';

import { color, font } from 'src/styles/variables';
import { Button } from 'src/shared/components/Button';

import { BasketContainer } from '../containers/BasketContainer';
import { AuthContainer } from '../containers/authContainer';
import { notLoggedInNotification } from './Notifications';

const CardWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '18rem',
    backgroundColor: color.white,
    padding: '2rem',
    boxShadow: `0 0 2rem ${color.blackShadow}`,
});

const TextWrapper = styled.div({
    textAlign: 'center',
});

const PreText = styled.p({
    fontSize: font.size.extraSmall,
    minHeight: '4.8rem',
    marginBottom: '1rem',
});

const ValueText = styled.h2({
    fontWeight: font.weight.bold,
    marginBottom: 0,
});

const NameText = styled.h1({
    color: color.tundora,
    fontSize: font.size.medium,
    fontWeight: font.weight.bold,
    marginBottom: '2rem',
});

const DescriptionText = styled.p({
    color: color.dustyGrey,
    fontSize: font.size.extraSmall,
});

const PackagesPickerCardComponent = ({ basket, bundle, addToBasket, isUserLogged }) => {
    const addBundleToBasket = () => addToBasket({ plan_id: bundle.plan_id });
    return (
        <CardWrapper>
            <TextWrapper>
                <PreText>{bundle.pre}</PreText>
                <ValueText>{`$${bundle.value}`}</ValueText>
                <NameText>{bundle.name}</NameText>
                <DescriptionText>{bundle.description}</DescriptionText>
            </TextWrapper>
            <Button
                disabled={basket.find(item => item.plan_id === bundle.plan_id)}
                fullWidth
                onClick={isUserLogged ? addBundleToBasket : notLoggedInNotification}
            >
                BUY
            </Button>
        </CardWrapper>
    );
};

export const PackagesPickerCard = AuthContainer(BasketContainer(PackagesPickerCardComponent));
