import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';

import placeholderImage from 'src/public/img/placeholder.svg';

import formatTime from 'src/shared/helpers/formatTime';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import { setPageThumbnail } from 'src/shared/helpers/setPageThumbnail';
import { setPageTitle } from 'src/shared/helpers/setPageTitle';
import { formatDate } from 'src/shared/helpers/time';
import { color, font, media } from 'src/styles/variables';

import { Episode } from '../../models/podcasts';
import { coverArtSize } from '../models/listenData';
import * as S from './styles';

const DetailedEpisodeTileWrapper = styled.div({
    display: 'flex',
    height: coverArtSize.xs,
    marginBottom: '2rem',
    backgroundColor: color.white,
    overflow: 'hidden',
    [media.sm]: {
        height: coverArtSize.sm,
    },
    [media.md]: {
        height: coverArtSize.md,
    },
    [media.lg]: {
        height: coverArtSize.lg,
    },
});

const Details = styled(Row)({
    height: coverArtSize.sm,
    padding: '1rem',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    overflowY: 'scroll',
    [media.md]: {
        overflowY: 'hidden',
        height: '100%',
        padding: 0,
        flexFlow: 'row-reverse nowrap',
    },
});

const ShowDetails = styled(Col)({
    display: 'flex',
    height: 'auto',
    minHeight: 'fit-content',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: `1px solid ${color.gallery}`,
    [media.md]: {
        height: '100%',
        margin: 0,
        padding: '1rem',
        border: 'none',
    },
});

const ShowTitle = styled(Link)({
    ...font.normal(font.size.medium),
    display: 'block',
    marginBottom: '0.25rem',
    lineHeight: 1.3,
    color: color.scorpion,
    transition: 'color 0.2s',
    '&:hover': {
        color: color.royalBlue,
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

const AdditionalDetail = styled.span(
    {
        display: 'block',
        color: color.silverChalice,
    },
    font.normal(font.size.small),
);

const EpisodeDetails = styled(Col)({
    minHeight: 'fit-content',
    [media.md]: {
        overflowWrap: 'break-word',
        overflowY: 'scroll',
        minHeight: '100%',
        padding: '1rem',
    },
});

const Title = styled.h3({
    ...font.normal(font.size.medium),
    marginBottom: 0,
    [media.sm]: {
        ...font.normal(font.size.mediumLarge),
    },
    [media.md]: {
        ...font.normal(font.size.medium),
    },
});

const Description = styled.p(
    {
        whiteSpace: 'pre-line',
        margin: '0.5rem 0 0',
        a: {
            color: 'inherit',
            textDecoration: 'underline',
            transition: 'color 0.2s',
            '&:hover': {
                color: color.royalBlue,
            },
        },
    },
    font.normal(font.size.base),
);

interface Props {
    episode: Partial<Episode>;
    onClick: () => void;
    onPlay: () => void;
    showPlayButton?: boolean;
}

export const DetailedEpisodeTile: React.FC<Props> = ({ episode, onClick, onPlay, showPlayButton }) => {
    const artImageSrc = episode.imageUrl && episode.imageUrl !== '' ? episode.imageUrl : placeholderImage;

    const [initialized, setInitialized] = React.useState(false);
    React.useEffect(() => {
        if (!initialized) {
            setPageThumbnail(artImageSrc);
            setPageTitle(episode.title);
            setInitialized(true);
        }
    });

    const handleOnPlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onPlay) {
            event.stopPropagation();
            onPlay();
        }
    };

    const isShowUrlValid = episode.showUrl && !/\W/.test(episode.showUrl); // Probably needed because of some corrupted legacy data in database

    return (
        <DetailedEpisodeTileWrapper>
            <S.ArtImage src={artImageSrc} onClick={onClick} fixedSize>
                <S.PseudoArtImage src={artImageSrc} alt={episode.title} />
                <S.HoverCover>
                    <S.CoverPlayIcon onClick={handleOnPlayClick} />
                </S.HoverCover>
            </S.ArtImage>
            <Details type="flex">
                <EpisodeDetails md={{ span: 12, offset: 1 }} lg={{ span: 15, offset: 1 }}>
                    <Title>{mapHtmlToString(episode.title)}</Title>
                    {showPlayButton && <S.InlinePlayIcon mobile onClick={handleOnPlayClick} />}
                    {episode.description != '' && (
                        <Linkify properties={{ target: '_blank' }}>
                            <div>
                                <Description>{mapHtmlToString(episode.description)}</Description>
                            </div>
                        </Linkify>
                    )}
                </EpisodeDetails>
                <ShowDetails md={11} lg={8}>
                    <div>
                        <ShowTitle to={isShowUrlValid ? `/${episode.showUrl}` : `/show/${episode.show}`}>
                            {episode.showTitle}
                        </ShowTitle>
                        <Author>
                            by{' '}
                            {episode.customUrl ? (
                                <Link to={`/profile/${episode.customUrl}`}>{episode.creatorName}</Link>
                            ) : (
                                episode.creatorName
                            )}
                        </Author>
                        {showPlayButton && <S.InlinePlayIcon onClick={handleOnPlayClick} />}
                    </div>
                    <div>
                        {(episode.releasedAt || episode.createdAt) && (
                            <AdditionalDetail>
                                Released: {formatDate(episode.releasedAt || episode.createdAt)}
                            </AdditionalDetail>
                        )}
                        <AdditionalDetail>Length: {formatTime(episode.duration)}</AdditionalDetail>
                    </div>
                </ShowDetails>
            </Details>
        </DetailedEpisodeTileWrapper>
    );
};
