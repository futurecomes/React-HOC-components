import styled from 'react-emotion';

import { color, media } from 'src/styles/variables';

interface HeaderProps {
    forCarousel?: boolean;
}

export const Header = styled.h2<HeaderProps>(
    {
        a: {
            color: color.silverChalice,
            '&:hover': {
                color: color.royalBlue,
            },
        },
        span: {
            color: color.silverChalice,
        },
    },
    ({ forCarousel }) =>
        forCarousel && {
            padding: '0 2rem',
            [media.md]: {
                padding: 0,
            },
        },
);
