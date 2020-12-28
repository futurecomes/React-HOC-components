import React, { Component } from 'react'
import { connect } from 'react-redux'

function mapStateToProps({
    editor: { present: { currentTimelineTime, pixelsPerSecond, isDropWarningVisible } },
}) {
    return {
        currentTimelineTime,
        pixelsPerSecond,
        isDropWarningVisible,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(mapStateToProps)(Container)
}

export default createContainer
