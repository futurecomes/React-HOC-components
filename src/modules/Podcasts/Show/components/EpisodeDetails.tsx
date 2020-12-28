import { Col, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import styled from 'react-emotion';

import { Episode } from 'src/modules/Podcasts/models/podcasts';
import { PlayButton } from 'src/shared/components/PlayButton';
import { formatDateWithLongMonth } from 'src/shared/helpers/time';
import { color, font, media } from 'src/styles/variables';

import { SingleListedEpisodeLink } from './SingleListedEpisodeLink';

const EpisodeDetailsWrapper = styled(Row)({
    borderRadius: 4,
    padding: '0.5rem',
    alignItems: 'flex-start',
});

const CreationDate = styled.span({
    display: 'block',
    marginBottom: 0,
    fontSize: font.size.small,
});

interface TitleProps {
    isCurrentlyPlaying: boolean;
}

const Title = styled.p<TitleProps>(({ isCurrentlyPlaying }) => ({
    color: isCurrentlyPlaying ? color.royalBlue : color.tundora,
    margin: 0,
    ...font.bold(font.size.small),
}));

const Duration = styled.span({
    margin: 0,
    fontSize: font.size.small,
});

const LinkWrapper = styled(Col)({
    display: 'none',
    [media.lg]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '0.5rem',
    },
});

const PlayButtonWrapper = styled(Col)({
    height: '44px',
    display: 'flex',
    alignItems: 'center',
});

interface Props {
    episode: Episode;
    isCurrentlyPlaying: boolean;
    title: string;
    link: string;
    duration: string;
}

export const EpisodeDetails: FunctionComponent<Props> = ({ episode, isCurrentlyPlaying, title, duration, link }) => (
    <EpisodeDetailsWrapper type="flex" align="middle">
        <PlayButtonWrapper xs={2}>
            <PlayButton episode={episode} />
        </PlayButtonWrapper>
        <Col xs={17} lg={14}>
            <Title isCurrentlyPlaying={isCurrentlyPlaying}>{title}</Title>
        </Col>
        <Col xs={{ span: 4, offset: 1 }} lg={{ span: 5, offset: 1 }}>
            <CreationDate>{formatDateWithLongMonth(episode.releasedAt)}</CreationDate>
            <Duration>{duration}</Duration>
        </Col>
        <LinkWrapper xs={2}>
            <SingleListedEpisodeLink url={link} />
        </LinkWrapper>
    </EpisodeDetailsWrapper>
);
