import React from 'react'
import Modal from 'react-responsive-modal'

import Button from 'src/shared/components/old/interactive/Button'
import { css } from 'src/styles/old'

import { Field } from './Field'
import styles from './styles'

export class RecordingModal extends React.Component {
    render() {
        return (
            <Modal
                styles={{ modal: { margin: '0 auto' } }}
                open={this.props.isModalOpen}
                onClose={this.props.onClose}
                animationDuration={200}
            >
                <div className={css(styles.modalWrapper)} style={{ minHeight: 170 }}>
                    <div className={css(styles.modalBody)} style={{ width: '100%' }}>
                        <Field
                            name="takeName"
                            placeholder=""
                            labels={['Name your take']}
                            onChange={this.props.onChange}
                            value={this.props.recordingName}
                            isError={this.props.error}
                        />
                        <Button
                            type="blue"
                            className={css(styles.submitButton, styles.centerButton)}
                            onClick={this.props.onSubmit}
                        >
                            Record
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}
