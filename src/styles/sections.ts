import { Row } from 'antd';
import styled from 'react-emotion';

import { color, media } from 'src/styles/variables';

interface SectionWrapperProps {
    backgroundColor?: string;
    hideOnMobile?: boolean;
    fillHeight?: boolean;
}

export const SectionWrapper = styled.section<SectionWrapperProps>(
    ({ backgroundColor = color.white, hideOnMobile, fillHeight }) => ({
        flexGrow: fillHeight ? 1 : 0,
        display: hideOnMobile ? 'none' : 'flex',
        position: 'relative',
        width: '100%',
        padding: '3rem 0.5rem',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor,
        [media.sm]: {
            display: 'flex',
            padding: '3rem 1rem',
        },
        [media.md]: {
            padding: '3rem 2rem',
        },
    }),
);

interface ContentWrapperProps {
    centered?: number;
}

export const ContentWrapper = styled(Row)<ContentWrapperProps>(({ centered }) => ({
    flexGrow: 1,
    width: '100%',
    maxWidth: media.contentWidth,
    zIndex: 1,
    margin: '0 auto',
    padding: '0 0.5rem',
    textAlign: centered ? 'center' : 'left',
    [media.sm]: {
        padding: '0 1rem',
    },
    [media.md]: {
        padding: '0 2rem',
    },
}));
