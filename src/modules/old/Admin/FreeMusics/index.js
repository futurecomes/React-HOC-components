import React from 'react'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import NewMusic from './NewMusic'
import ActiveMusic from './ActiveMusic'
import InactiveMusic from './InactiveMusic'
import styles from '../styles'

const BreadcrumbLinks = [
    {
        text: 'Admin',
        path: '/admin/dashboard',
    },
    {
        text: 'Free Music',
        path: '/admin/freemusic',
    },
]

const VisualAds = () => (
    <div>
        <Breadcrumbs links={BreadcrumbLinks} style={styles.containerBreadcrumbs} />

        <div className={css(styles.container)}>
            <NewMusic />
            <ActiveMusic />
            <InactiveMusic />
        </div>
    </div>
)

export default VisualAds
