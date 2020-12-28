import React from 'react'

import Link from 'src/shared/components/old/interactive/Link'
import { css } from 'src/styles/old'

import styles from './styles'

export class SuccessfulVerification extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentPlan()
    }

    render() {
        return (
            <div className={css(styles.card, styles.regular)}>
                <h1 className={css(styles.title)}>Get Messy!</h1>

                <p className={css(styles.p, styles.pText)}>{'What do you want to do first?'}</p>

                <div className={css(styles.links)}>
                    <Link to="/listen" type="blue" style={styles.link}>
                        Listen to Podcasts
                    </Link>
                    <Link to="/create#record" type="purple" style={styles.link}>
                        Record a Show
                    </Link>
                    <Link to="/account" type="green" style={styles.link}>
                        Complete My Profile
                    </Link>
                </div>
            </div>
        )
    }
}
