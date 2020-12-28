// Legacy
import { AES, enc } from 'crypto-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import { signIn, signUp } from 'src/modules/Auth/actions/auth';
import { validateEmail, validateSignInPassword, validateSignUpPassword } from 'src/shared/helpers/validate';

function validateSignIn(values) {
    const errors = {};

    const emailError = validateEmail(values.email);
    if (emailError) {
        errors.email = emailError;
    }

    const passwordError = validateSignInPassword(values.password, {});
    if (passwordError) {
        errors.password = passwordError;
    }

    return errors;
}

function validateSignUp(values, ...rest) {
    const errors = validateSignIn(values, ...rest);

    const passwordError = validateSignUpPassword(values.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    if (!values.name) {
        errors.name = 'Required';
    }

    const { profileImage } = values;
    if (profileImage && (profileImage.size.width <= 400 || profileImage.size.height <= 400)) {
        errors.profileImage = 'Image must be at least 400x400';
    }

    return errors;
}

function mapStateToProps({ auth: { isFetching, isPendingVerification, rememberMeEmail, rememberMePassword } }) {
    return {
        isFetching,
        isPendingVerification,
        initialValues: {
            email: rememberMeEmail,
            password: rememberMePassword ? AES.decrypt(rememberMePassword, rememberMeEmail).toString(enc.Utf8) : '',
            rememberMe: !!rememberMeEmail,
        },
    };
}

const validatorMap = {
    signIn: validateSignIn,
    signUp: validateSignUp,
};

const actionsMap = {
    signIn,
    signUp,
};

export const authHOC = (formName, Component) => {
    const FormContainer = reduxForm({
        form: formName,
        validate: validatorMap[formName],
    })(Component);

    return withRouter(
        connect(
            mapStateToProps,
            {
                authenticate: actionsMap[formName],
            },
        )(FormContainer),
    );
};
