import { Slider } from 'antd';
import styled from 'react-emotion';

import { color } from 'src/styles/variables';

interface IconButtonProps {
    iconSize?: string;
}

export const IconButton = styled.button<IconButtonProps>(({ iconSize }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    width: '1.7rem',
    height: '1.7rem',
    padding: 0,
    margin: '0 0.5rem',
    img: {
        display: 'block',
        height: iconSize || 'auto',
    },
}));

interface StyledSliderProps {
    width?: string;
}

export const StyledSlider = styled(Slider)<StyledSliderProps>(({ width }) => ({
    '&.ant-slider': {
        width: width || '100%',
        marginTop: '0.7rem',
        flexGrow: 1,
        '.ant-slider-rail': {
            backgroundColor: color.trout,
        },
        '.ant-slider-track': {
            backgroundColor: color.silverSand,
        },
        '.ant-slider-handle': {
            width: 10,
            height: 10,
            marginTop: -3,
            marginLeft: -5,
            opacity: 0,
            border: 'none',
            transition: 'opacity 0.2s',
        },
        '&:hover': {
            '.ant-slider-handle': {
                opacity: 1,
            },
        },
    },
}));
