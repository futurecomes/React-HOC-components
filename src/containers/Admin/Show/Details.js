import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, initialize } from 'redux-form';

import { isEmpty, pick } from 'lodash/fp';

import { validatePresence } from 'src/shared/helpers/validate';

import { fetchShow, updateShow, deleteShows } from 'src/actions/old/admin';

function validate(values) {
    const errors = {};

    const titleError = validatePresence(values.title);
    if (titleError) {
        errors.title = titleError;
    }

    return errors;
}

function initialValues(show) {
    return {
        id: show.id,
        title: show.title,
        description: show.description || '',
        categories: show.categories || [],
        category1: show.categories && show.categories[0],
        category2: show.categories && show.categories[1],
        category3: show.categories && show.categories[2],
        createdBy: show.createdBy,
        adsEnabled: show.adsEnabled,
        explicit: show.explicit,
        itunesUrl: show.itunesUrl || '',
        spotifyUrl: show.spotifyUrl || '',
        googleUrl: show.googleUrl || '',
        patreonUrl: show.patreonUrl || '',
        promoted: !!show.promoted,
        rssUrl: show.rssUrl || '',
    };
}

function persistShow(attrs) {
    const validAttrs = pick([
        'title',
        'description',
        'categories',
        'adsEnabled',
        'explicit',
        'itunesUrl',
        'spotifyUrl',
        'googleUrl',
        'patreonUrl',
        'rssUrl',
        'coverImage',
        'promoted',
    ]);

    /* eslint-disable no-param-reassign */
    attrs.categories = [attrs.category1, attrs.category2, attrs.category3];
    /* eslint-enable */

    return updateShow(validAttrs(attrs), attrs.id);
}

function deleteShow(id) {
    return deleteShows([id]);
}

function mapStateToProps({ admin: { isFetching, show, categories } }) {
    return {
        isFetching,
        initialValues: initialValues(show),
        show,
        categories,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchShow,
            updateShow: persistShow,
            deleteShow: deleteShow.bind(null, props.showId),
        },
        dispatch,
    );
}

const FormName = 'ShowDetails';

const FormContainer = reduxForm({
    form: FormName,
    validate,
});

function createContainer(ComposedComponent) {
    class ShowDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.showId);
        }

        componentWillReceiveProps({ dispatch, show }) {
            if ((!isEmpty(show) && isEmpty(this.props.show)) || show.id !== this.props.show.id) {
                dispatch(initialize(FormName, initialValues(show)));
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(ShowDetails));
}

export default createContainer;
