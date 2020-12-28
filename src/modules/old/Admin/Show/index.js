import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import Details from './Details'
import Episodes from './Episodes'
import AudioAds from './AudioAds'
import styles from '../styles'

const Show = ({
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
            text: 'Shows',
            path: '/admin/shows',
        },
        {
            text: `${id}`,
            path: `/admin/shows/${id}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <Details showId={id} />

                <div className={css(styles.divider)} />

                <Episodes showId={id} />

                <div className={css(styles.divider)} />

                <AudioAds showId={id} />
            </div>
        </div>
    )
}

export default withRouter(Show)
