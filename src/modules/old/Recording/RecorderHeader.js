import React from 'react'
import { Input } from 'antd'
import styled from 'react-emotion'

import { css } from 'src/styles/old'

import RecordButton from './RecordButton'
import { RecordingModal } from './RecordingModal'
import styles from './styles'

const StyledInput = styled(Input)({
    borderRadius: 0,
    marginBottom: '0.5rem',
})

export class RecorderHeader extends React.PureComponent {
    state = {
        isModalOpen: false,
        error: '',
    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    onClose = () => {
        this.setState({ isModalOpen: false, error: '' })
        this.props.setRecordingName('')
    }

    onChange = e => {
        this.props.setRecordingName(e.target.value)
    }

    onSubmit = () => {
        if (this.props.recordingName) {
            this.setState({ isModalOpen: false })
            this.props.startRecording()
        } else {
            this.setState({ error: 'This field cannot be empty' })
        }
    }

    onRecord = () => {
        if (!this.props.recordingName) {
            this.openModal()
        } else {
            this.props.startRecording()
        }
    }

    handleNameChange = event => this.props.onNameChange(event.target.value)

    render() {
        const { form, session, onNameBlur, isSaving, stopRecording, isRecording, isLoading } = this.props
        return (
            <div className={css(styles.headerWrapper)}>
                <RecordingModal
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    onClose={this.onClose}
                    recordingName={this.props.recordingName}
                    error={this.state.error}
                    isModalOpen={this.state.isModalOpen}
                />
                {this.props.error && <span className={css(styles.errorMessage)}>{this.props.error}</span>}
                <div className={css(styles.sessionHeader)}>
                    <div className={css(styles.sessionLeft)}>
                        <div className={css(styles.sessionTitleWrapper)}>
                            <StyledInput
                                onChange={this.handleNameChange}
                                onBlur={onNameBlur}
                                value={form.name || session.name || ''}
                                placeholder="Name This Session"
                            />
                            {isRecording && <div className={css(styles.recordingCircle)} />}
                        </div>
                        <span className={css(styles.info)}>
                            Don't worry about being tongue tied, you can always edit later.
                        </span>
                    </div>

                    <div>
                        <RecordButton
                            disabled={isSaving || isLoading || this.props.timeCounter !== null}
                            isRecording={isRecording}
                            onClick={isRecording ? stopRecording : this.onRecord}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
