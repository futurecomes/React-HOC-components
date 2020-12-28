import React from 'react';
import styled from 'react-emotion';

import formatTime from 'src/shared/helpers/formatTime';
import { color, font, media } from 'src/styles/variables';

import * as S from './styles';

const TimeSliderWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginRight: 0,
    [media.md]: {
        marginRight: '0.75rem',
    },
});

const Label = styled.span(
    {
        margin: '0 0.5rem',
        color: color.white,
    },
    font.light(font.size.small),
);

interface Props {
    duration: number;
    currentTime: number;
    disabled?: boolean;
    onSeekToTime: (time: number) => void;
}

export const TimeSlider: React.FC<Props> = ({ duration, currentTime, disabled, onSeekToTime }) => (
    <TimeSliderWrapper>
        {!disabled && <Label>{formatTime(currentTime > duration ? duration : currentTime)}</Label>}
        <S.StyledSlider
            max={Math.ceil(duration)}
            disabled={disabled}
            value={currentTime}
            onChange={onSeekToTime}
            tipFormatter={null}
        />
        {!disabled && <Label>{`${formatTime(duration)}`}</Label>}
    </TimeSliderWrapper>
);
