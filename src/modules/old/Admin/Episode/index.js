import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'

import Details from './Details'
import { css } from 'src/styles/old'
import styles from '../styles'

const Episode = ({
    match: {
        params: { showId, episodeId },
    },
}) => {
    const breadcrumbLinks = [
        {
            text: 'Admin',
            path: '/admin/dashboard',
        },
        {
            text: 'Shows',
            path: '/admin/shows',
        },
        {
            text: `${showId}`,
            path: `/admin/shows/${showId}`,
        },
        {
            text: `Episode ${episodeId}`,
            path: `/admin/shows/${showId}/${episodeId}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <Details episodeId={episodeId} />
            </div>
        </div>
    )
}

export default withRouter(Episode)
