import React from 'react';
import styled from 'react-emotion';

import { color, media } from 'src/styles/variables';

interface VolumeWrapperProps {
    hideOnMobile?: boolean;
}

const VolumeWrapper = styled.div<VolumeWrapperProps>(
    {
        alignItems: 'center',
    },
    ({ hideOnMobile }) =>
        hideOnMobile
            ? {
                  display: 'none',
                  [media.md]: {
                      display: 'flex',
                  },
              }
            : {
                  display: 'flex',
                  justifyContent: 'space-between',
                  [media.md]: {
                      display: 'none',
                  },
              },
);

const Rate = styled.button({
    width: '2rem',
    backgroundColor: 'transparent',
    color: color.white,
    border: 'none',
    cursor: 'pointer',
    marginRight: '0.25rem',
    '&:hover': {
        textDecoration: 'underline',
    },
    [media.md]: {
        marginRight: '0.75rem',
    },
});

interface Props {
    rate: number;
    onCycleRate: () => void;
    hideOnMobile?: boolean;
}

export const RateControl: React.FC<Props> = props => (
    <VolumeWrapper hideOnMobile={props.hideOnMobile}>
        <Rate onClick={props.onCycleRate}>{`${props.rate}x`}</Rate>
    </VolumeWrapper>
);
