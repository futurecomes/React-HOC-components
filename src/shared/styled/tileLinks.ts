import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import { color, font } from 'src/styles/variables';

export const TilesContainer = styled.div({
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0 -0.5rem 0.5rem',
});

export const linkStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0.35rem 0.75rem 0.4rem',
    margin: '0 0.5rem 1rem',
    border: `1px solid ${color.gallery}`,
    borderRadius: 3,
    color: color.scorpion,
    transition: 'background-color 0.2s',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    img: {
        display: 'inline-block',
        filter: 'grayscale(100%)',
        width: '1rem',
    },
    span: {
        ...font.normal(font.size.small),
        marginLeft: '0.5rem',
    },
    '&:hover': {
        backgroundColor: color.gallery,
        color: color.scorpion,
    },
    '&:focus': {
        textDecoration: 'none',
    },
};

export const StyledRouterLink = styled(Link)(linkStyles);

interface TileLinkProps {
    active?: boolean;
}

export const StyledLink = styled.a<TileLinkProps>(
    linkStyles,
    {
        span: {
            whiteSpace: 'nowrap',
        },
    },
    ({ active }) =>
        active && {
            '&, &:hover': {
                backgroundColor: color.botticelli,
                borderColor: color.botticelli,
                color: color.scorpion,
            },
        },
);
