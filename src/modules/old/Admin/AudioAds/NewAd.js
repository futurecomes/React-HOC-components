import React, { Component } from 'react'
import ReactModal from 'react-modal'

import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import closeSrc from 'src/shared/components/old/common/Modal/static/svg/close.svg'
import commonModalStyles, { modalStyles } from 'src/shared/components/old/common/Modal/styles'
import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import TextArea from 'src/shared/components/old/form/TextArea'
import FileUpload from 'src/shared/components/old/form/FileUpload'
import Button from 'src/shared/components/old/interactive/Button'
import NewAdContainer from 'src/containers/Admin/AudioAds/NewAd'
import { css } from 'src/styles/old'
import { formatBoolean, formatNumeric } from 'src/shared/helpers/formatInput'
import { validatePresence, validateFrequency } from 'src/shared/helpers/validate'

import styles from '../styles'

class NewAd extends Component {
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
            this.setState({
                isModalOpen: false,
            })
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
    }

    render() {
        const { handleSubmit, createAd, isFetching } = this.props

        return (
            <div className={css(styles.container)}>
                <Button type="purple" style={styles.newItemButton} onClick={this.handleModalOpen}>
                    New Ad
                </Button>

                <ReactModal isOpen={this.state.isModalOpen} style={modalStyles} contentLabel="New Ad">
                    <button onClick={this.handleModalClose} className={css(commonModalStyles.close)}>
                        <img src={closeSrc} alt="Close Modal" />
                    </button>
                    <span className={css(commonModalStyles.title)}>New Ad</span>
                    <form className={css(styles.newAdForm)} onSubmit={handleSubmit(createAd)}>
                        <FormMessages />

                        <Input name="name" label="Ad Title" validate={validatePresence} />
                        <FileUpload name="audioFile" label="Audio File" />
                        <Dropdown
                            name="enabled"
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
                        <Input
                            name="frequency"
                            label="Frequency"
                            format={formatNumeric}
                            validate={validateFrequency}
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

export default NewAdContainer(NewAd)
