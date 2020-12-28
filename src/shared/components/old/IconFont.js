import React from 'react';

import { colors } from 'src/styles/old';

export function IconFont({ children, type = undefined, ...rest }) {
    return (
        <i
            className="material-icons"
            css={{
                transition: 'color .2s',
                cursor: 'pointer',
                color: colors[type] || rest.color || 'black',
                userSelect: 'none',
                ...rest,
            }}
            onClick={rest.onClick}
        >
            {children}
        </i>
    );
}
