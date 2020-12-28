import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, initialize } from 'redux-form';
import { isEmpty } from 'lodash/fp';

import { fetchUser, updateUser, verifyCustomUrl } from 'src/modules/Auth/actions/auth';
import { validateName, validateEmail } from 'src/shared/helpers/validate';

function validate(values) {
    const errors = {};

    const nameError = validateName(values.name);
    if (nameError) {
        errors.name = nameError;
    }

    const emailError = validateEmail(values.email);
    if (emailError) {
        errors.email = emailError;
    }

    const customUrlError = /\W/.test(values.customUrl);
    if (customUrlError) {
        errors.customUrl = 'Invalid URL';
    }

    return errors;
}

function asyncValidate(values, dispatch, state) {
    if (!values.customUrl) {
        return Promise.resolve();
    }

    if (values.customUrl !== state.user.customUrl) {
        return verifyCustomUrl(values.customUrl)(dispatch);
    }

    return Promise.resolve();
}

function initialValues(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        fbUrl: user.fbUrl || '',
        twUrl: user.twUrl || '',
        igUrl: user.igUrl || '',
        ytUrl: user.ytUrl || '',
        bio: user.bio || '',
        customUrl: user.customUrl || '',
    };
}

function mapStateToProps({ auth: { isFetching, user } }) {
    return {
        isFetching,
        initialValues: initialValues(user),
        user,
    };
}

const FormName = 'personalInfo';

const FormContainer = reduxForm({
    form: FormName,
    validate,
    asyncValidate,
    asyncBlurFields: ['customUrl'],
});

function createContainer(ComposedComponent) {
    class Account extends Component {
        componentWillReceiveProps({ dispatch, user }) {
            if (user && isEmpty(this.props.user)) {
                dispatch(initialize(FormName, initialValues(user)));
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        {
            fetchUser,
            updateUser,
        },
    )(FormContainer(Account));
}

export default createContainer;
