import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, initialize } from 'redux-form';

import { toggleModal, editShow, hideShowArtWarning } from 'src/actions/old/shows';
import { closeColorPickers } from 'src/modules/old/artCreator/actions/actions';

import { createShow, createShowWithoutArt } from 'src/modules/old/Shows/actions';
import { routes } from 'src/config/settings';
import { validateImageFile } from 'src/shared/helpers/validate';

function mapStateToProps({
    shows: { isModalOpen, isFetching, displayWarning, modalType, editedShowId },
    form: { createShow: createForm },
    podcasts: { categories },
    artCreator,
}) {
    const selectedCategories = {};
    if (createForm && createForm.values) {
        if (typeof createForm.values.category1 !== 'undefined') {
            selectedCategories[createForm.values.category1] = true;
        }
        if (typeof createForm.values.category2 !== 'undefined') {
            selectedCategories[createForm.values.category2] = true;
        }
        if (typeof createForm.values.category3 !== 'undefined') {
            selectedCategories[createForm.values.category3] = true;
        }
    }

    return {
        isOpen: isModalOpen,
        isFetching,
        displayWarning,
        modalType,
        editedShowId,
        isColorPickerOpen: !!artCreator.texts.find(text => text.displayColorPicker),
        categories: categories
            .filter(({ name }) => name !== 'Everything')
            .sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }

                return 0;
            })
            .map(({ name, id }) => ({ text: name, value: id, isHidden: selectedCategories[id] })),
    };
}

const container = connect(
    mapStateToProps,
    {
        toggle: toggleModal,
        createShow,
        editShow,
        initializeEdit: initialize,
        closeColorPickers,
        hideWarning: hideShowArtWarning,
        createShowWithoutArt,
    },
);

function validate(values) {
    const errors = {};
    if (routes.includes(values.customUrl)) {
        errors.customUrl = 'This URL is reserved';
    }
    if (/\W/.test(values.customUrl)) {
        errors.customUrl = 'Invalid URL';
    }
    if (!values.title) {
        errors.title = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    }
    if (typeof values.category1 === 'undefined') {
        errors.category1 = 'Required';
    }
    if (values.coverArt) {
        errors.coverArt = validateImageFile(1400, 1400, 3000, 3000, true, 2, true)(values.coverArt);
    }

    return errors;
}

const form = reduxForm({
    form: 'createShow',
    validate,
});

function createContainer(ComposedComponent) {
    class Container extends Component {
        render() {
            return createElement(ComposedComponent, this.props, null);
        }
    }

    return compose(
        container,
        form,
    )(Container);
}

export default createContainer;
