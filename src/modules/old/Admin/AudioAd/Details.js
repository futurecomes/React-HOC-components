import React, { Component } from 'react';

import Modal from 'src/shared/components/old/common/Modal';
import FormMessages from 'src/shared/components/old/form/Messages';
import Input from 'src/shared/components/old/form/Input';
import TextArea from 'src/shared/components/old/form/TextArea';
import FileUpload from 'src/shared/components/old/form/FileUpload';
import Button from 'src/shared/components/old/interactive/Button';
import { PlayPreview } from 'src/modules/Audio/containers/PlayPreview';
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator';
import AudioAdDetailsContainer from 'src/containers/Admin/AudioAd/Details';
import { css } from 'src/styles/old';
import { formatDatetime, formatNumeric } from 'src/shared/helpers/formatInput';
import { validatePresence, validateFrequency } from 'src/shared/helpers/validate';

import styles from '../styles';

class AudioAdDetails extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteAdClick = this.handleDeleteAdClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

        this.state = {
            isDeleteModalOpen: false,
        };
    }

    handleModalClose() {
        this.setState({
            isDeleteModalOpen: false,
        });
    }

    handleDeleteAdClick() {
        this.setState({
            isDeleteModalOpen: true,
        });
    }

    render() {
        const { isFetching, ad, handleSubmit, updateAd, enableAd, disableAd, deleteAd } = this.props;

        const AdStatusStyle = ad.enabled ? styles.activeStatus : styles.archivedStatus;

        return (
            <form onSubmit={handleSubmit(updateAd)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>Audio Ad Details</h1>
                        <span className={css(styles.detailTitle, styles.detailHeaderRight)}>
                            Status:
                            <span className={css(AdStatusStyle)}>{ad.enabled ? 'Enabled' : 'Disabled'}</span>
                        </span>
                    </div>
                    {ad.url && <PlayPreview url={ad.url} />}
                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="id" label="A-Ad ID" isDisabled />
                            <Input name="name" label="Ad Title" validate={validatePresence} />
                            <FileUpload name="audioFile" label="Audio File" />

                            {/* <Dropdown
                name="position"
                label="Position"
                values={[{
                  text: 'Pre',
                  value: 'pre',
                }, {
                  text: 'Mid',
                  value: 'mid',
                }]}
                validate={validatePresence}
              /> */}
                            <Input
                                name="frequency"
                                label="Frequency"
                                format={formatNumeric}
                                validate={validateFrequency}
                            />
                            {/* <Input
                name="lastActive"
                label="Last Active"
                isDisabled
              /> */}
                            <Input name="createdAt" label="Created" format={formatDatetime} isDisabled />
                            <TextArea name="notes" label="Admin Notes" rows={4} isOptional />
                        </div>
                        <div className={css(styles.inputColumn)} />
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
                            deleteAd();
                            this.handleModalClose();
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
        );
    }
}

export default AudioAdDetailsContainer(AudioAdDetails);
