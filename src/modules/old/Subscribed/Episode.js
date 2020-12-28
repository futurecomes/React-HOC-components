/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';

import podcastPlaceholder from 'src/shared/components/old/shared/static/png/podcast_placeholder.png';
import { TogglePlayButton } from 'src/modules/Audio/components/TogglePlayButton';
import Link from 'src/shared/components/old/interactive/Link';
import { css } from 'src/styles/old';
import formatTime from 'src/shared/helpers/formatTime';

import styles from './styles';

function getShowTitle([{ id, title }]) {
    return (
        <Link alternate to={`/show/${id}`}>
            {title}
        </Link>
    );
}

class Episode extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            isOpen: false,
            isInitial: true,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(evt) {
        if (!evt.target.matches('button, svg, use, rect, polygon, .description')) {
            this.setState({
                isOpen: !this.state.isOpen,
                isInitial: false,
            });
        }
    }

    render() {
        const { guid, show, imageUrl, showExpanded, title, description, duration } = this.props;
        const { isOpen, isInitial } = this.state;

        const descriptionClassName = css(styles.descriptionWrapper, isOpen ? styles.open : !isInitial && styles.close);

        return (
            <div className={css(styles.episodeContainer)} onClick={this.toggle}>
                <div className={`episode ${css(styles.episodeWrapper)}`}>
                    <div
                        className={css(styles.showImg)}
                        style={{ backgroundImage: `url(${imageUrl || podcastPlaceholder})` }}
                    />
                    <div className={css(styles.episodeContent)}>
                        <span className={css(styles.showTitle)}>{getShowTitle(showExpanded)}</span>
                        <span className={css(styles.episodeTitle)}>{title}</span>
                    </div>
                    <div className={css(styles.rowColumn)}>
                        <span className={css(styles.duration, styles.orderLeft)}>{formatTime(duration)}</span>
                        <div className={css(styles.btnWrapper, styles.orderRight)}>
                            <TogglePlayButton podcast={this.props} showId={show} episodeId={guid} isSmall />
                        </div>
                    </div>
                </div>
                <div className={`description ${descriptionClassName}`}>
                    <p className={`description ${css(styles.grayTitle, styles.episodeDescription)}`}>{description}</p>
                </div>
            </div>
        );
    }
}

Episode.defaultProps = {
    releasedAt: null,
    imageUrl: podcastPlaceholder,
};

export default Episode;
