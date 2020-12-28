import React from 'react'

import Link from 'src/shared/components/old/interactive/Link'
import Podcast from 'src/modules/old/Podcast/Podcast'
import { css } from 'src/styles/old'

import LibraryContainer from './containers/Library'
import styles from './styles'

const Library = ({ subscriptions }) => (
    <div className={css(styles.showContainer)}>
        {subscriptions.map(subscription => (
            <Podcast id={subscription.show} key={subscription.show} showUnplayedCount canToggleEpisodes />
        ))}

        {subscriptions.length === 0 && (
            <div className={css(styles.discoverMore)}>
                <span className={css(styles.discoverTitle)}>Discover New Podcasts To Love</span>
                <Link style={styles.discoverButton} to="/listen" type="blue">
                    Discover
                </Link>
            </div>
        )}
    </div>
)

export default LibraryContainer(Library)
