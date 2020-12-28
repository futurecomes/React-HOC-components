import React from 'react';
import Modal from 'react-modal';
import { Modal as AntdModal, notification, Row } from 'antd';

import Gear from 'src/public/img/icons/gear.svg';
import Button from 'src/shared/components/old/interactive/Button';
import Input from 'src/shared/components/old/form/Input';
import Dropdown from 'src/shared/components/old/form/Dropdown';
import Loading from 'src/shared/components/old/activity/EllipsesIndicator';
import closeSrc from 'src/shared/components/old/shared/static/svg/close.svg';
import container from 'src/containers/Shows/ShowSettings';
import { css, modalStyles } from 'src/styles/old';
import { validatePodcastLink } from 'src/shared/helpers/validatePodcastLink';
import { Button as StyledButton } from '../ButtonsList/style';
import styles from './styles';
import styled from 'react-emotion';

const ButtonsWrapper = styled(Row)({
    justifyContent: 'space-between',
});

const explicityDropdownValues = [
    { value: 'Not Explicit', text: 'Not Explicit' },
    { value: 'Explicit', text: 'Explicit' },
];

class ShowSettings extends React.Component {
    state = {
        isOpen: false,
    };

    toggleModal = () =>
        this.setState(state => ({
            isOpen: !state.isOpen,
        }));

    closeModal = () =>
        this.setState({
            isOpen: false,
        });

    handleOpenModal = () => {
        this.props.initializeSettings('showSettings', this.props.show);
        this.toggleModal();
    };

    showDeleteConfirmation = () => {
        const { closeModal, props, close } = this;

        AntdModal.confirm({
            title: 'Are you sure you want to delete this show?',
            onOk() {
                props.deleteShow(props.show.id, close);
                closeModal();
            },
            onCancel() {},
        });
    };

    validatePodcastLink = source => link => {
        const podcastValidationInfo = validatePodcastLink(link, source);

        // the redux-form input is valid with validate === undefined
        return podcastValidationInfo === true || undefined ? undefined : podcastValidationInfo;
    };

    handleSubmit = event => {
        notification['success']({
            message: 'Changes saved',
            description: 'Your episode settings have been updated!',
        });
        this.props.editShow(event);
    };

    componentDidUpdate = prevProps => {
        if (!prevProps.submitSucceeded && this.props.submitSucceeded) {
            this.closeModal();
        }
    };

    render() {
        const { languages, host, show, isFetching, handleSubmit } = this.props;

        return (
            <React.Fragment>
                <StyledButton image={Gear} onClick={this.handleOpenModal}>
                    Settings
                </StyledButton>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.close}
                    style={modalStyles}
                    contentLabel="show-settings"
                >
                    <div className={css(styles.modalPadding)}>
                        <div className={css(styles.spaceBetween, styles.row)}>
                            <h2 className={css(styles.title)}>Settings</h2>
                            <button onClick={this.toggleModal} className={css(styles.iconButton)}>
                                <img src={closeSrc} alt="" />
                            </button>
                        </div>
                        <p className={css(styles.p)}>{`
                  The additional stuff you might want to use or edit.
                `}</p>
                    </div>
                    <form onSubmit={handleSubmit(this.handleSubmit)} className={css(styles.form)}>
                        <div className={css(styles.container)}>
                            <label className={css(styles.label)}>
                                RSS Link
                                <span className={css(styles.grayText)}>
                                    &#0020; (So you can share your podcast’s feed elsewhere)
                                </span>
                            </label>
                            <div className={css(styles.input)}>
                                {window.location.origin}
                                {host}/show/{show.id}/rss
                            </div>
                        </div>
                        <Input
                            name="itunesUrl"
                            label="Apple Podcasts Link"
                            validate={this.validatePodcastLink('apple')}
                            placeholder="http://"
                        />
                        <Input
                            name="spotifyUrl"
                            label="Spotify Podcasts Link"
                            validate={this.validatePodcastLink('spotify')}
                            placeholder="http://"
                        />
                        <Input
                            name="googleUrl"
                            label="Google Podcasts Link"
                            validate={this.validatePodcastLink('google')}
                            placeholder="http://"
                        />
                        <Input
                            name="patreonUrl"
                            label="Patreon Link"
                            validate={this.validatePodcastLink('patreon')}
                            placeholder="http://"
                        />
                        <Dropdown name="language" label="Language" placeholder="Select Language" values={languages} />
                        <Dropdown
                            name="explicit"
                            label="Explicit?"
                            placeholder="No judgement, just gotta know"
                            values={explicityDropdownValues}
                        />
                        {show.protected && <Input name="newPassword" label="New Password" placeholder="*****" />}
                        {this.props.isEmbedPodcastActive && (
                            <div className={css(styles.container)}>
                                <label className={css(styles.label)}>Embed Podcast</label>
                                <div className={css(styles.input)}>
                                    {`<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="${
                                        window.location.origin
                                    }/player?show=${show.id}"></iframe>`}
                                </div>
                            </div>
                        )}
                        <ButtonsWrapper type="flex" justify="space-between">
                            <Button
                                type="red"
                                style={styles.submit}
                                isDisabled={isFetching}
                                onClick={this.showDeleteConfirmation}
                            >
                                Delete
                            </Button>
                            <Button type="blue" isSubmit style={styles.submit}>
                                {isFetching ? (
                                    <span>
                                        Updating
                                        <Loading />
                                    </span>
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </ButtonsWrapper>
                    </form>
                </Modal>
            </React.Fragment>
        );
    }
}

export default container(ShowSettings);
