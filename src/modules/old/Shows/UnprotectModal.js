import React from 'react'
import Modal from 'react-responsive-modal'

import Button from 'src/shared/components/old/interactive/Button'

import { css } from 'src/styles/old'

import styles from './styles'

export class UnprotectModal extends React.Component {
    render() {
        return (
            <Modal
                styles={{ modal: { margin: '0 auto' } }}
                open={this.props.open}
                onClose={this.props.onClose}
                animationDuration={200}
            >
                <div className={css(styles.modalWrapper)}>
                    <div className={css(styles.modalBody)}>
                        <p>Are you sure you want to make the show public?</p>
                        <Button
                            type="blue"
                            className={css(styles.submitButton, styles.centerButton)}
                            onClick={this.props.onSubmit(this.props.modalShowID)}
                        >
                            YES
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}
