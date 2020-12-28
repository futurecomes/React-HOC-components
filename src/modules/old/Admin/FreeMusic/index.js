import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import Details from './Details'
import Shows from './Shows'
import styles from '../styles'

const FreeMusic = ({
    match: {
        params: { id },
    },
}) => {
    const breadcrumbLinks = [
        {
            text: 'Admin',
            path: '/admin/dashboard',
        },
        {
            text: 'Free Music',
            path: '/admin/freemusic',
        },
        {
            text: `${id}`,
            path: `/admin/freemusic/${id}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <Details id={id} />

                <div className={css(styles.divider)} />

                <Shows id={id} />
            </div>
        </div>
    )
}

export default withRouter(FreeMusic)
