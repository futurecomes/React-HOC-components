import React from 'react'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'

import NewAd from './NewAd'
import ActiveAds from './ActiveAds'
import InactiveAds from './InactiveAds'
import { css } from 'src/styles/old'
import styles from '../styles'

const BreadcrumbLinks = [
    {
        text: 'Admin',
        path: '/admin/dashboard',
    },
    {
        text: 'Audio Ads',
        path: '/admin/ads/audio',
    },
]

const AudioAds = () => (
    <div>
        <Breadcrumbs links={BreadcrumbLinks} style={styles.containerBreadcrumbs} />

        <div className={css(styles.container)}>
            <NewAd />
            <ActiveAds />
            <InactiveAds />
        </div>
    </div>
)

export default AudioAds
