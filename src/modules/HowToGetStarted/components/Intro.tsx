import React from 'react';
import styled from 'react-emotion';

import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

const Header = styled.h2({
    ...font.normal(font.size.large),
    textAlign: 'center',
    marginBottom: '2rem',
    [media.md]: {
        ...font.normal(font.size.xLarge),
    },
});

const Video = styled.iframe({
    display: 'block',
    width: '100%',
    height: '18.5rem',
    boxSizing: 'border-box',
    margin: '0 auto 2rem',

    [media.md]: {
        width: '50rem',
        height: '28rem',
    },
});

export const Intro: React.FunctionComponent = () => (
    <SectionWrapper backgroundColor={color.botticelli}>
        <ContentWrapper>
            <Header>Publish Your First Episode</Header>
            <Video frameBorder={0} src="https://www.youtube.com/embed/MTSHuiF2Fxg" />
        </ContentWrapper>
    </SectionWrapper>
);
