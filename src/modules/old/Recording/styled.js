import styled from 'react-emotion';

import { colors } from 'src/styles/old';

export const Header = styled.h1({
    textAlign: 'center',
    color: colors.cerulean,
});

export const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 800,
    height: 300,
    background: '#f2eded',
});

export const ButtonWrapper = styled.div({
    margin: 10,
});

export const Buttons = styled.div({
    display: 'flex',
});

export const LoadingWrapper = styled.div({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    fontSize: 42,
});
