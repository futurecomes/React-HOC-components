import React from 'react'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import { css } from 'src/styles/old'

import UserDetails from './Details'
import UserShows from './Shows'
import UserLogs from './Logs'

import styles from '../styles'

const User = ({
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
            text: 'Users',
            path: '/admin/users',
        },
        {
            text: `${id}`,
            path: `/admin/users/${id}`,
        },
    ]

    return (
        <div>
            <Breadcrumbs links={breadcrumbLinks} style={styles.containerBreadcrumbs} />

            <div className={css(styles.container)}>
                <UserDetails userId={id} />

                <div className={css(styles.divider)} />

                <UserShows userId={id} />

                <div className={css(styles.divider)} />

                <UserLogs userId={id} />
            </div>
        </div>
    )
}

export default withRouter(User)
