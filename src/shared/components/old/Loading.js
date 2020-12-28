import React from 'react';
import Spinner from 'react-svg-spinner';

export const Loading = () => (
    <div css={{ height: '100vh' }}>
        <div
            css={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
            }}
        >
            <Spinner speed="fast" size="64px" thickness={1} />
        </div>
    </div>
);
