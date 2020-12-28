import React from 'react'

import Container from 'src/containers/Admin/Show/Analytics'
import { css } from 'src/styles/old'

import styles from '../styles'

const formatPercent = value => `${Math.floor(value * 100)}%`

const Analytics = ({ subscriberCount, recorderUsedPercent, editorUsedPercent }) => (
    <div>
        <span className={css(styles.analyticsTitle)}>Platform Metrics</span>

        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText, styles.analyticsPrimary)}>Total Subscribers</span>
            <span className={css(styles.analyticsText, styles.analyticsPrimary)}>{subscriberCount}</span>
        </div>

        <span className={css(styles.analyticsTitle)}>Tool Usage Frequency</span>
        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText)}>Recording Studio</span>
            <span className={css(styles.analyticsText)}>{formatPercent(recorderUsedPercent)}</span>
        </div>
        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText)}>Editor</span>
            <span className={css(styles.analyticsText)}>{formatPercent(editorUsedPercent)}</span>
        </div>
    </div>
)

export default Container(Analytics)
