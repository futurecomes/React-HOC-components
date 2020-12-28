import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { requestResetPassword, resetPassword, setResetToken } from 'src/modules/Auth/actions/auth';
import { validateEmail, validateSignUpPassword } from 'src/shared/helpers/validate';

function validate(values) {
    const errors = {};

    const emailError = validateEmail(values.email);
    if (emailError && !values.password) {
        errors.email = emailError;
    }

    if (values.password) {
        const passwordError = validateSignUpPassword(values.password);
        if (passwordError) {
            errors.password = passwordError;
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
    }

    return errors;
}

function mapStateToProps({ auth: { isFetching, isPendingReset, resetToken } }) {
    return {
        isFetching,
        isPending: isPendingReset,
        hasResetToken: !!resetToken,
    };
}

const pageContainer = connect(
    mapStateToProps,
    {
        requestResetPassword,
        resetPassword,
        setResetToken,
    },
);

export function createPageContainer(ComposedComponent) {
    class ResetPasswordContainer extends Component {
        async componentDidMount() {
            const {
                match: {
                    params: { token },
                },
                history: { replace },
            } = this.props;

            if (token) {
                await setTimeout(() => {
                    this.props.setResetToken(token);
                }, 1000);
                replace('/reset');
            }
        }

        componentWillReceiveProps(nextProps) {
            if (this.props.hasResetToken && !nextProps.hasResetToken) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return withRouter(pageContainer(ResetPasswordContainer));
}

function createContainer(ComposedComponent) {
    const FormContainer = reduxForm({
        form: 'resetPassword',
        validate,
    })(ComposedComponent);

    return createPageContainer(FormContainer);
}

export default createContainer;
