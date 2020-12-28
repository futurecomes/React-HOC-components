import React from 'react';
import styled from 'react-emotion';
import { Collapse, Spin, Icon } from 'antd';

import { font, media } from 'src/styles/variables';
import * as S from 'src/styles/sections';

import * as pricingTexts from '../pricingTexts.json';
import { BasketContainer } from '../containers/BasketContainer';
import { BundlesPickerHeader } from './BundlesPickerHeader.jsx';
import { AuthContainer } from '../containers/authContainer.js';
import { notLoggedInNotification } from './Notifications';

const Panel = Collapse.Panel;

const FeaturesCollapsePanel = styled(Panel)({
    '&.ant-collapse-item': {
        '.ant-collapse-content': {
            '.ant-collapse-content-box': {
                [media.lg]: {
                    paddingLeft: '2.5rem',
                    paddingRight: '55%',
                    textAlign: 'justify',
                },
            },
        },
    },
});

const BundlesPickerWrapper = styled.div({
    width: '100%',
});

const TimePeriodsWrapper = styled.div({
    display: 'none',
    width: '98%', // changed because antd collapse
    justifyContent: 'space-between',
    paddingLeft: '2.5rem',
    [media.lg]: {
        display: 'flex',
        paddingLeft: '50%',
    },
});

const TimePeriodLabel = styled.p({
    fontSize: font.size.small,
});

const BundleDescription = styled.p({
    fontSize: font.size.extraSmall,
});

const FeaturesHeader = styled.p({
    fontSize: font.size.medium,
    fontWeight: font.weight.bold,
    margin: 0,
    [media.lg]: {
        marginBottom: '1rem',
    },
});

const FeaturesRenewalText = styled.p({
    fontSize: font.size.small,
    [media.lg]: {
        fontSize: font.size.extraSmall,
    },
});

const BundlesPickerComponent = ({
    userSubscriptions,
    userSubscriptionsFetched,
    basket,
    addToBasket,
    removeFromBasket,
    isUserLogged,
}) => {
    const onBundlePick = pickedBundle => {
        if (!isUserLogged) {
            notLoggedInNotification();
        } else {
            removeFromBasket(pickedBundle);
            addToBasket(pickedBundle);
        }
    };
    return (
        <S.SectionWrapper>
            <S.ContentWrapper>
                <Spin spinning={isUserLogged && !userSubscriptionsFetched} size="large">
                    <BundlesPickerWrapper>
                        <FeaturesHeader>Upgrades</FeaturesHeader>
                        <FeaturesRenewalText>
                            * These packages are subscriptions that automatically renew.
                        </FeaturesRenewalText>
                        <TimePeriodsWrapper>
                            {pricingTexts.bundlesPicker.periods.map(period => (
                                <TimePeriodLabel key={period}>{period}</TimePeriodLabel>
                            ))}
                        </TimePeriodsWrapper>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                        >
                            {pricingTexts.bundlesPicker.bundles.map(bundle => {
                                const selectedBundle = basket.find(basketItem => basketItem.plan_id === bundle.plan_id);

                                const isBundleAlreadySubscribed = userSubscriptions[bundle.plan_id];
                                const CollapseHeadder = (
                                    <BundlesPickerHeader
                                        bundle={bundle}
                                        selected={selectedBundle}
                                        onPick={onBundlePick}
                                        isAlreadySubscribed={isBundleAlreadySubscribed}
                                        removeFromBasket={removeFromBasket}
                                    />
                                );
                                return (
                                    <FeaturesCollapsePanel key={bundle.name} header={CollapseHeadder}>
                                        <BundleDescription>{bundle.description}</BundleDescription>
                                    </FeaturesCollapsePanel>
                                );
                            })}
                        </Collapse>
                    </BundlesPickerWrapper>
                </Spin>
            </S.ContentWrapper>
        </S.SectionWrapper>
    );
};

export const BundlesPicker = AuthContainer(BasketContainer(BundlesPickerComponent));
