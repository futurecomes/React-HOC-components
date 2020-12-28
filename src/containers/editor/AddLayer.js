import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addLayer } from 'src/actions/old/editor'
import { showDropWarning } from 'src/modules/old/Editor/actions'
import { logDropSnippet } from 'src/modules/old/Admin/actions'

function mapStateToProps({
    editor: {
        present: { layers, layerRecordings, isDropWarningVisible },
    },
}) {
    return {
        layerRecordings,
        isDropWarningVisible,
        numberOfLayers: layers.length,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        getAd = () => this.props.layerRecordings.filter(recordingSnippet => recordingSnippet.isAd)[0]

        render() {
            return <ComposedComponent ad={this.getAd()} {...this.props} />
        }
    }

    return connect(
        mapStateToProps,
        {
            addLayer,
            showDropWarning,
            logDropSnippet,
        },
    )(Container)
}

export default createContainer
