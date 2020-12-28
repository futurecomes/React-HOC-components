import React from 'react';
import styled from 'react-emotion';

import { media, color } from 'src/styles/variables';
import * as S from 'src/styles/sections';

import { PackagesPickerCarousel } from './PackagesPickerCarousel';
import { PackagesPickerFlex } from './PackagesPickerFlex';

const CarouselContainer = styled.div({
    width: '100%',
    [media.lg]: {
        display: 'none',
    },
});

const FlexContainer = styled.div({
    display: 'none',
    [media.lg]: {
        display: 'block',
    },
});

export const PackagesPicker = () => (
    <S.SectionWrapper backgroundColor={color.trout}>
        <CarouselContainer>
            <PackagesPickerCarousel />
        </CarouselContainer>
        <FlexContainer>
            <PackagesPickerFlex />
        </FlexContainer>
    </S.SectionWrapper>
);
