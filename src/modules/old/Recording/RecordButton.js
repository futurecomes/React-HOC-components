import React, { Component } from 'react'

import OnHoverButton from 'src/shared/components/old/interactive/OnHoverButton'
import { css } from 'src/styles/old'

import styles from './styles'

class RecordButton extends Component {
    state = {
        isHover: false,
    }

    handleHover = isHover => {
        this.setState({ isHover })
    }

    getButtonText = () => {
        const { isRecording } = this.props
        const { isHover } = this.state
        if (isRecording && !isHover) {
            return 'On Air'
        } else if (isRecording && isHover) {
            return 'Stop'
        } else if (!isRecording && isHover) {
            return 'Record'
        } else {
            return 'Record'
        }
    }

    render() {
        const { isRecording, disabled } = this.props
        const { isHover } = this.state

        return (
            <OnHoverButton
                className={css(
                    styles.recordButton,
                    !isRecording && isHover && styles.recordHover,
                    isRecording && styles.stopRecord,
                    isRecording && isHover && styles.stopRecordHover,
                )}
                onClick={this.props.onClick}
                onHover={this.handleHover}
                disabled={disabled}
            >
                <span
                    className={css(
                        styles.circle,
                        !isRecording && isHover && styles.circleHover,
                        isRecording && styles.square,
                        isRecording && isHover && styles.squareHover,
                    )}
                />
                {this.getButtonText()}
            </OnHoverButton>
        )
    }
}

RecordButton.defaultProps = {
    disabled: false,
}

export default RecordButton
