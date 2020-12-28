import React from 'react';
import styled, { keyframes } from 'react-emotion';

import { hexToRgba } from 'src/shared/helpers/hexToRgba';
import { color, media } from 'src/styles/variables';

import laptopIcon from './svg/laptop.svg';
import leftHandIcon from './svg/leftHand.svg';
import podcastingLadyIcon from './svg/podcastingLady.svg';
import shoeIcon from './svg/shoe.svg';
import soundWaveIcon from './svg/soundWave.svg';

const FirstLookIllustrationWrapper = styled.div({
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: '30vw',
    margin: '5rem auto 0',
    [media.sm]: {
        width: '25rem',
        height: '19.6rem',
        display: 'block',
    },
    [media.md]: {
        marginTop: 0,
    },
    [media.lg]: {
        width: '32rem',
        height: '25.1rem',
    },
});

const IllustrationFragment = styled.img({
    display: 'none',
    position: 'absolute',
    [media.sm]: {
        display: 'block',
        transform: 'unset',
        transformOrigin: 'top',
    },
});

const Circle = styled.div({
    display: 'none',
    position: 'absolute',
    top: '-54%',
    left: '11%',
    width: '24rem',
    height: '24rem',
    zIndex: 0,
    backgroundColor: color.solitude,
    borderRadius: '100%',
    boxShadow: `0 0 2rem ${hexToRgba(color.black, 0.05)}`,
    [media.sm]: {
        display: 'none',
        transform: 'unset',
        transformOrigin: 'top',
    },
    [media.md]: {
        display: 'block',
    },
    [media.lg]: {
        top: '-54%',
        left: '10%',
        width: '30rem',
        height: '30rem',
    },
});

const PodcastingLady = styled(IllustrationFragment)({
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
});

const Laptop = styled(IllustrationFragment)({
    top: '31.6%',
    left: '29%',
    width: '42%',
    zIndex: 4,
});

const handsAnimation = keyframes({
    'from, 10%, 20%, to': {
        transform: 'rotate(0deg)',
        transformOrigin: 'top right',
    },
    '5%, 15%': {
        transform: 'rotate(30deg)',
        transformOrigin: 'top right',
    },
});

const LeftHand = styled(IllustrationFragment)({
    top: '43%',
    left: '60%',
    width: '18%',
    zIndex: 3,
    animation: `${handsAnimation} 10s infinite`,
});

const RightHand = styled(IllustrationFragment)({
    top: '41%',
    left: '46.5%',
    width: '18%',
    zIndex: 3,
    animation: `${handsAnimation} 10s 0.5s infinite`,
});

const shoeAnimation = keyframes({
    '25%, 35%, 45%, 55%, 65%, 75%, 85%, to': {
        transform: 'rotate(0deg)',
        transformOrigin: 'top right',
    },
    '30%, 40%, 50%, 60%, 70%, 80%, 90%': {
        transform: 'rotate(15deg)',
        transformOrigin: 'top right',
    },
});

const LeftShoe = styled(IllustrationFragment)({
    top: '94%',
    left: '48%',
    width: '11%',
    zIndex: 3,
    animation: `${shoeAnimation} 10s infinite`,
});

const RightShoe = styled(IllustrationFragment)({
    top: '94%',
    left: '36%',
    width: '11%',
    zIndex: 3,
});

const soundWaveAnimation = keyframes({
    '30%, 40%, 50%, 60%, 70%, 80%, 90%': {
        transform: 'scaleY(1.5)',
        transformOrigin: 'center',
    },
    '25%, 35%, 45%, 55%, 65%, 75%, 85%, to': {
        transform: 'scaleY(1)',
        transformOrigin: 'center',
    },
});

const SoundWave = styled(IllustrationFragment)({
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    animation: `${soundWaveAnimation} 10s infinite`,
    zIndex: 1,
    [media.sm]: {
        top: '-10%',
        width: '110%',
    },
    [media.md]: {
        left: '5%',
    },
});

export const FirstLookIllustration: React.FC = () => (
    <FirstLookIllustrationWrapper>
        <Circle />
        <PodcastingLady src={podcastingLadyIcon} />
        <Laptop src={laptopIcon} />
        <LeftHand src={leftHandIcon} />
        <RightHand src={leftHandIcon} />
        <LeftShoe src={shoeIcon} />
        <RightShoe src={shoeIcon} />
        <SoundWave src={soundWaveIcon} />
    </FirstLookIllustrationWrapper>
);
