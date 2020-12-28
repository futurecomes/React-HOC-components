import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, initialize } from 'redux-form';

import { isEmpty, pick } from 'lodash/fp';

import { validatePresence } from 'src/shared/helpers/validate';

import { fetchEpisode, updateEpisode, deleteEpisodes } from 'src/actions/old/admin';

function validate(values) {
    const errors = {};

    const titleError = validatePresence(values.title);
    if (titleError) {
        errors.title = titleError;
    }

    return errors;
}

function initialValues(show, episode) {
    return {
        id: episode.guid,
        // position: show.podcastOrder,
        position: 1,
        title: episode.title,
        description: episode.description,
        released: episode.released,
        releasedAt: episode.releasedAt,
        createdAt: episode.createdAt,
        duration: episode.duration,
        adsEnabled: show.adsEnabled,
    };
}

function persistEpisode(attrs) {
    const validAttrs = pick(['title', 'description', 'released']);

    return updateEpisode(validAttrs(attrs), attrs.id);
}

function deleteEpisode(id) {
    return deleteEpisodes([id]);
}

function mapStateToProps({ admin: { isFetching, show, episode } }) {
    return {
        isFetching,
        initialValues: initialValues(show, episode),
        show,
        episode,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchEpisode,
            updateEpisode: persistEpisode,
            deleteEpisode: deleteEpisode.bind(null, props.episodeId),
        },
        dispatch,
    );
}

const FormName = 'EpisodeDetails';

const FormContainer = reduxForm({
    form: FormName,
    validate,
});

function createContainer(ComposedComponent) {
    class EpisodeDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.episodeId);
        }

        componentWillReceiveProps({ dispatch, show, episode }) {
            if (!isEmpty(show) && !isEmpty(episode) && (isEmpty(this.props.show) || isEmpty(this.props.episode))) {
                dispatch(initialize(FormName, initialValues(show, episode)));
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(EpisodeDetails));
}

export default createContainer;
