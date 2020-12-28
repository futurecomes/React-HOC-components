import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import Details from './Details'
import styles from '../styles'

const VisualAd = ({
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
            text: 'Visual Ads',
            path: '/admin/ads/visual',
        },
        {
            text: `${id}`,
            path: `/admin/ads/visual/${id}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <Details id={id} />
            </div>
        </div>
    )
}

export default withRouter(VisualAd)
