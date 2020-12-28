import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import Details from './Details'
import Episodes from './Episodes'
import styles from '../styles'

const AudioAd = ({
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
            text: 'Audio Ads',
            path: '/admin/ads/audio',
        },
        {
            text: `${id}`,
            path: `/admin/ads/audio/${id}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <Details id={id} />

                <div className={css(styles.divider)} />

                <Episodes adId={id} />
            </div>
        </div>
    )
}

export default withRouter(AudioAd)
