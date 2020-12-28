import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { fetchCategories } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { importShow, toggleImportModal } from 'src/actions/old/shows';
import { routes } from 'src/config/settings';

function mapStateToProps({
    shows: { isImportModalOpen, isFetching },
    form: { importShow: importForm },
    podcasts: { categories },
}) {
    const selectedCategories = {};

    if (importForm && importForm.values) {
        if (typeof importForm.values.category1 !== 'undefined') {
            selectedCategories[importForm.values.category1] = true;
        }
        if (typeof importForm.values.category2 !== 'undefined') {
            selectedCategories[importForm.values.category2] = true;
        }
        if (typeof importForm.values.category3 !== 'undefined') {
            selectedCategories[importForm.values.category3] = true;
        }
    }

    return {
        isOpen: isImportModalOpen,
        isFetching,
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
        fetchCategories,
        toggle: toggleImportModal,
        open: toggleImportModal.bind(null, true),
        close: toggleImportModal.bind(null, false),
        importShow,
    },
);

function validate(values) {
    const errors = {};
    try {
        const url = new URL(values.source_url);
        if (url.host.split('www.').includes('messy.fm')) {
            errors.source_url =
                'Hi! It looks like you are already hosting on Messy, so no need to re-add your show here. Questions? Contact help@messy.fm!';
        }
    } catch (err) {
        errors.source_url = 'Please provide a valid URL';
    }
    if (routes.includes(values.custom_url)) {
        errors.custom_url = 'This URL is reserved';
    }
    if (/\W/.test(values.custom_url)) {
        errors.custom_url = 'Invalid URL';
    }
    return errors;
}

function warn() {
    const warnings = {};
    return warnings;
}

const form = reduxForm({
    form: 'importShow',
    validate,
    warn,
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
