import styled from 'react-emotion';

import playIconBlack from 'src/public/img/icons/play-circle-black.svg';
import playIconWhite from 'src/public/img/icons/play-circle.svg';

import { hexToRgba } from 'src/shared/helpers/hexToRgba';
import { color, media } from 'src/styles/variables';

import { coverArtSize } from '../models/listenData';

interface ArtImageProps {
    src: string;
    fixedSize?: boolean;
}

export const ArtImage = styled.div<ArtImageProps>(
    ({ src }) => ({
        position: 'relative',
        cursor: 'pointer',
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }),
    ({ fixedSize }) =>
        fixedSize
            ? {
                  minWidth: coverArtSize.xs,
                  height: coverArtSize.xs,
                  paddingTop: 0,
                  [media.sm]: {
                      minWidth: coverArtSize.sm,
                      height: coverArtSize.sm,
                  },
                  [media.md]: {
                      minWidth: coverArtSize.md,
                      height: coverArtSize.md,
                  },
                  [media.lg]: {
                      minWidth: coverArtSize.lg,
                      height: coverArtSize.lg,
                  },
              }
            : {
                  minWidth: '100%',
                  height: 0,
                  paddingTop: '100%',
              },
);

export const PseudoArtImage = styled.img({
    '&&&': {
        // to overload slick styles for imgs inside
        display: 'none', // only added for accessibility
    },
});

export const HoverCover = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: hexToRgba(color.black, 0.7),
    opacity: 0,
    transition: 'opacity 0.2s',
    '&:hover': {
        opacity: 1,
    },
});

const playIconStyles = {
    opacity: 0.5,
    transition: 'opacity 0.2s',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    '&:hover': {
        opacity: 1,
    },
};

export const CoverPlayIcon = styled.div(playIconStyles, {
    width: '30%',
    height: '30%',
    backgroundImage: `url('${playIconWhite}')`,
});

interface InlinePlayIconProps {
    mobile?: boolean;
}

export const InlinePlayIcon = styled.div<InlinePlayIconProps>(playIconStyles, ({ mobile }) => ({
    display: mobile ? 'block' : 'none',
    width: '1.5rem',
    height: '1.5rem',
    marginTop: '0.5rem',
    backgroundImage: `url('${playIconBlack}')`,
    [media.md]: {
        display: mobile ? 'none' : 'block',
    },
}));
