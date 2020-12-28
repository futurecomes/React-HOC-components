import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import { Show } from 'src/modules/Podcasts/models/podcasts';
import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

const ShowDetailsWrapper = styled(Row)({
    textAlign: 'center',
    [media.sm]: {
        textAlign: 'left',
    },
});

const CoverArt = styled.img({
    maxWidth: '10rem',
    marginBottom: '1rem',
    width: '100%',
    [media.sm]: {
        maxWidth: 'none',
        marginBottom: 0,
    },
});

const Title = styled.h2({
    ...font.normal(font.size.medium),
    display: 'block',
    marginBottom: '0.25rem',
    lineHeight: 1.3,
    color: color.scorpion,
    a: {
        color: color.scorpion,
        transition: 'color 0.2s',
        '&:hover': {
            color: color.royalBlue,
        },
    },
    [media.md]: {
        ...font.normal(font.size.mediumLarge),
    },
});

const Author = styled.span({
    marginBottom: '0.25rem',
    a: {
        ...font.normal(font.size.base),
        color: color.scorpion,
        textDecoration: 'underline',
        transition: 'color 0.2s',
        '&:hover': {
            color: color.royalBlue,
        },
    },
    [media.md]: {
        marginBottom: 0,
    },
});

const Plays = styled.p({
    ...font.normal(font.size.large),
    marginTop: '2rem',
    [media.sm]: {
        marginTop: 0,
    },
});

interface Props {
    showData: Show;
    totalPlays: number;
}

export const ShowDetails: React.FC<Props> = ({ showData, totalPlays }) => (
    <SectionWrapper backgroundColor={color.solitude}>
        <ContentWrapper>
            <ShowDetailsWrapper>
                <Col xs={24} sm={8} lg={4}>
                    <CoverArt src={showData.imageUrl} />
                </Col>
                <Col xs={24} sm={{ span: 15, offset: 1 }} lg={{ span: 19, offset: 1 }}>
                    <Title>
                        <Link to={`/show/${showData.id}`}>{showData.title}</Link>
                    </Title>
                    {showData.userUrl && (
                        <Author>
                            <Link to={showData.userUrl}>by {showData.creatorName}</Link>
                        </Author>
                    )}
                    <Plays>Total plays: {totalPlays}</Plays>
                </Col>
            </ShowDetailsWrapper>
        </ContentWrapper>
    </SectionWrapper>
);
