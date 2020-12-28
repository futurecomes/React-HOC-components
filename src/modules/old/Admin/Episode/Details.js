import React, { Component } from 'react'

import Modal from 'src/shared/components/old/common/Modal'
import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import TextArea from 'src/shared/components/old/form/TextArea'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import Button from 'src/shared/components/old/interactive/Button'
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import EpisodeDetailsContainer from 'src/containers/Admin/Episode/Details'
import { formatBoolean, formatDatetime } from 'src/shared/helpers/formatInput'
import { validatePresence } from 'src/shared/helpers/validate'
import { css } from 'src/styles/old'

import AudioAds from './AudioAds'
import Analytics from './Analytics'
import styles from '../styles'

class EpisodeDetails extends Component {
    constructor(props) {
        super(props)

        this.handleDeleteEpisodeClick = this.handleDeleteEpisodeClick.bind(this)
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

    handleDeleteEpisodeClick() {
        this.setState({
            isDeleteModalOpen: true,
        })
    }

    render() {
        const { isFetching, episodeId, handleSubmit, updateEpisode, deleteEpisode } = this.props

        return (
            <form onSubmit={handleSubmit(updateEpisode)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>Episode Details</h1>
                    </div>

                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="position" label="Episode Number" isDisabled />
                            <Input name="title" label="Episode Title" validate={validatePresence} />
                            <TextArea name="description" label="Episode Description" rows={4} />
                            <Dropdown
                                name="released"
                                label="Release Status"
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
                            />
                            <Input
                                name="releasedAt"
                                label="Release Date"
                                format={formatDatetime}
                                isDisabled
                            />
                            <Input name="createdAt" label="Create Date" format={formatDatetime} isDisabled />
                            <Input name="duration" label="Length" isDisabled />
                            <Dropdown
                                name="adsEnabled"
                                label="Ads Enabled (tied to show)"
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
                            />
                        </div>
                        <div className={css(styles.inputColumn)}>
                            <AudioAds episodeId={episodeId} />

                            <div className={css(styles.spacer)} />

                            <Analytics />
                        </div>
                    </div>
                </div>

                <div className={css(styles.formButtonContainer)}>
                    <Modal
                        isOpen={this.state.isDeleteModalOpen}
                        text="Delete Episode?"
                        confirmText="Confirm Delete"
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            deleteEpisode()
                            this.handleModalClose()
                        }}
                        onCancel={this.handleModalClose}
                    />

                    <Button
                        type="red"
                        style={styles.formButton}
                        isDisabled={isFetching}
                        onClick={this.handleDeleteEpisodeClick}
                    >
                        Delete Episode
                    </Button>

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

export default EpisodeDetailsContainer(EpisodeDetails)
