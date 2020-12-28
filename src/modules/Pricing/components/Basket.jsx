import React, { useState } from 'react';
import styled from 'react-emotion';
import { Col } from 'antd';

import { media, font } from 'src/styles/variables';
import * as S from 'src/styles/sections';
import KidsWithTablet from 'src/public/svg/KidsWithTablet.svg';

import { BasketContainer } from '../containers/BasketContainer';
import * as pricingTexts from '../pricingTexts.json';
import { basketTotalAmountCalc } from '../pricingHelpers';
import { BasketCardForm } from './BasketCardForm';
import { BasketItem } from './BasketItem';
import { BasketCheckoutPanel } from './BasketCheckoutPanel';

const SectionWrapper = styled(S.SectionWrapper)({
    [media.lg]: {
        padding: '3rem 3rem',
    },
});

const ContentWrapper = styled(S.ContentWrapper)({
    '&.ant-row-flex': {
        padding: 0,
        [media.md]: {
            flexDirection: 'row-reverse',
        },
    },
});

const BasketContentWrapper = styled(Col)({
    marginBottom: '1rem',
    [media.md]: {
        padding: '1rem',
    },
    [media.lg]: {
        padding: '2rem',
    },
});

const ImageContainer = styled(Col)({
    [media.xs]: {
        display: 'flex',
        justifyContent: 'center',
    },
});

const CartHeader = styled('h1')({
    fontSize: font.size.large,
});

const allAvailableItems = [...pricingTexts.bundlesPicker.bundles, ...pricingTexts.packagesPicker];

const BasketComponent = ({ basket, removeFromBasket, pricingPayment, stripe }) => {
    const [isCheckout, toggleIsCheckout] = useState(false);
    const basketTotalAmount = basketTotalAmountCalc(basket, allAvailableItems);
    const toCheckout = () => toggleIsCheckout(!isCheckout);

    return (
        <SectionWrapper>
            <ContentWrapper type="flex" justify="center" align="middle">
                <BasketContentWrapper xs={24} md={14} xl={12}>
                    <CartHeader>Your Cart</CartHeader>
                    {basket.map(item => {
                        const pickedItemInfo = allAvailableItems.find(feature => feature.plan_id === item.plan_id);
                        const pickedItemValue = pickedItemInfo.options
                            ? pickedItemInfo.options.find(option => option.timePeriod === item.timePeriod).value
                            : pickedItemInfo.value;
                        const onDeleteClick = () => {
                            removeFromBasket(item);
                        };
                        return (
                            <BasketItem
                                key={`basket-${item.plan_id}-${item.timePeriod}`}
                                name={pickedItemInfo.name}
                                timePeriod={item.timePeriod}
                                value={pickedItemValue}
                                onDeleteClick={onDeleteClick}
                            />
                        );
                    })}

                    {isCheckout && basket.length > 0 ? (
                        <BasketCardForm basket={basket} />
                    ) : (
                        <BasketCheckoutPanel amount={basketTotalAmount} toCheckout={toCheckout} />
                    )}
                </BasketContentWrapper>

                <ImageContainer xs={24} md={10} xl={12}>
                    <img alt={'Kids with tablet'} src={KidsWithTablet} />
                </ImageContainer>
            </ContentWrapper>
        </SectionWrapper>
    );
};

export const Basket = BasketContainer(BasketComponent);
