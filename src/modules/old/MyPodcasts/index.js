import React from 'react'
import { withRouter } from 'react-router-dom'

import MyShows from 'src/modules/old/Shows'
import { RequireUpgrade } from 'src/containers/hoc/requireUpgrade'
import { css } from 'src/styles/old'

import styles from './styles'

const MyPodcasts = () => (
    <div className={css(styles.container)}>
        <RequireUpgrade className={css(styles.body)}>
            <MyShows />
        </RequireUpgrade>
    </div>
)

export default withRouter(MyPodcasts)
