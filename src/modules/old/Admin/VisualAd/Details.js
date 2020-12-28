import React, { Component } from 'react'

import Modal from 'src/shared/components/old/common/Modal'
import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import TextArea from 'src/shared/components/old/form/TextArea'
import CheckBox from 'src/shared/components/old/form/CheckBox'
import GroupLabel from 'src/shared/components/old/form/GroupLabel'
import ImagePicker from 'src/shared/components/old/form/ImagePicker'
import Button from 'src/shared/components/old/interactive/Button'
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import VisualAdDetailsContainer from 'src/containers/Admin/VisualAd/Details'
import { css } from 'src/styles/old'
import { formatDatetime, formatNumeric } from 'src/shared/helpers/formatInput'
import { validatePresence, validateFrequency, validateImageFile } from 'src/shared/helpers/validate'

import styles from '../styles'

class VisualAdDetails extends Component {
    constructor(props) {
        super(props)

        this.handleDeleteAdClick = this.handleDeleteAdClick.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)

        this.state = {
            isDeleteModalOpen: false,
        }
    }

    handleModalClose() {
        this.setState({
            isDeleteModalOpen: false,
        })
    }

    handleDeleteAdClick() {
        this.setState({
            isDeleteModalOpen: true,
        })
    }

    render() {
        const { isFetching, ad, pages, handleSubmit, updateAd, enableAd, disableAd, deleteAd } = this.props

        const AdStatusStyle = ad.enabled ? styles.activeStatus : styles.archivedStatus

        return (
            <form onSubmit={handleSubmit(updateAd)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>Visual Ad Details</h1>
                        <span className={css(styles.detailTitle, styles.detailHeaderRight)}>
                            Status:
                            <span className={css(AdStatusStyle)}>{ad.enabled ? 'Enabled' : 'Disabled'}</span>
                        </span>
                    </div>

                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="id" label="V-Ad ID" isDisabled />
                            <Input name="name" label="Ad Title" validate={validatePresence} />
                            <Input name="url" label="Outbound URL" validate={validatePresence} />
                            <Input
                                name="frequency"
                                label="Frequency"
                                format={formatNumeric}
                                validate={validateFrequency}
                            />
                            <Input name="lastActive" label="Last Active" format={formatDatetime} isDisabled />
                            <Input name="createdAt" label="Created" format={formatDatetime} isDisabled />
                            <TextArea name="notes" label="Admin Notes" rows={4} isOptional />
                        </div>
                        <div className={css(styles.inputColumn)}>
                            <GroupLabel text="Show Advertisement On" />
                            {pages.map(page => (
                                <CheckBox
                                    name={`pages-${page.id}`}
                                    key={`${page.name}-key`}
                                    label={page.name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={css(styles.adImageContainer)}>
                        <ImagePicker
                            name="imageLeaderboard"
                            label="Leaderboard"
                            isOptional
                            style={styles.imageLeaderboard}
                            imageDimensionText="728x90 min | 1456x180 recommended"
                            validate={validateImageFile(728, 90)}
                            imageUrl={ad.imageLeaderboard || ''}
                        />
                        <ImagePicker
                            name="imageHalfPage"
                            label="Half Page"
                            style={styles.imageHalfPage}
                            isOptional
                            imageDimensionText="160x600 min | 320x1200 recommended"
                            validate={validateImageFile(160, 600)}
                            imageUrl={ad.imageHalfPage || ''}
                        />
                        <ImagePicker
                            name="imageMobile"
                            label="Mobile"
                            style={styles.imageMobile}
                            isOptional
                            imageDimensionText="320x100 min | 640x200 recommended"
                            validate={validateImageFile(320, 100)}
                            imageUrl={ad.imageMobile || ''}
                        />
                    </div>
                </div>

                <div className={css(styles.formButtonContainer)}>
                    <Modal
                        isOpen={this.state.isDeleteModalOpen}
                        text="Delete Audio Ad?"
                        confirmText="Confirm Delete"
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            deleteAd()
                            this.handleModalClose()
                        }}
                        onCancel={this.handleModalClose}
                    />

                    <Button
                        type="red"
                        style={styles.formButton}
                        isDisabled={isFetching}
                        onClick={this.handleDeleteAdClick}
                    >
                        Delete Ad
                    </Button>

                    {ad.enabled ? (
                        <Button type="orange" style={styles.formButton} onClick={disableAd}>
                            Disable Ad
                        </Button>
                    ) : (
                        <Button type="green" style={styles.formButton} onClick={enableAd}>
                            Enable Ad
                        </Button>
                    )}

                    <Button isSubmit type="blue" style={styles.formButton} isDisabled={isFetching}>
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
        )
    }
}

export default VisualAdDetailsContainer(VisualAdDetails)
