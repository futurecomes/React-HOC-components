import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

import Howls from './Howls';
import * as actions from 'src/actions/old/editor';
import { enableTrim } from 'src/modules/old/Editor/actions';
import * as selectors from 'src/modules/old/Editor/selectors/item';
import { format } from 'src/config/settings';

function mapStateToProps(state, ownProps) {
    const {
        editor: { present },
        editorMeta: { playerStatus, isTrimMode },
        billing: { currentPlan },
    } = state;
    const adSnippet = present.layerRecordings.find(r => r.isAd);
    return {
        pixelsPerSecond: present.pixelsPerSecond,
        secondsPerSection: present.secondsPerSection,
        totalTimeSeconds: present.totalTimeSeconds,
        currentTimelineTime: present.currentTimelineTime,
        draftItems: present.draftItems,
        isTrimMode,
        playerStatus,
        xPosition: selectors.xPositionSelector(state, ownProps.item),
        maxWidth: selectors.maxWidthSelector(state, ownProps.item),
        canFade: selectors.canFadeSelector(ownProps.item),
        width: selectors.widthSelector(state, ownProps.item),
        linePoints: selectors.linePointsSelector(state, ownProps.item),
        canTrim: selectors.canTrimSelector(state, ownProps.item),
        isPremium: currentPlan && /premium/i.test(currentPlan.type),
        adDuration: adSnippet ? adSnippet.playDuration : 0,
    };
}
function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(props) {
            super(props);
            const isHowlObject = !!Howls[props.item.frontendId];
            this.state = {
                isLoading: !isHowlObject,
            };

            if (!isHowlObject) {
                Howls[props.item.frontendId] = new Howl({
                    src: [props.item.url],
                    html5: true,
                    preload: true,
                    onload: this.onLoad,
                    onloaderror: this.onLoadError,
                    onplayerror: this.onPlayError,
                    format,
                });
            }
        }

        timeoutIDs = [];

        componentWillUnmount() {
            this.unmounted = true;
            Howls[this.props.item.frontendId].stop();
        }

        componentWillReceiveProps({ audioVolume, playerStatus, currentTimelineTime }) {
            const { item } = this.props;
            const { timelineOffset, playDuration, fadeIn, fadeOut, fadeDuration } = item;
            if (this.props.playerStatus !== playerStatus && playerStatus === 'stop') {
                this.clearTimeouts();
                Howls[item.frontendId].stop();
            }
            if (this.props.playerStatus !== playerStatus && playerStatus === 'pause') {
                this.clearTimeouts();
                Howls[item.frontendId].stop();
            }
            if (this.props.playerStatus !== playerStatus && playerStatus === 'play') {
                this.playSnippet();
            }

            // Do volume fade within play time of layer item
            const endTime = timelineOffset + playDuration;
            if (fadeIn || fadeOut) {
                Howls[item.frontendId].volume(0);
                if (
                    currentTimelineTime <= endTime &&
                    currentTimelineTime >= timelineOffset &&
                    playerStatus === 'play'
                ) {
                    let volume = audioVolume;
                    if (fadeOut && endTime - currentTimelineTime <= fadeDuration) {
                        volume = (endTime - currentTimelineTime) / fadeDuration;
                    } else if (
                        fadeIn &&
                        currentTimelineTime + fadeDuration >= timelineOffset &&
                        currentTimelineTime - timelineOffset <= fadeDuration
                    ) {
                        volume = (currentTimelineTime - timelineOffset) / fadeDuration;
                    }

                    if (volume !== Howls[item.frontendId].volume()) {
                        Howls[item.frontendId].volume(volume);
                    }
                }
            } else if (Howls[item.frontendId].volume() !== audioVolume) {
                Howls[item.frontendId].volume(audioVolume);
            }
        }
        // we don't want to rerender each time the the currentTime increments
        shouldComponentUpdate(nextProps) {
            if (this.props.currentTimelineTime !== nextProps.currentTimelineTime) {
                // ignore
                return false;
            }
            return true;
        }

        // play an audio file with the various offsets applied
        // this should be called 'simultaneously' for all snippets
        playSnippet = () => {
            const {
                currentTimelineTime,
                item: { timelineOffset, startOffset, playDuration, frontendId },
            } = this.props;
            const howl = Howls[frontendId];
            const trueOffset = Math.abs(currentTimelineTime - timelineOffset);
            // current time is past the song snippet
            if (currentTimelineTime > timelineOffset + playDuration) {
                return;
            }

            if (currentTimelineTime < timelineOffset) {
                // eslint-disable-next-line
                howl._sprite.snippet = [startOffset * 1000, playDuration * 1000];
                this.enqueueTimeout(setTimeout(() => howl.play('snippet'), trueOffset * 1000));
            } else {
                const playPoint = (currentTimelineTime - timelineOffset + startOffset) * 1000;
                const offsetDuration = playDuration + timelineOffset - currentTimelineTime;
                // eslint-disable-next-line
                howl._sprite.snippet = [playPoint, offsetDuration * 1000];
                howl.play('snippet');
            }
        };

        enqueueTimeout = id => {
            this.timeoutIDs.push(id);
        };

        clearTimeouts = () => {
            this.timeoutIDs.forEach(id => {
                clearTimeout(id);
            });
            this.timeoutIDs = [];
        };

        onLoad = () => {
            const { item } = this.props;
            this.setState({ isLoading: false });
            if (this.unmounted || item.trimmedPart) {
                return;
            }
            const duration = item.playDuration;
            this.props.setSnippetDuration(item, duration * 1000);
            this.props.recomputeTimelineLength(item.timelineOffset + duration + 1000);
        };

        onLoadError = () => {};

        onPlayError = () => {
            this.props.editorSetPause();
        };

        playFromOffsets = () => {
            this.audio.play();
        };

        render() {
            return <ComposedComponent isLoading={this.state.isLoading} {...this.props} audio={this.audio} />;
        }
    }
    /* eslint-enable */

    return connect(
        mapStateToProps,
        {
            addLayer: actions.addLayer,
            moveRecordingSnippet: actions.moveRecordingSnippet,
            switchRecordingSnippet: actions.switchRecordingSnippet,
            editorSetPause: actions.editorSetPause,
            setSnippetDuration: actions.setSnippetDuration,
            recomputeTimelineLength: actions.recomputeTimelineLength,
            changeStartOffset: actions.changeStartOffset,
            changePlayDuration: actions.changePlayDuration,
            deleteRecordingSnippet: actions.deleteRecordingSnippet,
            fadeRecordingSnippet: actions.fadeRecordingSnippet,
            setTrimX: actions.setTrimX,
            editorTrimSelections: actions.editorTrimSelections,
            enableTrim,
        },
    )(Container);
}

export default createContainer;
