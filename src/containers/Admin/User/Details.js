import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, initialize } from 'redux-form'

import { isEmpty, pick, capitalize } from 'lodash/fp'

import { validateName, validateEmail } from 'src/shared/helpers/validate'

import { fetchUser, updateUser, deleteUsers } from 'src/actions/old/admin'
import { fetchUserPaymentHistory } from 'src/modules/old/Admin/actions'

function validate(values) {
    const errors = {}

    const nameError = validateName(values.name)
    if (nameError) {
        errors.name = nameError
    }

    const emailError = validateEmail(values.email)
    if (emailError) {
        errors.email = emailError
    }

    return errors
}

function initialValues(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image || '',
        fbUrl: user.fbUrl || '',
        twUrl: user.twUrl || '',
        igUrl: user.igUrl || '',
        bio: user.bio || '',
        musicLibraryTotalAccess: !!user.musicLibraryTotalAccess,
        planType: capitalize(user.planId),
    }
}

function persistUser(attrs) {
    const validAttrs = pick([
        'email',
        'name',
        'fbUrl',
        'twUrl',
        'igUrl',
        'bio',
        'image',
        'musicLibraryTotalAccess',
    ])

    return updateUser(validAttrs(attrs), attrs.id)
}

function updateUserStatus(id, status) {
    return updateUser(
        {
            status,
        },
        id,
    )
}

function deleteUser(id) {
    return deleteUsers([id])
}

function mapStateToProps({ admin: { isFetching, user, userPlan } }) {
    return {
        isFetching,
        initialValues: initialValues(user, userPlan),
        user,
        userPlan,
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchUser,
            updateUser: persistUser,
            archiveUser: updateUserStatus.bind(null, props.userId, 'archived'),
            unarchiveUser: updateUserStatus.bind(null, props.userId, 'active'),
            deleteUser: deleteUser.bind(null, props.userId),
            fetchUserPaymentHistory: fetchUserPaymentHistory.bind(null, props.userId),
        },
        dispatch,
    )
}

const FormName = 'UserDetails'

const FormContainer = reduxForm({
    form: FormName,
    validate,
})

function createContainer(ComposedComponent) {
    class UserDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.userId)
        }

        componentWillReceiveProps({ dispatch, user, userPlan }) {
            if (!user) {
                return
            }

            if (
                isEmpty(this.props.user) ||
                isEmpty(this.props.userPlan) ||
                user.id !== this.props.user.id ||
                (userPlan && userPlan.id) !== (this.props.userPlan && this.props.userPlan.id)
            ) {
                dispatch(initialize(FormName, initialValues(user, userPlan)))
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    UserDetails.defaultProps = {
        userPlan: null,
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(UserDetails))
}

export default createContainer
