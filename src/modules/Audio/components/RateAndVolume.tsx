import React from 'react';
import styled from 'react-emotion';

import volumeIcon from 'src/public/img/icons/player/volume.svg';
import { color, media } from 'src/styles/variables';

import * as S from './styles';

interface VolumeWrapperProps {
    hideOnMobile?: boolean;
}

const VolumeWrapper = styled.div<VolumeWrapperProps>(
    {
        alignItems: 'center',
    },
    ({ hideOnMobile }) =>
        hideOnMobile
            ? {
                  display: 'none',
                  [media.md]: {
                      display: 'flex',
                  },
              }
            : {
                  display: 'flex',
                  justifyContent: 'space-between',
                  [media.md]: {
                      display: 'none',
                  },
              },
);

const Rate = styled.button({
    width: '2rem',
    backgroundColor: 'transparent',
    color: color.white,
    border: 'none',
    cursor: 'pointer',
    marginRight: '0.25rem',
    '&:hover': {
        textDecoration: 'underline',
    },
    [media.md]: {
        marginRight: '0.75rem',
    },
});

interface Props {
    rate: number;
    volume: number;
    onCycleRate: () => void;
    onSetVolume: (volume: number) => void;
    hideOnMobile?: boolean;
}

export const RateAndVolume: React.FC<Props> = props => (
    <VolumeWrapper hideOnMobile={props.hideOnMobile}>
        <Rate onClick={props.onCycleRate}>{`${props.rate}x`}</Rate>
        <S.IconButton iconSize="1.2rem" onClick={() => props.onSetVolume(props.volume === 0 ? 100 : 0)}>
            <img src={volumeIcon} alt="Set volume" />
        </S.IconButton>
        <S.StyledSlider
            max={100}
            value={props.volume}
            onChange={props.onSetVolume}
            width="4rem"
            tipFormatter={value => `${value}%`}
        />
    </VolumeWrapper>
);
