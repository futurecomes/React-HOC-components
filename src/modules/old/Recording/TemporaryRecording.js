import React from 'react'
import Spinner from 'react-svg-spinner'

import { formatTimeElapsed } from 'src/shared/helpers/time'

import trashLightSrc from './static/svg/trash-light.svg'
import { css } from 'src/styles/old'
import styles from './styles'
import { isMediaRecorderAvailable } from './epics/mediaRecorder'

export class TemporaryRecording extends React.Component {
    render() {
        const { isSaving, recording } = this.props
        return (
            <div className={css(styles.sessionRow, styles.rowFont)}>
                <div className={css(styles.flexContainer)}>
                    <div className={css(styles.circle)} />
                    <div className={css(styles.info, styles.flex3)}>{recording.name}</div>
                </div>
                {isSaving &&
                    (!isMediaRecorderAvailable ? (
                        <div className={css(styles.progressWrapper)}>
                            <span className={css(styles.progressText)}>Saving {recording.progress}%</span>

                            <progress
                                value={recording.progress}
                                max="100"
                                className={css(styles.progressBar)}
                            />
                        </div>
                    ) : (
                        <Spinner size="32px" speed="fast" />
                    ))}
                <div className={css(styles.flexContainer)}>
                    <div className={css(styles.timer, styles.coral)}>
                        {formatTimeElapsed(recording.startedAt, recording.stoppedAt)}
                    </div>
                    <button className={css(styles.trash, styles.disabledIcon)}>
                        <img src={trashLightSrc} alt={`Delete ${recording.name}`} />
                    </button>
                </div>
            </div>
        )
    }
}
