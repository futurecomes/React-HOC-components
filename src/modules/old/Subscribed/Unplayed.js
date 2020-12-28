import React from 'react';

import Link from 'src/shared/components/old/interactive/Link';
import { css } from 'src/styles/old';

import UnplayedContainer from './containers/Unplayed';
import styles from './styles';
import Episode from './Episode';
import { MONTHS_MAP } from './config';

function formatDate(inputDate) {
    const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

    return `${MONTHS_MAP[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const Unplayed = ({ episodes }) => (
    <div className={css(styles.showContainer)}>
        {Object.keys(episodes).map(episodeDate => (
            <div className={css(styles.unplayedEpisodeContainer)} key={episodeDate}>
                <div className={css(styles.unplayedEpisodeHeader)}>
                    <span className={css(styles.unplayedEpisodeTitle)}>{formatDate(episodeDate)}</span>
                </div>
                <div className={css(styles.episodeListWrapper)}>
                    {episodes[episodeDate]
                        .sort((a, b) => b.orderIndex - a.orderIndex)
                        .map(episode => (
                            <Episode
                                {...episode}
                                showExpanded={
                                    episode.showExpanded || [
                                        { id: episode.show, title: episode.showTitle || 'Untitled Show' },
                                    ]
                                }
                                creatorExpanded={
                                    episode.creatorExpanded || [{ name: episode.creatorName || 'Unknown Artist' }]
                                }
                                key={episode.id}
                            />
                        ))}
                </div>
            </div>
        ))}
        {Object.keys(episodes).length === 0 && (
            <div className={css(styles.discoverMore)}>
                <p>
                    <small>
                        You’ve listened to all of the episodes of the podcasts you’re currently subscribed to. Discover
                        even more podcasts to add to your playlist
                    </small>
                </p>
                <Link style={styles.discoverButton} to="/listen" type="blue">
                    Discover
                </Link>
            </div>
        )}
    </div>
);

export default UnplayedContainer(Unplayed);
