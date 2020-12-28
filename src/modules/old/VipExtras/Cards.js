import React from 'react';

import * as S from './styled';
import { BASKET_ELEMENTS } from './constants/basketElements';
import { Card } from './Card';
import * as ISvg from './static/svg';

const Header = props => (
    <S.HeaderWrapper>
        <S.CardHeader>{props.text}</S.CardHeader>
        <S.JumpCartLink href="#cart">jump to cart</S.JumpCartLink>
    </S.HeaderWrapper>
);

export const Cards = props => (
    <S.CardsWrapper>
        <Header text="Analytics and Ad Removal" />
        <Card
            icon={ISvg.analytics}
            product="Access to Analytics"
            description="When you create a podcast on Messy, we also host your podcast's RSS feed for you. That means we can tell you every time your podcast is played anywhere, whether on Messy, Apple Podcasts, Spotify, or any other place listeners find your podcast. Buying this feature means you will know the total number of listens your podcast gets across every platform, easily accessible in one place, broken down by episode and date. This makes it easy to celebrate your podcast's audience growing, share your analytics with potential sponsors, and see which episodes your listeners love."
            options={props.basicSubscriptions}
            addSubscriptionToBasket={props.addSubscriptionToBasket}
            checkIfDisabled={option =>
                props.getElementsFromBasket(option.id) || props.currentUserPlan === option.planId
            }
        />
        <Card
            icon={ISvg.adRemoval}
            product="Messy.fm Promotional Ad Removal"
            description="Each podcast created on a Messy has an advertisement for Messy inserted into the first six seconds of the podcast. If you'd like to remove this ad, this package is for you."
            options={props.adRemovalSubscriptions}
            addSubscriptionToBasket={props.addSubscriptionToBasket}
            checkIfDisabled={option =>
                props.getElementsFromBasket(option.id) || props.adRemovalSubscription.planId === option.id
            }
        />
        <Card
            bigicon
            icon={ISvg.analyticsAd}
            product="Access to Analytics + Ad Removal"
            options={props.premiumSubscriptions}
            addSubscriptionToBasket={props.addSubscriptionToBasket}
            checkIfDisabled={option =>
                props.getElementsFromBasket(option.id) || props.currentUserPlan === option.planId
            }
        />
        <Header text="Embed Your Podcast Into Another Website" />
        <Card
            icon={ISvg.embedPodcast}
            product="Embed Your Podcast Into Another Website"
            options={props.embedPodcastSubscriptions}
            smallText={`After you have purchased this subscription, your podcast embed code will be visible under the "Settings" tab in "My Podcasts" when you are logged into your Messy account.`}
            addSubscriptionToBasket={props.addSubscriptionToBasket}
            checkIfDisabled={option =>
                props.getElementsFromBasket(option.id) || props.embedPodcastSubscription.planId === option.id
            }
        />
        <Header text="Music" />
        <Card
            icon={ISvg.musicLibrary}
            product="Access to Entire Messy Music Library"
            description="Become a music VIP and get access to our ENTIRE attribution-free library of exclusive music clips with this one-time fee!"
            text="Become a music VIP and get access to our ENTIRE attribution-free library of exclusive music clips with this one-time fee!"
            disabled={props.getElementsFromBasket(BASKET_ELEMENTS.musicLibraryAccess) || props.hasMusicLibraryAccess}
            item={{
                id: BASKET_ELEMENTS.musicLibraryAccess,
                name: 'Access to Entire Messy Music Library',
                amount: props.prices.musicLibraryTotalAccessPrice,
                basketElement: BASKET_ELEMENTS.musicLibraryAccess,
            }}
            addProductToBasket={props.addProductToBasket}
        />
        <Header text="Coaching" />
        <Card
            bigicon
            icon={ISvg.launchPackage}
            product="The Podcast Launch Package"
            description="Want one of our podcast coaches to help walk you through launching your podcast? This package gets you 30 minutes of podcast coaching to answer ALL of your questions - from thinking through show ideas, deciding on guests, answering any technical questions, and help you develop a launch strategy to get your first episodes live with a splash - we can help!"
            smallText="Once you have bought a package, one of our podcast coaches will be in touch within one business day to schedule your call at a time that works for you."
            disabled={props.getElementsFromBasket(BASKET_ELEMENTS.launchPackage)}
            item={{
                id: BASKET_ELEMENTS.launchPackage,
                name: 'The Podcast Launch Package',
                amount: props.prices.podcastLaunchPackagePrice,
                basketElement: BASKET_ELEMENTS.launchPackage,
            }}
            addProductToBasket={props.addProductToBasket}
        />
        <Card
            bigicon
            icon={ISvg.growthPackage}
            product="The Podcast Growth Package"
            description={`Do you have at least three episodes live and want to know how to attract even more listeners? This package gets you 30 minutes of podcast coach for a customized approach to walk you through the what you need to do to land more listeners AND turn current listeners into superfans. You've launched - it's time to grow!`}
            smallText="Once you have bought a package, one of our podcast coaches will be in touch within one business day to schedule your call at a time that works for you."
            disabled={props.getElementsFromBasket(BASKET_ELEMENTS.growthPackage)}
            item={{
                id: BASKET_ELEMENTS.growthPackage,
                name: 'The Podcast Growth Package',
                amount: props.prices.podcastGrowthPackagePrice,
                basketElement: BASKET_ELEMENTS.growthPackage,
            }}
            addProductToBasket={props.addProductToBasket}
        />
        <Card
            bigicon
            icon={ISvg.launchGrowthPackage}
            product="The Podcast Monetization Package"
            description={`Do you want personalized advice on how to make money from your podcast? This package is a 30 minute call with one of our podcast coaches for a customized approach on how to approach sponsors, work with brands, and other ways to turn your podcast into a revenue-generator for you and/or your company.`}
            smallText="Once you have bought a package, one of our podcast coaches will be in touch within one business day to schedule your call at a time that works for you."
            disabled={props.getElementsFromBasket(BASKET_ELEMENTS.monetizationPackage)}
            item={{
                id: BASKET_ELEMENTS.monetizationPackage,
                name: 'The Podcast Monetization Package',
                amount: props.prices.podcastMonetizationPackagePrice,
                basketElement: BASKET_ELEMENTS.monetizationPackage,
            }}
            addProductToBasket={props.addProductToBasket}
        />
        <Card
            bigicon
            icon={ISvg.monetizationPackage}
            product="The Complete Podcast Coaching Experience"
            description={`Want to become a podcast master? Purchasing this package entitles you to three 1:1 30 minute sessions with one of our podcast coaches, focused on launching, growing, and monetizing your show.`}
            smallText="Once you have bought a package, one of our podcast coaches will be in touch within one business day to schedule your call at a time that works for you."
            disabled={props.getElementsFromBasket(BASKET_ELEMENTS.completePackage)}
            item={{
                id: BASKET_ELEMENTS.completePackage,
                name: 'The Complete Podcast Coaching Experience',
                amount: props.prices.podcastCompletePackagePrice,
                basketElement: BASKET_ELEMENTS.completePackage,
            }}
            addProductToBasket={props.addProductToBasket}
        />
    </S.CardsWrapper>
);
