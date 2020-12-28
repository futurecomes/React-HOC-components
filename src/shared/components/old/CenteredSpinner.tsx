import React from 'react';
import styled from 'react-emotion';
import Spinner from 'react-svg-spinner';

const SpinnerWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
    width: '100%',
    height: '100%',
});

interface Props {
    size?: string;
    speed?: string;
}

export const CenteredSpinner: React.FC<Props> = ({ size = '32px', speed = 'fast' }) => (
    <SpinnerWrapper>
        <Spinner size={size} speed={speed} />
    </SpinnerWrapper>
);
