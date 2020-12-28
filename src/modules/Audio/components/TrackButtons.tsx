import React from 'react';
import styled from 'react-emotion';

import pauseIcon from 'src/public/img/icons/player/pause.svg';
import playIcon from 'src/public/img/icons/player/play.svg';
import seekBackwardIcon from 'src/public/img/icons/player/seek-backward-15.svg';
import seekForwardIcon from 'src/public/img/icons/player/seek-forward-15.svg';

import { media } from 'src/styles/variables';

import * as S from './styles';

const TrackButtonsWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '0.5rem',
    [media.md]: {
        width: 'auto',
        margin: '0 0.5rem 0 0',
    },
});

const Buttons = styled.div({
    display: 'flex',
    alignItems: 'center',
});

interface Props {
    isPlaying: boolean;
    currentTime: number;
    onTogglePlay: () => void;
    onSeekToTime: (time: number) => void;
    disabled?: boolean;
}

export const TrackButtons: React.FC<Props> = props => (
    <TrackButtonsWrapper>
        <Buttons>
            <S.IconButton disabled={props.disabled} onClick={() => props.onSeekToTime(props.currentTime - 15)}>
                <img src={seekBackwardIcon} alt="Rewind 15 seconds" />
            </S.IconButton>
            <S.IconButton disabled={props.disabled} onClick={props.onTogglePlay} iconSize="1.2rem">
                <img src={props.isPlaying ? pauseIcon : playIcon} alt={props.isPlaying ? 'Pause' : 'Play'} />
            </S.IconButton>
            <S.IconButton disabled={props.disabled} onClick={() => props.onSeekToTime(props.currentTime + 15)}>
                <img src={seekForwardIcon} alt="Fast forward 15 seconds" />
            </S.IconButton>
        </Buttons>
        {props.children}
    </TrackButtonsWrapper>
);
