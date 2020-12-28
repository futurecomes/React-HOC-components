import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'

import {
    initRecorder,
    startRecording,
    startUploading,
    receivedWaveData,
    didFailToGetStream,
    closeSession,
    stopListening,
    setRecordingName,
} from 'src/actions/old/recording'
import { setUpRecorder } from 'src/modules/old/Recording/actions/actions'
import { RECORDING_TIME_COUNTER } from 'src/modules/old/Recording/epics/mediaRecorder'
import {
    showRecordingErrorMessage,
    emitChunk,
    instantiateMultiPart,
    abortMultipartUpload,
} from 'src/modules/old/Recording/actions/actions'

import fullContainer from './index'
import { initializeVisualizer } from './visualizer'

function mapStateToProps({ recording }) {
    return {
        ...recording,
    }
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
        setUpRecorder,
        emitChunk,
        instantiateMultiPart,
        abortMultipartUpload,
    },
)

function createContainer(ComposedComponent) {
    class Container extends Component {
        canvasRef = React.createRef()

        async componentDidMount() {
            const { id } = this.props.match.params
            if (_isEmpty(this.props.session)) {
                this.props.fetchSession(id)
            }
            if (id) {
                this.props.fetchRecordings(id)
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        deviceId: this.props.inputDeviceId,
                    },
                })

                this.props.initRecorder()
                this.recorder = new MediaRecorder(stream)
                this.recorder.addEventListener('dataavailable', e => this.props.emitChunk(e.data))
                initializeVisualizer(this.canvasRef.current, stream)
            } catch (err) {
                this.props.showRecordingErrorMessage(
                    'Failed to start the recording. Try on different browser.',
                )
            }
        }

        componentDidUpdate(prevProps) {
            if (
                prevProps.timeCounter === RECORDING_TIME_COUNTER - 1 &&
                this.props.timeCounter === RECORDING_TIME_COUNTER
            ) {
                this.recorder.start(1000)
            }
        }

        componentWillUnmount() {
            this.props.closeSession()
        }

        startRecording = () => {
            this.props.instantiateMultiPart({ recorder: this.recorder })
        }

        stopRecording = () => {
            const stoppedAt = Date.now()
            this.props.stopListening(stoppedAt)
            this.recorder.stop()
        }

        renderOscillator = () => {
            return (
                <canvas
                    ref={this.canvasRef}
                    id="canvas"
                    style={{ display: this.props.isRecording ? 'block' : 'none' }}
                    width={740}
                    height={75}
                />
            )
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    startRecording={this.startRecording}
                    stopRecording={this.stopRecording}
                    renderOscillator={this.renderOscillator}
                />
            )
        }
    }

    return container(fullContainer(Container))
}

export default createContainer
