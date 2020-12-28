import React, { Component } from 'react'
import ReactModal from 'react-modal'

import Container from 'src/containers/Admin/FreeMusics/NewMusic'
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import FileUpload from 'src/shared/components/old/form/FileUpload'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import TextArea from 'src/shared/components/old/form/TextArea'
import Button from 'src/shared/components/old/interactive/Button'
import closeSrc from 'src/shared/components/old/common/Modal/static/svg/close.svg'
import commonModalStyles, { modalStyles } from 'src/shared/components/old/common/Modal/styles'
import { css } from 'src/styles/old'
import { formatBoolean } from 'src/shared/helpers/formatInput'
import { validatePresence } from 'src/shared/helpers/validate'

import styles from '../styles'

class NewMusic extends Component {
    constructor(props) {
        super(props)

        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)

        this.state = {
            isModalOpen: false,
        }
    }

    componentWillReceiveProps(props) {
        if (props.isSuccessful) {
            this.handleModalClose()
        }
    }

    handleModalOpen() {
        this.setState({
            isModalOpen: true,
        })
    }

    handleModalClose() {
        this.setState({
            isModalOpen: false,
        })
        // reset the form
        this.props.reset()
    }

    render() {
        const { handleSubmit, createMusic, isFetching } = this.props

        return (
            <div className={css(styles.container)}>
                <Button type="purple" style={styles.newItemButton} onClick={this.handleModalOpen}>
                    New Free Music
                </Button>

                <ReactModal isOpen={this.state.isModalOpen} style={modalStyles} contentLabel="New Free Music">
                    <button onClick={this.handleModalClose} className={css(commonModalStyles.close)}>
                        <img src={closeSrc} alt="Close Modal" />
                    </button>
                    <span className={css(commonModalStyles.title)}>New Free Music</span>
                    <form className={css(styles.newAdForm)} onSubmit={handleSubmit(createMusic)}>
                        <FormMessages />

                        <Input name="name" label="Free Music Title" validate={validatePresence} />
                        <FileUpload name="audioFile" label="Audio File" />
                        <Dropdown
                            name="active"
                            label="Active"
                            format={formatBoolean}
                            values={[
                                {
                                    text: 'Yes',
                                    value: true,
                                },
                                {
                                    text: 'No',
                                    value: false,
                                },
                            ]}
                            validate={validatePresence}
                        />
                        <TextArea name="notes" label="Admin Notes" rows={4} isOptional />

                        <div className={css(styles.formButtonContainer)}>
                            <Button isSubmit type="blue">
                                {isFetching ? (
                                    <span>
                                        {'Saving'}
                                        <EllipsesIndicator />
                                    </span>
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </div>
                    </form>
                </ReactModal>
            </div>
        )
    }
}

export default Container(NewMusic)
