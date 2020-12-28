import React, { Component } from 'react';

import Modal from 'src/shared/components/old/common/Modal';
import FormMessages from 'src/shared/components/old/form/Messages';
import Input from 'src/shared/components/old/form/Input';
import TextArea from 'src/shared/components/old/form/TextArea';
import FileUpload from 'src/shared/components/old/form/FileUpload';
import Button from 'src/shared/components/old/interactive/Button';
import { PlayPreview } from 'src/modules/Audio/containers/PlayPreview';
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator';
import Container from 'src/containers/Admin/FreeMusic/Details';
import { css } from 'src/styles/old';
import { formatDatetime } from 'src/shared/helpers/formatInput';
import { validatePresence } from 'src/shared/helpers/validate';

import styles from '../styles';

class FreeMusicDetails extends Component {
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
        const { isFetching, freeMusic, handleSubmit, updateMusic, enableMusic, disableMusic, deleteMusic } = this.props;

        const MusicStatusStyle = freeMusic.active ? styles.activeStatus : styles.archivedStatus;

        return (
            <form onSubmit={handleSubmit(updateMusic)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>Free Music Details</h1>
                        <span className={css(styles.detailTitle, styles.detailHeaderRight)}>
                            Status:
                            <span className={css(MusicStatusStyle)}>{freeMusic.active ? 'Enabled' : 'Disabled'}</span>
                        </span>
                    </div>
                    {freeMusic.url && <PlayPreview url={freeMusic.url} />}
                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="id" label="FM ID" isDisabled />
                            <Input name="name" label="Free Music Title" validate={validatePresence} />
                            <FileUpload name="audioFile" label="Audio File" />
                            <Input name="createdAt" label="Created" format={formatDatetime} isDisabled />
                            <TextArea name="notes" label="Admin Notes" rows={4} isOptional />
                        </div>
                        <div className={css(styles.inputColumn)} />
                    </div>
                </div>

                <div className={css(styles.formButtonContainer)}>
                    <Modal
                        isOpen={this.state.isDeleteModalOpen}
                        text="Delete Free Music?"
                        confirmText="Confirm Delete"
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            deleteMusic();
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
                        Delete Free Music
                    </Button>

                    {freeMusic.active ? (
                        <Button type="orange" style={styles.formButton} onClick={disableMusic}>
                            Disable Free Music
                        </Button>
                    ) : (
                        <Button type="green" style={styles.formButton} onClick={enableMusic}>
                            Enable Free Music
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

export default Container(FreeMusicDetails);
