import React from 'react';
import styled from 'react-emotion';
import { Row, Col } from 'antd';

import { font, color, media } from 'src/styles/variables';
import { hexToRgba } from 'src/shared/helpers/hexToRgba';
import { StartNowButton } from 'src/common/components/StartNowButton';

const MainFeatureWrapper = styled(Row)(({ even }) => ({
    '&.ant-row-flex': {
        flexDirection: 'column-reverse',
        backgroundColor: color.white,
        padding: '2rem',
        boxShadow: `0 0 2rem ${hexToRgba(color.black, 0.2)}`,
        '&:not(:last-child)': {
            marginBottom: '2rem',
        },
        [media.sm]: {
            padding: '4rem 2rem',
            flexDirection: even ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            boxShadow: 'none',
            '&:not(:last-child)': {
                marginBottom: 0,
            },
        },
    },
}));

const MainFeatureIcon = styled.img({
    display: 'block',
    width: '100%',
    marginTop: '3rem',
    [media.sm]: {
        marginTop: 0,
    },
});

const Title = styled.h3({
    fontSize: font.size.large,
    lineHeight: 1.1,
    color: color.black,
    margin: '0 0 1rem',
    [media.md]: {
        fontSize: font.size.extraLarge,
    },
});

const Description = styled.p({
    fontSize: font.size.medium,
    lineHeight: 1.5,
});

export const MainFeature = ({ title, description, icon, isEven }) => (
    <MainFeatureWrapper type="flex" even={isEven ? 1 : 0}>
        <Col sm={9} md={11} lg={{ span: 13, offset: isEven ? 0 : 2 }}>
            <MainFeatureIcon src={icon} alt={title} />
        </Col>
        <Col sm={13} md={11} lg={{ span: 9, offset: isEven ? 2 : 0 }}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <StartNowButton />
        </Col>
    </MainFeatureWrapper>
);
