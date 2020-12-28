import React, { Component } from 'react';

import Modal from 'src/shared/components/old/common/Modal';
import FormMessages from 'src/shared/components/old/form/Messages';
import Input from 'src/shared/components/old/form/Input';
import TextArea from 'src/shared/components/old/form/TextArea';
import Dropdown from 'src/shared/components/old/form/Dropdown';
import ImagePicker from 'src/shared/components/old/form/ImagePicker';
import Button from 'src/shared/components/old/interactive/Button';
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator';
import ShowDetailsContainer from 'src/containers/Admin/Show/Details';
import { HOST } from 'src/config/settings';
import { css } from 'src/styles/old';
import { validatePresence } from 'src/shared/helpers/validate';

import Analytics from './Analytics';
import styles from '../styles';

class ShowDetails extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteShowClick = this.handleDeleteShowClick.bind(this);
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

    handleDeleteShowClick() {
        this.setState({
            isDeleteModalOpen: true,
        });
    }

    render() {
        const { isFetching, show, categories, handleSubmit, updateShow, deleteShow } = this.props;

        const categoryValues = [
            {
                text: '',
                value: '',
            },
        ];
        categoryValues.push(
            ...categories.map(category => ({
                text: category.name,
                value: category.id,
            })),
        );

        return (
            <form onSubmit={handleSubmit(updateShow)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>Show Details</h1>
                    </div>

                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="id" label="Show ID" isDisabled />
                            <Input name="title" label="Show Title" validate={validatePresence} />
                            <TextArea name="description" label="Show Description" rows={4} />

                            <Dropdown name="category1" label="Category 1" values={categoryValues} />
                            <Dropdown name="category2" label="Category 2" values={categoryValues} />
                            <Dropdown name="category3" label="Category 3" values={categoryValues} />

                            <Dropdown
                                name="adsEnabled"
                                label="Ads Enabled"
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
                            <Dropdown
                                name="explicit"
                                label="Explicit"
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
                            <Dropdown
                                name="promoted"
                                label="Promoted"
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
                            <Input name="itunesUrl" label="Apple Podcasts Link" />
                            {show.rssEnabled && (
                                <div>
                                    <div className={css(styles.label)}>RSS Link</div>
                                    <div className={css(styles.input)}>
                                        {HOST}/show/{show.id}/rss
                                    </div>
                                </div>
                            )}
                            {show.sourceUrl && (
                                <div>
                                    <div className={css(styles.label)}>Source URL</div>
                                    <div className={css(styles.input)}>{show.sourceUrl}</div>
                                </div>
                            )}
                        </div>
                        <div className={css(styles.inputColumn)}>
                            <ImagePicker
                                name="imageUrl"
                                label="Cover Art"
                                imageUrl={show.imageUrl}
                                imageDimensionText="1400x1400 recommended"
                                isOptional
                            />

                            <div className={css(styles.spacer)} />

                            <Analytics id={show.id} />
                        </div>
                    </div>
                </div>

                <div className={css(styles.formButtonContainer)}>
                    <Modal
                        isOpen={this.state.isDeleteModalOpen}
                        text="Delete Show?"
                        confirmText="Confirm Delete"
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            deleteShow();
                            this.handleModalClose();
                        }}
                        onCancel={this.handleModalClose}
                    />

                    <Button
                        type="red"
                        style={styles.formButton}
                        isDisabled={isFetching}
                        onClick={this.handleDeleteShowClick}
                    >
                        Delete Show
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
        );
    }
}

export default ShowDetailsContainer(ShowDetails);
