import React from 'react';
import styled from 'react-emotion';

import * as S from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import analyticsIcon from '../../svg/analytics.svg';
import embedIcon from '../../svg/embed.svg';
import moneyIcon from '../../svg/money.svg';
import musicIcon from '../../svg/music.svg';
import promoteIcon from '../../svg/promote.svg';
import protectIcon from '../../svg/protect.svg';
import publishIcon from '../../svg/publish.svg';
import rssIcon from '../../svg/rss.svg';

import * as homepageTexts from '../../models/homepageTexts.json';
import { ExtraFeatureCard, ExtraFeatureCardProps } from './ExtraFeatureCard';

const icons = {
    rss: rssIcon,
    music: musicIcon,
    publish: publishIcon,
    analytics: analyticsIcon,
    money: moneyIcon,
    promote: promoteIcon,
    protect: protectIcon,
    embed: embedIcon,
};

const Header = styled.h2({
    marginBottom: '2rem',
    fontSize: font.size.large,
    textAlign: 'center',
});

const CardsWrapper = styled.div({
    position: 'relative',
    zIndex: 2,
    [media.md]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export const ExtraFeatures: React.FC = () => {
    const texts = homepageTexts.extraFeatures;

    return (
        <S.SectionWrapper backgroundColor={color.solitude}>
            <S.ContentWrapper>
                <Header>{texts.header}</Header>
                <CardsWrapper>
                    {texts.cards.map((card: ExtraFeatureCardProps) => (
                        <ExtraFeatureCard
                            key={card.title}
                            description={card.description}
                            icon={icons[card.icon]}
                            title={card.title}
                        />
                    ))}
                </CardsWrapper>
            </S.ContentWrapper>
        </S.SectionWrapper>
    );
};
