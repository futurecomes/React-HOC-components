import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, initialize } from 'redux-form';

import { isEmpty, pick } from 'lodash/fp';

import { validatePresence } from 'src/shared/helpers/validate';

import { fetchAd, updateAudioAd, deleteAudioAds } from 'src/actions/old/admin';

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

function initialValues(ad) {
    return {
        id: ad.id,
        name: ad.name,
        audioFile: ad.audioFile || ad.url,
        position: ad.position,
        frequency: ad.frequency,
        lastActive: ad.lastActive,
        createdAt: ad.createdAt,
        notes: ad.notes,
    };
}

function persistAd(attrs) {
    const validAttrs = pick(['name', 'position', 'frequency', 'audioFile', 'notes']);

    return updateAudioAd(attrs.id, validAttrs(attrs));
}

function toggleAdEnabled(id, isEnabled) {
    return updateAudioAd(id, {
        enabled: isEnabled,
    });
}

function deleteAd(id) {
    return deleteAudioAds([id]);
}

function mapStateToProps({ admin: { isFetching, ad } }) {
    return {
        isFetching,
        initialValues: initialValues(ad),
        ad,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchAd,
            updateAd: persistAd,
            enableAd: toggleAdEnabled.bind(null, props.id, true),
            disableAd: toggleAdEnabled.bind(null, props.id, false),
            deleteAd: deleteAd.bind(null, props.id),
        },
        dispatch,
    );
}

const FormName = 'AudioAd';

const FormContainer = reduxForm({
    form: FormName,
    validate,
});

function createContainer(ComposedComponent) {
    class AdDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.id);
        }

        componentWillReceiveProps({ dispatch, ad }) {
            if ((!isEmpty(ad) && isEmpty(this.props.ad)) || ad.id !== this.props.ad.id) {
                dispatch(initialize(FormName, initialValues(ad)));
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(AdDetails));
}

export default createContainer;
