import styled from 'react-emotion';

import { slideInVertical } from 'src/styles/animations';

export const CircleTickMessageWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    animation: `${slideInVertical} 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both 0.5s`,
});

export const Circle = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    background: 'white',
    backgroundSize: '65px 45px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.15)',
    borderRadius: '50%',
});

export const Center = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
