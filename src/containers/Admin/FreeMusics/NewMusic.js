import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { isEmpty, pick } from 'lodash/fp';

import { createFreeMusic } from 'src/actions/old/admin';

function validate(values) {
    const errors = {};

    if (isEmpty(values)) {
        return errors;
    }

    return errors;
}

function persistMusic(attrs) {
    const validAttrs = pick(['name', 'audioFile', 'active', 'notes']);

    return createFreeMusic(validAttrs(attrs));
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
            createMusic: persistMusic,
        },
        dispatch,
    );
}

const FormName = 'NewFreeMusic';

const FormContainer = reduxForm({
    form: FormName,
    validate,
});

function createContainer(ComposedComponent) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(ComposedComponent));
}

export default createContainer;
