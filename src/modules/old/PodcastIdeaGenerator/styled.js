import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import { colors } from 'src/styles/old';
import { bounceAnimation } from 'src/styles/animations';

export const Button = styled(Link)({
    background: colors.pictonBlue,
    cursor: 'pointer',
    padding: '10px 22px',
    color: colors.toGradient,
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 10,
    animation: `${bounceAnimation} .8s ease`,
});

export const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px 40px',
    position: 'relative',
});
