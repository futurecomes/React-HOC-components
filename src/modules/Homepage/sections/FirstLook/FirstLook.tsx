import { Col } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import { StartNowButton } from 'src/common/components/StartNowButton';
import * as S from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import * as homepageTexts from '../../models/homepageTexts.json';
import { FirstLookIllustration } from './FirstLookIllustration';

const FirstLookSectionWrapper = styled(S.SectionWrapper)({
    [media.sm]: {
        paddingBottom: 0,
    },
    [media.lg]: {
        paddingTop: '6rem',
    },
    [media.xl]: {
        paddingTop: '12rem',
    },
});

const FirstLookContentWrapper = styled(S.ContentWrapper)({
    textAlign: 'center',
    [media.md]: {
        textAlign: 'left',
    },
});

const TextWrapper = styled(Col)({
    zIndex: 1,
    [media.md]: {
        paddingBottom: '4rem',
    },
    [media.lg]: {
        paddingBottom: '6rem',
    },
    [media.xl]: {
        paddingBottom: '12rem',
    },
});

const Header = styled.h2({
    fontSize: font.size.extraLarge,
    whiteSpace: 'pre-line',
    lineHeight: 1.1,
    marginBottom: 0,
});

const Description = styled.p({
    ...font.normal(font.size.medium),
    margin: '1rem 0',
    whiteSpace: 'pre-line',
});

export const FirstLook: React.FC = () => (
    <FirstLookSectionWrapper backgroundColor={color.solitude}>
        <FirstLookContentWrapper type="flex" align="bottom">
            <TextWrapper md={11} lg={12}>
                <Header>{homepageTexts.firstLook.header}</Header>
                <Description>{homepageTexts.firstLook.description}</Description>
                <StartNowButton />
            </TextWrapper>
            <Col xs={24} md={{ span: 12, offset: 1 }} lg={{ span: 12, offset: 0 }}>
                <FirstLookIllustration />
            </Col>
        </FirstLookContentWrapper>
    </FirstLookSectionWrapper>
);
