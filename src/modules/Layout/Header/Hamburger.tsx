import React from 'react';
import styled from 'react-emotion';

import { media, color } from 'src/styles/variables';

export const HamburgerWrapper = styled.div({
    cursor: 'pointer',
    display: 'block',
    zIndex: 2,
    [media.lg]: {
        display: 'none',
    },
});

const barStyles = {
    0: {
        transform: 'rotate(-45deg) translate(0px, 6px)',
    },
    1: {
        opacity: 0,
    },
    2: {
        transform: 'rotate(45deg) translate(-3px, -8px)',
    },
};

interface BarProps {
    index: number;
    isExpanded: boolean;
}

export const Bar = styled.div<BarProps>(
    {
        width: 22,
        height: 3,
        backgroundColor: color.solitude,
        margin: '3px 0',
        transition: '0.4s',
    },
    ({ isExpanded, index }) => isExpanded && barStyles[index],
);

interface Props {
    onClick: () => void;
    isExpanded: boolean;
}

export const Hamburger: React.FC<Props> = ({ onClick, isExpanded }) => {
    const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.currentTarget.blur();
        onClick();
    };

    return (
        <HamburgerWrapper onClick={handleMenuClick}>
            <Bar isExpanded={isExpanded} index={0} />
            <Bar isExpanded={isExpanded} index={1} />
            <Bar isExpanded={isExpanded} index={2} />
        </HamburgerWrapper>
    );
};
