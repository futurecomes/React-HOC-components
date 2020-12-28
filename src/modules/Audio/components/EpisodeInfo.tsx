import { Col, Tooltip } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import podcastPlaceholder from 'src/public/img/podcast_placeholder.png';

import { color, font, media } from 'src/styles/variables';

const EpisodeInfoWrapper = styled(Col)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    overflow: 'hidden',
    padding: '0 1.5rem 0 0.5rem',
    [media.md]: {
        padding: '0 0.5rem',
    },
    [media.lg]: {
        marginBottom: 0,
        padding: '0 2rem 0 0',
    },
});

const ShowArt = styled.img({
    width: '3rem',
    height: '3rem',
    marginRight: '1rem',
});

const TextContent = styled.div({
    overflow: 'hidden',
});

const EpisodeTitle = styled.h3(
    {
        margin: 0,
        color: color.white,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    font.normal(font.size.medium),
);

const ShowTitle = styled.h4(
    {
        margin: 0,
        color: color.white,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        a: {
            color: 'inherit',
            '&:hover': {
                color: 'inherit',
                textDecoration: 'underline',
            },
        },
        span: {
            fontWeight: font.weight.light,
        },
    },
    font.normal(font.size.small),
);

interface Props {
    title: string;
    showId: number;
    showTitle?: string;
    imageUrl?: string;
}

export const EpisodeInfo: React.FC<Props> = props => (
    <Tooltip title={props.title}>
        <EpisodeInfoWrapper xs={24} lg={10}>
            <Link to={`/show/${props.showId}`}>
                <ShowArt src={props.imageUrl || podcastPlaceholder} alt={props.title} />
            </Link>
            <TextContent>
                <EpisodeTitle>{props.title}</EpisodeTitle>
                {props.showTitle && (
                    <ShowTitle>
                        <span>from</span> <Link to={`/show/${props.showId}`}>{props.showTitle}</Link>
                    </ShowTitle>
                )}
            </TextContent>
        </EpisodeInfoWrapper>
    </Tooltip>
);
