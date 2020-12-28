import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addLayer, moveRecordingSnippet } from 'src/actions/old/editor'
import { logDropSnippet } from 'src/modules/old/Admin/actions'
import { showDropWarning } from 'src/modules/old/Editor/actions'

function mapStateToProps({
    editor: {
        present: {
            currentTimelineTime,
            pixelsPerSecond,
            secondsPerSection,
            totalTimeSeconds,
            layerRecordings,
            isDropWarningVisible,
        },
    },
}) {
    return {
        currentTimelineTime,
        pixelsPerSecond,
        secondsPerSection,
        totalTimeSeconds,
        layerRecordings,
        isDropWarningVisible,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        componentDidMount() {}

        getLayerItems = () =>
            this.props.layerRecordings.filter(
                recordingSnippet => recordingSnippet.layer === this.props.layer.frontendId,
            )

        getAd = () => this.props.layerRecordings.filter(recordingSnippet => recordingSnippet.isAd)[0]

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    ad={this.getAd()}
                    recordingSnippets={this.getLayerItems()}
                />
            )
        }
    }

    return connect(
        mapStateToProps,
        {
            addLayer,
            moveRecordingSnippet,
            showDropWarning,
            logDropSnippet,
        },
    )(Container)
}

export default createContainer
/*  eslint-enable react/prop-type */
