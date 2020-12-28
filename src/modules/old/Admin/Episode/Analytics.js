import React from 'react'

import Container from 'src/containers/Admin/Episode/Analytics'
import { css } from 'src/styles/old'

import styles from '../styles'

const Analytics = ({ totalListens, recorderUsed, editorUsed }) => (
    <div>
        <span className={css(styles.analyticsTitle)}>Platform Metrics</span>

        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText, styles.analyticsPrimary)}>Total Listens</span>
            <span className={css(styles.analyticsText, styles.analyticsPrimary)}>{totalListens}</span>
        </div>

        <span className={css(styles.analyticsTitle)}>Messy Tools</span>
        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText)}>Audio from Recording Editor</span>
            <span className={css(styles.analyticsText)}>{recorderUsed ? 'Yes' : 'No'}</span>
        </div>
        <div className={css(styles.analyticsRow)}>
            <span className={css(styles.analyticsText)}>Used Editor</span>
            <span className={css(styles.analyticsText)}>{editorUsed ? 'Yes' : 'No'}</span>
        </div>
    </div>
)

export default Container(Analytics)
