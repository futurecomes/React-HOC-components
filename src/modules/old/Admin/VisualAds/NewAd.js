import React, { Component } from 'react'
import ReactModal from 'react-modal'

import NewAdContainer from 'src/containers/Admin/VisualAds/NewAd'
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import TextArea from 'src/shared/components/old/form/TextArea'
import GroupLabel from 'src/shared/components/old/form/GroupLabel'
import CheckBox from 'src/shared/components/old/form/CheckBox'
import ImagePicker from 'src/shared/components/old/form/ImagePicker'
import Button from 'src/shared/components/old/interactive/Button'
import closeSrc from 'src/shared/components/old/common/Modal/static/svg/close.svg'
import commonModalStyles, { modalStyles } from 'src/shared/components/old/common/Modal/styles'
import { css } from 'src/styles/old'
import { formatBoolean, formatNumeric } from 'src/shared/helpers/formatInput'
import { validatePresence, validateFrequency, validateImageFile } from 'src/shared/helpers/validate'

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
        const { pages, handleSubmit, createAd, isFetching } = this.props

        return (
            <div className={css(styles.container)}>
                <Button type="purple" style={styles.newItemButton} onClick={this.handleModalOpen}>
                    New Ad
                </Button>

                <ReactModal
                    isOpen={this.state.isModalOpen}
                    style={{ ...modalStyles, content: { ...modalStyles.content, width: 750 } }}
                    contentLabel="New Ad"
                >
                    <button onClick={this.handleModalClose} className={css(commonModalStyles.close)}>
                        <img src={closeSrc} alt="Close Modal" />
                    </button>
                    <span className={css(commonModalStyles.title)}>New Ad</span>
                    <form className={css(styles.newAdForm)} onSubmit={handleSubmit(createAd)}>
                        <FormMessages />

                        <Input name="name" label="Ad Title" validate={validatePresence} />
                        <Input name="url" label="Outbound URL" validate={validatePresence} />
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

                        <GroupLabel text="Show Advertisement On" />
                        {pages.map(page => (
                            <CheckBox name={`pages-${page.id}`} key={`${page.name}-key`} label={page.name} />
                        ))}

                        <div className={css(styles.newAdImageContainer)}>
                            <ImagePicker
                                name="imageLeaderboard"
                                label="Leaderboard"
                                style={styles.imageLeaderboard}
                                imageDimensionText="728x90 min | 1456x180 recommended"
                                validate={validateImageFile(728, 90, 0, 0, true)}
                            />
                            <ImagePicker
                                name="imageHalfPage"
                                label="Half Page"
                                style={styles.imageHalfPage}
                                imageDimensionText="160x600 min | 320x1200 recommended"
                                validate={validateImageFile(160, 600, 0, 0, true)}
                            />
                            <ImagePicker
                                name="imageMobile"
                                label="Mobile"
                                style={styles.imageMobile}
                                imageDimensionText="320x100 min | 640x200 recommended"
                                validate={validateImageFile(320, 100, 0, 0, true)}
                            />
                        </div>

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
