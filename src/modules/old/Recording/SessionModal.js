import React from 'react'
import Modal from 'react-responsive-modal'

import Button from 'src/shared/components/old/interactive/Button'
import { css } from 'src/styles/old'

import { Field } from './Field'
import styles from './styles'

export class SessionModal extends React.PureComponent {
    onSubmit = () => {
        const { sessionName, takeName } = this.props
        const isError = !sessionName || !takeName
        if (isError) {
            this.props.setErrors()
            return
        }
        this.props.onClose()
        this.props.openSession(null, sessionName)
        this.props.setRecordingName(takeName)
    }

    render() {
        return (
            <Modal
                styles={{ modal: { margin: '0 auto' } }}
                open={this.props.isModalOpen}
                onClose={this.props.onClose}
                animationDuration={200}
            >
                <div className={css(styles.modalWrapper)}>
                    <h2 className={css(styles.heading)}>You are almost on-air!</h2>
                    <div className={css(styles.modalBody)}>
                        <Field
                            name="sessionName"
                            placeholder=""
                            labels={[
                                'First, name your session.',
                                'Session names are usually the segment or episode name.',
                            ]}
                            onChange={this.props.onChange}
                            value={this.props.sessionName}
                            isError={this.props.errors.sessionName}
                        />
                        <Field
                            name="takeName"
                            placeholder=""
                            labels={[
                                'Now, name your take.',
                                `Takes are usually numbered starting with 1. All of your Takes will be
                            grouped in above Session folder.`,
                                `Your listeners won't see either your
                            Session name or Take name - naming them is an internal filing system
                            for you.`,
                            ]}
                            onChange={this.props.onChange}
                            value={this.props.takeName}
                            isError={this.props.errors.takeName}
                        />
                    </div>
                    <Button type="blue" className={css(styles.submitButton)} onClick={this.onSubmit}>
                        Next
                    </Button>
                </div>
            </Modal>
        )
    }
}
