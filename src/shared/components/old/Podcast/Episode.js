/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';
import Linkify from 'react-linkify';
import Modal from 'react-modal';

import ShareButton from 'src/shared/components/old/ShareButton';
import { TogglePlayButton } from 'src/modules/Audio/components/TogglePlayButton';
import formatTime from 'src/shared/helpers/formatTime';
import { css, modalStyles } from 'src/styles/old';

import styles from './styles';
import arrowDown from '../static/svg/down-arrow.svg';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import {
    OpenedEpisodeContainer,
    EpisodeLinkInput,
    EpisodeLinkLabel,
    EpisodeLinkContainer,
    EpisodeDescription,
} from './styled';

class Episode extends Component {
    state = {
        isOpen: false,
        isShareModalOpen: false,
        isInitial: true,
        parsedDescription: mapHtmlToString(this.props.description),
    };

    toggleShareModal = () => {
        this.setState(state => ({ ...state, isShareModalOpen: !this.state.isShareModalOpen }));
    };

    toggle = evt => {
        if (!evt.target.matches('button, svg, use, rect, polygon, .description')) {
            this.setState({ isOpen: !this.state.isOpen, isInitial: false });
        }
    };

    render() {
        const {
            guid,
            show,
            title,
            description,
            releasedAt,
            createdAt,
            duration,
            url,
            no,
            totalListens,
            isPlayed,
            creatorName,
            imageUrl,
        } = this.props;
        const { isOpen, isInitial, parsedDescription } = this.state;

        const descriptionClassName = css(styles.descriptionWrapper, isOpen ? styles.open : !isInitial && styles.close);

        const playedIndicatorClassName = css(
            styles.playedIndicator,
            isPlayed === 'started' && styles.started,
            isPlayed === 'finished' && styles.finished,
        );

        if (window.innerWidth > 670) {
            return (
                <div className={css(styles.episodeContainer)}>
                    <div className={`episode ${css(styles.showEpisodeWrapper)}`}>
                        <span className={playedIndicatorClassName}/>
                        <TogglePlayButton
                            podcast={{
                                guid,
                                show,
                                title,
                                description,
                                releasedAt,
                                createdAt,
                                duration,
                                url,
                                totalListens,
                                creatorName,
                                imageUrl,
                            }}
                            showId={show}
                            episodeId={guid}
                            isSmall
                        />
                        <div className={css(styles.episodeContent)}>
                            <span className={css(styles.episodeTitle)}>{title}</span>
                            <span className={css(styles.episodeNo)}>Episode {no}</span>
                        </div>
                        <img
                            onClick={this.toggle}
                            src={arrowDown}
                            className={css(styles.downArrow)}
                            alt={`Show ${isOpen ? 'Less' : 'More'}`}
                        />
                        <div className={css(styles.rowColumn)}>
                            <ShareButton onClick={this.toggleShareModal}/>
                            <span className={css(styles.duration, styles.orderLeft)}>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <OpenedEpisodeContainer className={descriptionClassName}>
                        <div className={css(styles.descriptionTextWrapper)}>
                            <Linkify properties={{target: '_blank'}}>
                                <EpisodeDescription>{parsedDescription}</EpisodeDescription>
                            </Linkify>
                        </div>
                    </OpenedEpisodeContainer>
                    <Modal isOpen={this.state.isShareModalOpen} onRequestClose={this.toggleShareModal}
                           style={modalStyles}>
                        <EpisodeLinkContainer>
                            <EpisodeLinkLabel>Link directly to this episode:</EpisodeLinkLabel>
                            <EpisodeLinkInput value={`${window.location.hostname}/podcast/${guid}`} readOnly/>
                        </EpisodeLinkContainer>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div className={css(styles.episodeContainer)}>
                    <div className={`episode ${css(styles.showEpisodeWrapperMobile)}`}>
                        <span className={playedIndicatorClassName}/>
                        <div className={css(styles.episodeContentMobile)}>
                            <TogglePlayButton
                                podcast={{
                                    guid,
                                    show,
                                    title,
                                    description,
                                    releasedAt,
                                    createdAt,
                                    duration,
                                    url,
                                    totalListens,
                                    creatorName,
                                    imageUrl,
                                }}
                                showId={show}
                                episodeId={guid}
                                isSmall
                            />
                            <span className={css(styles.episodeTitle)}>{title}</span>
                        </div>
                        <div className={css(styles.episodeSubContentMobile)}>
                            <span className={css(styles.episodeNo)}>Episode {no}</span>
                            <img
                                onClick={this.toggle}
                                src={arrowDown}
                                className={css(styles.downArrow)}
                                alt={`Show ${isOpen ? 'Less' : 'More'}`}
                            />
                            <div className={css(styles.rowColumn)}>
                                <ShareButton onClick={this.toggleShareModal}/>
                                <span className={css(styles.duration, styles.orderLeft)}>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                    <OpenedEpisodeContainer className={descriptionClassName}>
                        <div className={css(styles.descriptionTextWrapper)}>
                            <Linkify properties={{target: '_blank'}}>
                                <EpisodeDescription>{parsedDescription}</EpisodeDescription>
                            </Linkify>
                        </div>
                    </OpenedEpisodeContainer>
                    <Modal isOpen={this.state.isShareModalOpen} onRequestClose={this.toggleShareModal}
                           style={modalStyles}>
                        <EpisodeLinkContainer>
                            <EpisodeLinkLabel>Link directly to this episode:</EpisodeLinkLabel>
                            <EpisodeLinkInput value={`${window.location.hostname}/podcast/${guid}`} readOnly/>
                        </EpisodeLinkContainer>
                    </Modal>
                </div>
            );
        }
    }
}

Episode.defaultProps = {
    releasedAt: null,
    description: '',
    totalListens: 0,
    isPlayed: 'unplayed',
};

export default Episode;
