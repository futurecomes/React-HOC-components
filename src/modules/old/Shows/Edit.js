import React, { Component } from 'react';
import Modal from 'react-modal';

import container from 'src/containers/CreateShow';
import { modalStyles } from 'src/styles/old';

import { ShowArtCreator } from 'src/modules/old/artCreator';
import { EditShow } from './EditShow';
import { ShowControl } from './ShowControl';

/* eslint-disable */
class Edit extends Component {
    state = {
        display: 'editShow',
    };

    open = () => {
        const showWithCategories = {
            ...this.props.show,
            category1: this.props.show.categories[0],
            category2: this.props.show.categories[1],
            category3: this.props.show.categories[2],
        };
        this.props.initializeEdit('createShow', showWithCategories, false);
        this.props.toggle({ type: 'edit', id: showWithCategories.id });
    };

    goTo = to => {
        this.setState({ display: to });
    };

    onRequestClose = () =>
        this.props.isColorPickerOpen ? this.props.closeColorPickers() : this.props.toggle({ type: 'edit' });

    render() {
        const { handleSubmit, categories, isFetching, editShow, show, isOpen, modalType } = this.props;
        const { display } = this.state;

        return (
            <React.Fragment>
                <ShowControl onClick={this.open} text="Edit Show" icon="edit" />
                <Modal
                    isOpen={isOpen && modalType === 'edit' && this.props.editedShowId === show.id}
                    onRequestClose={this.onRequestClose}
                    style={modalStyles}
                    contentLabel="create-show"
                >
                    {display === 'editShow' && (
                        <EditShow
                            categories={categories}
                            handleSubmit={handleSubmit}
                            editShow={editShow}
                            isFetching={isFetching}
                            show={show}
                            goTo={this.goTo}
                            close={this.props.toggle}
                        />
                    )}
                    {display === 'createArt' && <ShowArtCreator goBack={() => this.goTo('editShow')} />}
                </Modal>
            </React.Fragment>
        );
    }
}

Edit.defaultProps = {
    buttonText: 'Create Show',
    buttonStyle: null,
};

export default container(Edit);
