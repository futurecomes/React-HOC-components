import React from 'react';
import styled from 'react-emotion';

import { color, media } from 'src/styles/variables';
import * as S from 'src/styles/sections';

import startIcon from '../../svg/start.svg';
import recordIcon from '../../svg/record.svg';
import editIcon from '../../svg/edit.svg';
import { MainFeature } from './MainFeature';
import * as homepageTexts from '../../models/homepageTexts';

const icons = {
    start: startIcon,
    record: recordIcon,
    edit: editIcon,
};

const MainFeaturesWrapper = styled(S.SectionWrapper)({
    [media.md]: {
        paddingBottom: 0,
    },
});

const MainFeaturesContentWrapper = styled(S.ContentWrapper)({
    textAlign: 'center',
    [media.sm]: {
        textAlign: 'left',
    },
});

export const MainFeatures = () => (
    <MainFeaturesWrapper backgroundColor={color.white} align="middle">
        <MainFeaturesContentWrapper>
            {homepageTexts.mainFeatures.map((mainFeature, index) => (
                <MainFeature
                    key={mainFeature.title}
                    title={mainFeature.title}
                    description={mainFeature.description}
                    icon={icons[mainFeature.icon]}
                    isEven={index % 2 === 0}
                    css={{ paddingTop: '2rem' }}
                />
            ))}
        </MainFeaturesContentWrapper>
    </MainFeaturesWrapper>
);
