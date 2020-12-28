import React from 'react'

import styles from 'src/shared/components/old/Podcast/styles'
import Link from 'src/shared/components/old/interactive/Link'
import { css } from 'src/styles/old'

// LEGACY
export const NotFound = () => (
    <div className={css(styles.notFound, styles.topMargin)}>
        <h1>Whoops!</h1>
        <h4>
            The page you are looking for cannot be found. Find podcasts to listen to{' '}
            <Link to="/listen" alternate>
                here
            </Link>
            &nbsp;and start creating your own podcast &nbsp;
            <Link alternate to="/how-to-get-started">
                here
            </Link>
        </h4>
    </div>
)
