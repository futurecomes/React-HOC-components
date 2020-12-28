import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import placeholderImage from 'src/public/img/placeholder.svg';

import { color, font, media } from 'src/styles/variables';

import { carouselItemsAmount } from '../models/listenData';
import * as S from './styles';

interface PodcastItemTileWrapperProps {
    fullwidth: number; // Throws error in console if boolean
}
const PodcastItemTileWrapper = styled(Link)<PodcastItemTileWrapperProps>(
    {
        display: 'inline-block',
        padding: '0.5rem',
    },
    ({ fullwidth }) =>
        fullwidth
            ? {
                  width: '100%',
              }
            : {
                  width: `${100 / carouselItemsAmount.sm}%`,
                  [media.md]: {
                      width: `${100 / carouselItemsAmount.md}%`,
                  },
                  [media.lg]: {
                      width: `${100 / carouselItemsAmount.lg}%`,
                  },
              },
);

const Title = styled.h4(
    {
        margin: '0.25rem 0 1rem',
        lineHeight: 1.5,
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: color.royalBlue,
        },
    },
    font.normal(font.size.small),
);

interface Props {
    title: string;
    imageUrl?: string;
    onPlay?: () => void;
    isShow?: boolean;
    fullWidth?: boolean;
    showId?: number;
    episodeId?: string;
}

export const PodcastItemTile: React.FC<Props> = ({ title, imageUrl, onPlay, isShow, showId, fullWidth }) => {
    const artImageSrc = imageUrl && imageUrl !== '' ? imageUrl : placeholderImage;

    const handleOnPlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (onPlay) {
            event.stopPropagation();
            onPlay();
        }
    };

    return (
        <PodcastItemTileWrapper to={`/show/${showId}`} fullwidth={fullWidth ? 1 : 0}>
            <S.ArtImage src={artImageSrc}>
                <S.PseudoArtImage src={artImageSrc} alt={title} />
                <S.HoverCover>{!isShow && <S.CoverPlayIcon onClick={handleOnPlayClick} />}</S.HoverCover>
            </S.ArtImage>
            <Title>{title}</Title>
        </PodcastItemTileWrapper>
    );
};
