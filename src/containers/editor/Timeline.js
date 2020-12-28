import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from 'src/actions/old/editor'
import * as selectors from 'src/modules/old/Editor/selectors'

function mapStateToProps(state) {
    const {
        editor: { present },
        editorMeta: { isTrimMode },
    } = state
    return {
        pixelsPerSecond: present.pixelsPerSecond,
        secondsPerSection: present.secondsPerSection,
        totalTimeSeconds: present.totalTimeSeconds,
        latestSnippetTime: present.latestSnippetTime,
        isTrimMode,
        numSections: selectors.numSectionsSelector(state),
        sectionWidth: selectors.sectionWidthSelector(state),
        totalWidth: selectors.totalWidthSelector(state),
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(props, ...args) {
            super(props, ...args)
            this.timelineClick = this.timelineClick.bind(this)
        }

        // rerender on latestsnippettime change if its larger than the default timeline length
        shouldComponentUpdate(nextProps) {
            const { pixelsPerSecond, secondsPerSection, isTrimMode } = nextProps
            if (
                pixelsPerSecond !== this.props.pixelsPerSecond ||
                secondsPerSection !== this.props.secondsPerSection ||
                this.props.latestSnippetTime !== nextProps.latestSnippetTime ||
                this.props.isTrimMode !== isTrimMode ||
                this.props.isDropWarningVisible !== nextProps.isDropWarningVisible
            ) {
                return true
            }

            return false
        }

        timelineClick(event) {
            const offsetX = event.nativeEvent.offsetX
            const newTime = offsetX / this.props.pixelsPerSecond
            this.props.setTimelineTime(newTime)
        }

        render() {
            return <ComposedComponent {...this.props} timelineClick={this.timelineClick} />
        }
    }

    return connect(
        mapStateToProps,
        {
            addLayer: actions.addLayer,
            setTimelineTime: actions.setTimelineTime,
            setZoom: actions.setZoom,
            editorSetTrimMode: actions.editorSetTrimMode,
            editorTrimSelections: actions.editorTrimSelections,
        },
    )(Container)
}

export default createContainer
