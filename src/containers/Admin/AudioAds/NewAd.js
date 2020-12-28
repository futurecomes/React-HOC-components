import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { isEmpty } from 'lodash/fp';

import { createAudioAd } from 'src/actions/old/admin';

import { validatePresence } from 'src/shared/helpers/validate';

function validate(values) {
    const errors = {};

    if (isEmpty(values)) {
        return errors;
    }

    const fileError = validatePresence(values.audioFile);
    if (fileError) {
        errors.audioFile = fileError;
    }

    return errors;
}

function mapStateToProps({
    admin: { isFetching },
    messages: {
        form: { successes },
    },
}) {
    return {
        isSuccessful: successes.length > 0,
        isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            createAd: createAudioAd,
        },
        dispatch,
    );
}

const FormContainer = reduxForm({
    form: 'NewAd',
    validate,
});

function createContainer(Component) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(Component));
}

export default createContainer;
