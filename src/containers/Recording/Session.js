import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty, throttle as _throttle } from 'lodash';
import Recorder from 'recorder-js';
import WaveStream from 'react-wave-stream';

import {
    initRecorder,
    startRecording,
    startUploading,
    receivedWaveData,
    didFailToGetStream,
    closeSession,
    stopListening,
    setRecordingName,
} from 'src/actions/old/recording';
import audioContext from 'src/config/audioContext';
import { showRecordingErrorMessage } from 'src/modules/old/Recording/actions/actions';
import { RECORDING_TIME_COUNTER } from 'src/modules/old/Recording/epics/mediaRecorder';
import { colors } from 'src/styles/old';

import fullContainer from './index';

function mapStateToProps({ recording }) {
    return {
        ...recording,
    };
}

const container = connect(
    mapStateToProps,
    {
        initRecorder,
        startRecording,
        startUploading,
        receivedWaveData,
        didFailToGetStream,
        closeSession,
        showRecordingErrorMessage,
        stopListening,
        setRecordingName,
    },
);

function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(props) {
            super(props);

            this.state = {
                waveData: {
                    data: [],
                    lineTo: 0,
                },
            };

            this.stopRecordingThrottled = _throttle(this.stopRecording, 1000);
            this.startRecordingThrottled = _throttle(this.startRecording, 1000);

            this.recorder = new Recorder(audioContext, {
                onAnalysed: this.onAnalysed,
            });
        }

        componentDidMount() {
            const { id } = this.props.match.params;
            if (_isEmpty(this.props.session)) {
                this.props.fetchSession(id);
            }
            if (id) {
                this.props.fetchRecordings(id);
            }
            this.getMedia(this.props.inputDeviceId || true);
        }

        componentWillReceiveProps({ inputDeviceId }) {
            if (inputDeviceId !== this.props.inputDeviceId) {
                this.getMedia(inputDeviceId);
            }
        }

        componentWillUnmount() {
            this.props.closeSession();
            if (this.recorder && this.recorder.stream) {
                this.recorder.stream.getTracks().forEach(e => e.stop());
                this.recorder.config.onAnalysed = null;
            }
        }

        componentDidUpdate(prevProps) {
            if (
                prevProps.timeCounter === RECORDING_TIME_COUNTER - 1 &&
                this.props.timeCounter === RECORDING_TIME_COUNTER
            ) {
                this.recorder
                    .start()
                    .catch(e => this.props.showRecordingErrorMessage('Failed to start the recording.', e));
            }
        }

        onAnalysed = _throttle(data => {
            if (this.props.isRecording === false) {
                return;
            }
            this.setState({ waveData: data });
        }, 50);

        getMedia = () => {
            navigator.mediaDevices
                .getUserMedia({
                    audio: {
                        deviceId: this.props.inputDeviceId,
                    },
                })
                .then(stream => {
                    this.recorder
                        .init(stream)
                        .catch(() =>
                            this.props.showRecordingErrorMessage(
                                'Failed to start the recording. Please try on newer browser.',
                            ),
                        );
                    this.props.initRecorder();
                })
                .catch(this.props.didFailToGetStream);
        };

        startRecording = () => {
            this.props.startRecording();
        };

        stopRecording = () => {
            const stoppedAt = Date.now();
            this.props.stopListening(stoppedAt);
            this.recorder
                .stop()
                .then(data => {
                    if (data.blob.size <= 10000) {
                        this.props.showRecordingErrorMessage(
                            'Your recording is too small. Please try to play the audio file you have just recorded. If something is wrong please email us at help@messy.fm.',
                        );
                    }
                    this.props.startUploading(data);
                })
                .catch(e => this.props.showRecordingErrorMessage('Failed to stop the recording.', e));
        };

        renderOscillator = () => {
            const { isRecording } = this.props;
            const { waveData } = this.state;
            return (
                <WaveStream
                    data={isRecording ? waveData.data : []}
                    lineTo={isRecording ? waveData.lineTo : 0}
                    backgroundColor={colors.softPink}
                    stroke={colors.salmon}
                />
            );
        };

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    renderOscillator={this.renderOscillator}
                    startRecording={this.startRecordingThrottled}
                    stopRecording={this.stopRecordingThrottled}
                />
            );
        }
    }

    return container(fullContainer(Container));
}

export default createContainer;
