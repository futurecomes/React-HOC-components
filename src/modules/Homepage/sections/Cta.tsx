import React from 'react';
import styled from 'react-emotion';

import { StartNowButton } from 'src/common/components/StartNowButton';
import * as S from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import * as homepageTexts from '../models/homepageTexts.json';

interface Props {
    hideOnDesktop?: boolean;
}

const CtaSectionWrapper = styled(S.SectionWrapper)<Props>(({ hideOnDesktop }) => ({
    overflow: 'hidden',
    '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '-1rem',
        right: '3rem',
        width: '90vw',
        height: '90vw',
        borderRadius: '100%',
        backgroundColor: color.white,
        opacity: 0.05,
        [media.sm]: {
            width: '70vw',
            height: '70vw',
        },
        [media.md]: {
            width: '50vw',
            height: '50vw',
        },
    },
    [media.md]: {
        display: hideOnDesktop ? 'none' : 'flex',
    },
}));

const Header = styled.h2({
    fontSize: font.size.large,
    lineHeight: 1.6,
    whiteSpace: 'pre-line',
    color: color.white,
});

export const Cta: React.FC<Props> = ({ hideOnDesktop }) => (
    <CtaSectionWrapper backgroundColor={color.royalBlue} hideOnDesktop={hideOnDesktop}>
        <S.ContentWrapper centered={1}>
            <Header>{homepageTexts.firstLook.header}</Header>
            <StartNowButton type="secondary" />
        </S.ContentWrapper>
    </CtaSectionWrapper>
);
