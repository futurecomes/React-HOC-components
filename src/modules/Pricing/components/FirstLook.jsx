import React from 'react';
import styled from 'react-emotion';
import { media, font, color } from 'src/styles/variables';
import { Col } from 'antd';

import * as S from 'src/styles/sections';

import * as pricingTexts from '../pricingTexts.json';

const FirstLookSectionWrapper = styled(S.SectionWrapper)({
    [media.sm]: {
        padding: '5rem 0',
        display: 'flex',
    },
});

const TextWrapper = styled(Col)({
    textAlign: 'left',
    zIndex: 1,
    padding: '0 3rem',
});

const Header = styled.h1({
    color: color.white,
    fontSize: font.size.extraLarge,
    whiteSpace: 'pre-line',
    lineHeight: 1.1,
    marginBottom: 0,
});

const Circle = styled.div({
    position: 'absolute',
    top: '-10rem',
    right: '-17.5rem',
    width: '35rem',
    height: '35rem',
    zIndex: 0,
    backgroundColor: color.brightShadow,
    borderRadius: '50%',
    [media.md]: {
        width: '50rem',
        height: '50rem',
        top: '-19rem',
        left: '-7rem',
        right: 0,
        display: 'block',
    },
});

const Description = styled.p(({ bold = false }) => ({
    color: color.white,
    fontSize: font.size.medium,
    fontWeight: bold ? font.weight.normal : font.weight.light,
    margin: '1rem 0',
    whiteSpace: 'pre-line',
}));

export const FirstLook = () => (
    <FirstLookSectionWrapper backgroundColor={color.blackPearl}>
        <S.ContentWrapper>
            <TextWrapper xs={24} sm={16} md={12}>
                <Header>{pricingTexts.firstLook.header}</Header>
                <Description>{pricingTexts.firstLook.description}</Description>
                <Description bold>{pricingTexts.firstLook.subdescription}</Description>
            </TextWrapper>
            <Circle />
        </S.ContentWrapper>
    </FirstLookSectionWrapper>
);
