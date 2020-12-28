import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, reset } from 'redux-form'

import { fetchUser, updatePassword } from 'src/modules/Auth/actions/auth'
import { validatePassword, validatePasswordPresence } from 'src/shared/helpers/validate'

function validate(values) {
    const errors = {}

    const currentPasswordError = validatePasswordPresence(values.currentPassword)
    if (currentPasswordError) {
        errors.currentPassword = currentPasswordError
    }

    const newPasswordError = validatePassword(values.newPassword)
    if (newPasswordError) {
        errors.newPassword = newPasswordError
    }

    const newPasswordConfirmError = validatePassword(values.newPassword, values.newPasswordConfirm)
    if (newPasswordConfirmError) {
        errors.newPasswordConfirm = newPasswordConfirmError
    }

    return errors
}

function mapStateToProps({auth: { isFetching, user }, form: { password } }) {
    return {
        isFetching,
        user,
        password,
        initialValues: {
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchUser,
            updatePassword,
        },
        dispatch,
    )
}
const FormName = 'password'

const FormContainer = reduxForm({
    form: FormName,
    validate,
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FormName)),
})

function createContainer(ComposedComponent) {
    class Password extends Component {
        componentDidMount() {
            this.props.fetchUser(true)
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(Password))
}

export default createContainer
