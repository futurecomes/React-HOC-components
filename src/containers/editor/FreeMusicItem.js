import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

import { toggleFreePlay } from 'src/actions/old/recording';

import { addFreeMusicSnippet } from 'src/actions/old/editor';

import { formatTimeElapsed } from 'src/shared/helpers/time';
import { addMusicItemToBasket } from 'src/shared/components/old/Billing/actions';

function mapStateToProps(
    {
        recording: { isFreeMusicPlaying, playingId },
        billing: { currentPlan, freeMusicBasket },
        editor: { present },
        auth: { user },
    },
    props,
) {
    const adSnippet = present.layerRecordings.find(r => r.isAd);
    return {
        isFreeMusicPlaying,
        playingId,
        isPremium: currentPlan && /premium/i.test(currentPlan.type),
        adDuration: adSnippet ? adSnippet.playDuration : 0,
        musicLibraryInBasket: freeMusicBasket.musicLibrary,
        songPaid: user.musicLibraryTotalAccess || (user.musicLibrary && user.musicLibrary.includes(props.id)),
    };
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isPlaying: false,
                timeElapsed: '',
                startedAt: null,
                name: props.name,
            };

            this.audio = new Howl({
                src: [props.url],
                preload: false,
                html5: true,
                onplay: this.onPlay,
                onstop: this.onStop,
                onend: this.onStop,
            });
        }

        componentWillReceiveProps({ playingId, id, isFreeMusicPlaying }) {
            if (playingId === id && !this.state.isPlaying && isFreeMusicPlaying) {
                this.audio.load();
                this.audio.play();
            }

            if (playingId !== id && this.state.isPlaying && isFreeMusicPlaying) {
                this.audio.stop();
            }
        }

        componentWillUnmount() {
            this.audio.unload();
        }

        updateTime = () => {
            this.setState({
                timeElapsed: formatTimeElapsed(this.state.startedAt),
            });
        };

        onPlay = () => {
            this.setState({
                isPlaying: true,
                startedAt: Date.now(),
                timeElapsed: formatTimeElapsed(Date.now()),
            });

            this.updateTimeInterval = setInterval(this.updateTime, 100);
        };

        onStop = id => {
            this.setState({
                isPlaying: false,
                startedAt: 0,
            });

            if (id === true) {
                this.props.toggleFreePlay(-1);
            }

            if (this.updateTimeInterval) {
                clearInterval(this.updateTimeInterval);
            }
        };

        togglePlay = () => {
            this.props.toggleFreePlay(this.props.id);
        };

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    isPlaying={this.props.playingId === this.props.id}
                    timeElapsed={this.state.timeElapsed}
                    togglePlay={this.togglePlay}
                    name={this.state.name}
                    audio={this.audio}
                />
            );
        }
    }

    return connect(
        mapStateToProps,
        {
            toggleFreePlay,
            addFreeMusicSnippet,
            addMusicItemToBasket,
        },
    )(Container);
}

export default createContainer;
