import React from 'react'

import PlayButton from 'src/shared/components/old/interactive/PlayButton'
import PauseButton from 'src/shared/components/old/interactive/PauseButton'
import container from 'src/containers/Recording/Single'
import { css } from 'src/styles/old'
import { formatTime } from 'src/shared/helpers/time'

import trashSrc from './static/svg/trash.svg'
import styles from './styles'

class RecordingListItem extends React.PureComponent {
    render() {
        const {
            name,
            duration,
            isPlaying,
            togglePlay,
            deleteRecording,
            updateRecording,
            onNameChange,
        } = this.props
        return (
            <div className={css(styles.sessionRow, styles.rowFont)}>
                {React.createElement(
                    isPlaying ? PauseButton : PlayButton,
                    { onClick: togglePlay, isSmall: true },
                    null,
                )}
                <input
                    className={css(styles.recordingName, styles.flex3, styles.named)}
                    onChange={onNameChange}
                    onBlur={updateRecording}
                    value={name}
                />
                <div className={css(styles.timer)}>{formatTime(duration)}</div>
                <button onClick={deleteRecording} className={css(styles.trash)}>
                    <img src={trashSrc} alt={`Delete ${name}`} />
                </button>
            </div>
        )
    }
}

RecordingListItem.defaultProps = {
    updatedAt: 0,
}

export default container(RecordingListItem)
