import React from 'react'
import { withRouter } from 'react-router-dom'

import { css } from 'src/styles/old'

import Library from './Library'
import styles from './styles'

const Subscribed = ({ location: { pathname } }) => (
    <div className={css(styles.pageWrapper)}>
        <h1 className={css(styles.pageTitle)}> Subscribed </h1>
        <Library />
    </div>
)

export default withRouter(Subscribed)
