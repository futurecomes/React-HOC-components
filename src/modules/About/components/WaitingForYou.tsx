import React from 'react';
import styled from 'react-emotion';

import { StartNowButton } from 'src/common/components/StartNowButton';
import { color, font, media } from 'src/styles/variables';

import * as texts from '../models/aboutTexts.json';

const WaitingForYouWrapper = styled.div({
    alignItems: 'center',
    backgroundColor: color.royalBlue,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    padding: '7rem 2rem 5rem',
    position: 'relative',
    [media.md]: {
        height: '60%',
    },
    [media.lg]: {
        height: '50%',
    },
});

const Circle = styled.div({
    backgroundColor: color.brightShadow,
    borderRadius: '50%',
    height: '50rem',
    left: '-5rem',
    position: 'absolute',
    width: '50rem',
});

const Description = styled.p({
    color: color.white,
    fontWeight: font.weight.bold,
    fontSize: font.size.mediumLarge,
    lineHeight: 1.4,
    textAlign: 'center',
    whiteSpace: 'pre-line',
});

export const WaitingForYou: React.FC = () => (
    <WaitingForYouWrapper>
        {texts.join.map(text => (
            <Description key={text}>{text}</Description>
        ))}
        <Circle />
        <StartNowButton type="secondary" />
    </WaitingForYouWrapper>
);
