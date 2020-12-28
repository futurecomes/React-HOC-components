import React from 'react'
import { withRouter } from 'react-router-dom'

import Podcast from './Podcast'
import { css } from 'src/styles/old'

import styles from './styles'

const PodcastPage = ({
    match: {
        params: { id },
    },
}) => (
    <div className={css(styles.container)}>
        <Podcast id={parseInt(id, 10)} />
    </div>
)

export default withRouter(PodcastPage)
