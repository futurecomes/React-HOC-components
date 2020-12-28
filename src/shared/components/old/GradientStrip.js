import React from 'react';
import styled from 'react-emotion';

import { colors } from 'src/styles/old';

import pattern from './static/png/pattern.png';

const Gradient = styled.div({
    width: '100%',
    background: `url(${pattern}), linear-gradient(to right, ${colors.fromGradient}, ${colors.toGradient})`,
});

export const GradientStrip = ({ children, ...props }) => <Gradient css={{ ...props }}>{children}</Gradient>;
