import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, initialize } from 'redux-form';

import { isEmpty, pick } from 'lodash/fp';

import { validatePresence } from 'src/shared/helpers/validate';

import { fetchFreeMusic, updateFreeMusic, deleteActiveFreeMusic } from 'src/actions/old/admin';

function validate(values) {
    const errors = {};

    if (isEmpty(values)) {
        return errors;
    }

    if (values.audioFile !== undefined) {
        const fileError = validatePresence(values.audioFile);
        if (fileError) {
            errors.audioFile = fileError;
        }
    }

    return errors;
}

function initialValues(music) {
    return {
        id: music.id,
        name: music.name,
        audioFile: music.audioFile,
        createdAt: music.createdAt,
        notes: music.notes,
    };
}

function persistMusic(attrs) {
    const validAttrs = pick(['name', 'audioFile', 'notes']);

    return updateFreeMusic(attrs.id, validAttrs(attrs));
}

function toggleMusicEnabled(id, isEnabled) {
    return updateFreeMusic(id, {
        active: isEnabled,
    });
}

function deleteMusic(id) {
    return deleteActiveFreeMusic([id]);
}

function mapStateToProps({ admin: { isFetching, freeMusic } }) {
    return {
        isFetching,
        initialValues: initialValues(freeMusic),
        freeMusic,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchFreeMusic,
            updateMusic: persistMusic,
            enableMusic: toggleMusicEnabled.bind(null, props.id, true),
            disableMusic: toggleMusicEnabled.bind(null, props.id, false),
            deleteMusic: deleteMusic.bind(null, props.id),
        },
        dispatch,
    );
}

const FormName = 'FreeMusic';

const FormContainer = reduxForm({
    form: FormName,
    validate,
});

function createContainer(ComposedComponent) {
    class FreeMusicDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.id);
        }

        componentWillReceiveProps({ dispatch, freeMusic }) {
            if ((!isEmpty(freeMusic) && isEmpty(this.props.freeMusic)) || freeMusic.id !== this.props.freeMusic.id) {
                dispatch(initialize(FormName, initialValues(freeMusic)));
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(FreeMusicDetails));
}

export default createContainer;
