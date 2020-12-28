import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import { hexToRgba } from 'src/shared/helpers/hexToRgba';
import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import { HtgsSectionContent } from '../models/htgs';

interface HtgsSectionWrapperProps {
    even: number;
}

const HtgsSectionWrapper = styled(Row)<HtgsSectionWrapperProps>(({ even }) => ({
    '&.ant-row-flex': {
        flexDirection: 'column-reverse',
        backgroundColor: color.white,
        padding: '2rem',
        boxShadow: `0 0 2rem ${hexToRgba(color.black, 0.2)}`,
        '&:not(:last-child)': {
            marginBottom: '2rem',
        },
        [media.sm]: {
            backgroundColor: 'transparent',
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

const HtgsSectionIcon = styled.img({
    display: 'block',
    width: '100%',
    marginTop: '3rem',
    [media.sm]: {
        marginTop: 0,
    },
});

interface TextProps {
    isWhite?: boolean;
}

const Header = styled.h2<TextProps>(
    {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    font.normal(font.size.large),
    ({ isWhite }) =>
        isWhite && {
            [media.md]: {
                color: color.white,
            },
        },
);

const Content = styled.div<TextProps>(
    ({ isWhite }) =>
        isWhite && {
            [media.md]: {
                color: color.white,
            },
        },
    {
        a: {
            color: 'inherit',
            textDecoration: 'underline',
            transition: 'opacity 0.2s',
            '&:hover': {
                color: 'inherit',
                opacity: 0.7,
            },
        },
    },
);

interface Props {
    content: HtgsSectionContent;
    isEven: boolean;
}

export const HtgsSection: React.FC<Props> = ({ content, isEven }) => (
    <SectionWrapper backgroundColor={content.backgroundColor}>
        <ContentWrapper>
            <HtgsSectionWrapper type="flex" even={isEven ? 1 : 0}>
                <Col sm={9} md={{ span: 11, offset: isEven ? 0 : 2 }}>
                    <HtgsSectionIcon src={content.illustration} alt={content.header} />
                </Col>
                <Col sm={13} md={{ span: 11, offset: isEven ? 2 : 0 }}>
                    <Header isWhite={content.whiteText}>{content.header}</Header>
                    <Content isWhite={content.whiteText}>{content.content}</Content>
                </Col>
            </HtgsSectionWrapper>
        </ContentWrapper>
    </SectionWrapper>
);
