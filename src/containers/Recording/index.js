import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
    openSession,
    closeSession,
    updateSession,
    saveSession,
    fetchSession,
    fetchSessions,
    setSessionForm,
    deleteSession,
    fetchRecordings,
    toggleMicCheck,
    stopListening,
    setRecordingName,
} from 'src/actions/old/recording'

function mapStateToProps({
    recording: {
        recordings,
        sessions,
        session,
        form,
        playingId,
        isSaving,
        isFetching,
        isFetchingAll,
        isRecording,
        isMicCheck,
        isInitial,
        inputDeviceId,
        devices,
        isSession,
    },
}) {
    return {
        recordings,
        sessions,
        session,
        form,
        playingId,
        isSaving,
        isFetching,
        isFetchingAll,
        isRecording,
        isMicCheck,
        isInitial,
        inputDeviceId,
        devices,
        isSession,
    }
}

const onNameChange = name => setSessionForm({ name })

const container = connect(
    mapStateToProps,
    {
        openSession,
        closeSession,
        onNameBlur: updateSession,
        onNameChange,
        saveSession,
        fetchSessions,
        fetchSession,
        deleteSession,
        fetchRecordings,
        stopListening,
        setRecordingName,
        toggleMicCheck: () => toggleMicCheck(),
    },
)

function createContainer(ComposedComponent) {
    class Container extends Component {
        state = {
            isNavigated: false,
        }

        componentDidUpdate() {
            if (this.state.isNavigated) {
                this.handleUpdate(this.props)
            }
        }

        componentWillUnmount() {
            if (this.unlisten) {
                this.unlisten()
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return container(withRouter(Container))
}

export default createContainer
