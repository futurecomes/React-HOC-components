import React from 'react';
import { DragSource } from 'react-dnd';
import { truncate } from 'lodash/fp';
import ApiRecording from 'src/api/recording';

import PlayButton from 'src/shared/components/old/interactive/PlayButton';
import PauseButton from 'src/shared/components/old/interactive/PauseButton';
import container from 'src/containers/Recording/SingleNoPreload';
import { css } from 'src/styles/old';
import { formatTime } from 'src/shared/helpers/time';

import { TYPES } from './constants';
import styles from './styles';

const truncateName = truncate({ length: 18 });

function getDuration(duration) {
    if (!duration) {
        return '';
    }

    return formatTime(duration);
}

/* eslint-disable */
const recordingItemSource = {
    beginDrag(props) {
        return props;
    },

    endDrag(props, monitor, component) {
        if (monitor.didDrop()) {
            const { timelineOffsetSeconds, layerId } = monitor.getDropResult();

            if (layerId) {
                const { isPremium, adDuration } = props;
                const isOverlappingAd = !isPremium && timelineOffsetSeconds < adDuration;
                const offset = isOverlappingAd ? adDuration : timelineOffsetSeconds;
                component.props.addRecordingSnippet(monitor.getItem(), layerId, offset);
            }
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    };
}

export class RecordingListItem extends React.Component {
    state = {
        isRecordingEdited: false,
        editedRecording: null,
    };

    recordingNameEditOpen(e) {
        this.setState(state => ({ ...state, isRecordingEdited: true, editedRecording: this.props }));
    }

    recordingNameEditClose(token) {
        return e => {
            if (e.currentTarget.value && !(e.currentTarget.value === this.state.editedRecording.name)) {
                const editedRecording = { id: this.state.editedRecording.id, name: e.currentTarget.value };
                ApiRecording.updateRecording(token, editedRecording).then(() => this.props.fetch());
            }
            this.setState(state => ({ ...state, isRecordingEdited: false, editedRecording: null }));
        };
    }

    render() {
        const {
            name,
            duration,
            isPlaying,
            togglePlay,
            timeElapsed,
            connectDragSource,
            connectDragPreview,
        } = this.props;

        return (
            <div onDoubleClick={this.recordingNameEditOpen.bind(this)} style={{ display: 'flex' }}>
                {connectDragSource(
                    <div className={css(styles.accordionItem, styles.row, styles.recording, styles.draggable)}>
                        <span className={css(styles.redDot)} />
                        {this.state.isRecordingEdited ? (
                            <input autoFocus onBlur={this.recordingNameEditClose.bind(this)(this.props.token)} />
                        ) : (
                            <>
                                <span className={css(styles.blackText, styles.flex1)} title={name}>
                                    {truncateName(name)}
                                </span>
                                <span className={css(styles.blackText, styles.spaceAround)}>
                                    {isPlaying ? timeElapsed : getDuration(duration)}
                                </span>
                                {React.createElement(
                                    isPlaying ? PauseButton : PlayButton,
                                    { onClick: togglePlay, isSmall: true },
                                    null,
                                )}
                            </>
                        )}
                    </div>,
                )}
                {connectDragPreview(
                    <div
                        className={css(
                            styles.accordionItem,
                            styles.row,
                            styles.recording,
                            styles.draggable,
                            styles.previewElement,
                        )}
                    >
                        <span className={css(styles.redDot)} />
                        <span className={css(styles.blackText, styles.flex1)} title={name}>
                            {truncateName(name)}
                        </span>
                        <span className={css(styles.blackText, styles.spaceAround)}>
                            {isPlaying ? timeElapsed : getDuration(duration)}
                        </span>
                        {React.createElement(
                            isPlaying ? PauseButton : PlayButton,
                            { onClick: togglePlay, isSmall: true },
                            null,
                        )}
                    </div>,
                    {
                        offsetX: -50,
                        offsetY: -50,
                    },
                )}
            </div>
        );
    }
}

RecordingListItem.defaultProps = {
    duration: 0,
};

export default container(DragSource(TYPES.RECORDING, recordingItemSource, collect)(RecordingListItem));
