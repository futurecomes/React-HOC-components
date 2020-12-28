import React from 'react'

import { css } from 'src/styles/old'

import styles from '../styles'

export const Polyline = ({ linePoints }) => (
    <div className={css(styles.svgContainer)} css={{ width: '100%' }}>
        <svg height="100%" width="100%">
            <polyline
                points={linePoints.toString()}
                css={{ stroke: '#bbdefb', fill: 'none', strokeWidth: '2' }}
            />
        </svg>
    </div>
)
