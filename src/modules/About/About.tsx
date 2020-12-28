import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import communistAboutLady from 'src/public/svg/communistAboutLady.svg';

import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';
import { media } from 'src/styles/variables';

import { AboutText } from './components/AboutText';
import { WaitingForYou } from './components/WaitingForYou';

const BoxesContainer = styled(Row)({
    alignItems: 'stretch',
});

const BoxWrapper = styled(Col)({
    '&.ant-col-md-12': {
        padding: '2rem 1.5rem',
        [media.lg]: {
            padding: '2rem 3rem',
        },
    },
});

const CommunistAboutLady = styled.img({
    display: 'none',
    height: 'auto',
    width: '100%',
    [media.md]: {
        height: '40%',
        display: 'block',
    },
    [media.lg]: {
        height: '50%',
    },
});

const About: React.FC = () => (
    <SectionWrapper>
        <ContentWrapper>
            <BoxesContainer type="flex">
                <BoxWrapper md={12}>
                    <AboutText />
                </BoxWrapper>
                <BoxWrapper md={12}>
                    <CommunistAboutLady src={communistAboutLady} alt="lady-with-bag" />
                    <WaitingForYou />
                </BoxWrapper>
            </BoxesContainer>
        </ContentWrapper>
    </SectionWrapper>
);

export default About;
