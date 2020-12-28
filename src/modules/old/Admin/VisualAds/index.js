import React from 'react'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import NewAd from './NewAd'
import ActiveAds from './ActiveAds'
import InactiveAds from './InactiveAds'
import styles from '../styles'

const BreadcrumbLinks = [
    {
        text: 'Admin',
        path: '/admin/dashboard',
    },
    {
        text: 'Visual Ads',
        path: '/admin/ads/visual',
    },
]

const VisualAds = () => (
    <div>
        <Breadcrumbs links={BreadcrumbLinks} style={styles.containerBreadcrumbs} />

        <div className={css(styles.container)}>
            <NewAd />
            <ActiveAds />
            <InactiveAds />
        </div>
    </div>
)

export default VisualAds
