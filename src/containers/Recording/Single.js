import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Howl } from 'howler';

import { togglePlay, deleteRecording, updateRecording } from 'src/actions/old/recording';

import { addRecordingSnippet } from 'src/actions/old/editor';

import { formatTimeElapsed } from 'src/shared/helpers/time';

function mapStateToProps({ recording: { playingId, isFreeMusicPlaying } }) {
    return {
        playingId,
        isFreeMusicPlaying,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            togglePlay,
            deleteRecording,
            updateRecording,
            addRecordingSnippet,
        },
        dispatch,
    );
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
                onload: this.onLoad,
            });
        }

        componentWillReceiveProps({ playingId, id, name, isFreeMusicPlaying }) {
            if (playingId === id && !this.state.isPlaying && !isFreeMusicPlaying) {
                this.audio.play();
            }

            if (playingId !== id && this.state.isPlaying && !isFreeMusicPlaying) {
                this.audio.stop();
            }

            if (name !== this.props.name) {
                this.setState({ name });
            }
        }

        onLoad = () => {
            if (!this.props.duration) {
                const duration = this.audio.duration() * 1000;
                this.props.updateRecording({ id: this.props.id, duration });
            }
        };

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
        };

        onStop = () => {
            this.setState({
                isPlaying: false,
                startedAt: 0,
            });

            this.props.togglePlay(-1);

            if (this.updateTimeInterval) {
                clearInterval(this.updateTimeInterval);
            }
        };

        togglePlay = () => {
            this.props.togglePlay(this.props.id);
        };

        delete = () => {
            this.props.deleteRecording(this.props.id);
        };

        rename = ({ target: { value } }) => {
            this.props.updateRecording({ id: this.props.id, name: value });
        };

        handleNameChange = ({ target: { value } }) => {
            this.setState({ name: value });
        };

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    isPlaying={this.props.playingId === this.props.id}
                    timeElapsed={this.state.timeElapsed}
                    togglePlay={this.togglePlay}
                    deleteRecording={this.delete}
                    updateRecording={this.rename}
                    name={this.state.name}
                    audio={this.audio}
                    onNameChange={this.handleNameChange}
                />
            );
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Container);
}

export default createContainer;
