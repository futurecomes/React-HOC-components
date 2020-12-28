import React from 'react';
import styled from 'react-emotion';
import { color } from 'src/styles/variables';
import { Carousel } from 'antd';

import * as S from 'src/styles/sections';

import * as pricingTexts from '../pricingTexts.json';
import { PackagesPickerCard } from './PackagesPickerCard';

const CarouselWrapper = styled.div({
    paddingBottom: '3rem',
});

const PackagesCarousel = styled(Carousel)({
    '&.slick-slider': {
        '.slick-dots': {
            bottom: '-3rem',
            li: {
                button: {
                    width: '1rem',
                    height: '1rem',
                    margin: '0 0.5rem',
                    border: `2px solid ${color.trout}`,
                    borderRadius: '100%',
                    backgroundColor: color.white,
                },
                '&:before': {
                    display: 'none',
                },
                '&:hover': {
                    button: {
                        borderColor: color.trout,
                        backgroundColor: color.solitude,
                    },
                },
                '&.slick-active': {
                    button: {
                        width: '1rem',
                        borderColor: color.royalBlue,
                        backgroundColor: color.royalBlue,
                    },
                },
            },
        },
        '.slick-list': {
            '.slick-track': {
                '.slick-slide': {
                    display: 'flex',
                    justifyContent: 'center',
                },
            },
        },
    },
});

export const PackagesPickerCarousel = () => (
    <S.ContentWrapper>
        <CarouselWrapper>
            <PackagesCarousel easing="ease-in-out">
                {pricingTexts.packagesPicker.map(bundle => (
                    <PackagesPickerCard key={`${bundle.name}-carouselPicker`} bundle={bundle} />
                ))}
            </PackagesCarousel>
        </CarouselWrapper>
    </S.ContentWrapper>
);
