import React, { Component } from 'react';
import Warning from 'react-responsive-modal';
import Modal from 'react-modal';

import { ShowArtCreator } from 'src/modules/old/artCreator';
import Button from 'src/shared/components/old/interactive/Button';
import { Headline } from 'src/shared/components/old/shared/Headline';
import container from 'src/containers/CreateShow';
import { modalStyles } from 'src/styles/old';

import { CreateShowModal } from './CreateShowModal';
import * as S from './styled';

class CreateShow extends Component {
    state = {
        display: 'createShow',
    };

    open = () => {
        const { initializeEdit } = this.props;
        initializeEdit('createShow', {}, false);
        this.props.toggle({ type: 'create' });
    };

    goTo = to => {
        this.setState({ display: to });
    };

    openArtCreator = () => {
        this.goTo('createArt');
        this.props.hideWarning();
    };

    onRequestClose = () =>
        this.props.isColorPickerOpen ? this.props.closeColorPickers() : this.props.toggle({ type: 'create' });

    render() {
        const {
            isOpen,
            buttonText,
            buttonStyle,
            handleSubmit,
            createShow,
            categories,
            isFetching,
            modalType,
        } = this.props;

        return (
            <div>
                <Button test="createShow" type="blue" onClick={this.open} style={buttonStyle}>
                    {buttonText}
                </Button>

                <Warning
                    open={this.props.displayWarning}
                    onClose={this.props.hideWarning}
                    center
                    styles={{ modal: { width: 500, padding: 40 } }}
                >
                    <div>
                        <Headline size={3}>Whoops!</Headline>
                        It looks like {`you're`} trying to publish a podcast without show art. Show art helps your
                        podcast look professional and polished, which can attract more listeners. Create your own custom
                        show art easily in our{' '}
                        <S.ArtCreatorLink onClick={this.openArtCreator}>show art creator</S.ArtCreatorLink>.
                    </div>
                    <S.WarningButton>
                        <Button type="blue" onClick={handleSubmit(this.props.createShowWithoutArt)}>
                            I will add it later on!
                        </Button>
                    </S.WarningButton>
                </Warning>

                <Modal
                    isOpen={isOpen && modalType === 'create'}
                    onRequestClose={this.onRequestClose}
                    style={modalStyles}
                    contentLabel="create-show"
                >
                    {this.state.display === 'createShow' && (
                        <CreateShowModal
                            handleSubmit={handleSubmit(createShow)}
                            categories={categories}
                            isFetching={isFetching}
                            close={this.props.toggle}
                            goTo={this.goTo}
                        />
                    )}

                    {this.state.display === 'createArt' && <ShowArtCreator goBack={() => this.goTo('createShow')} />}
                </Modal>
            </div>
        );
    }
}

CreateShow.defaultProps = {
    buttonText: 'Create Show',
    buttonStyle: null,
};

export default container(CreateShow);
