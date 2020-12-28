import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { isEmpty, pick } from 'lodash/fp'

import { createVisualAd } from 'src/actions/old/admin'

import { fetchPages } from 'src/actions/old/pages'

function validate(values) {
    const errors = {}

    if (isEmpty(values)) {
        return errors
    }

    return errors
}

function persistAd(attrs) {
    const validAttrs = pick([
        'name',
        'url',
        'enabled',
        'frequency',
        'notes',
        'imageLeaderboard',
        'imageHalfPage',
        'imageMobile',
    ])

    const pagesEnabled = Object.keys(attrs).reduce((ret, attr) => {
        if (!attr.match(/pages-/)) return ret

        const id = attr.replace(/pages-/, '')
        return ret.concat(id)
    }, [])

    return createVisualAd({
        pagesEnabled,
        ...validAttrs(attrs),
    })
}

function mapStateToProps({
    pages: { list: pages },
    admin: { isFetching },
    messages: { form: { successes } },
}) {
    return {
        pages,
        isFetching,
        isSuccessful: successes.length > 0,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchPages,
            createAd: persistAd,
        },
        dispatch,
    )
}

const FormName = 'NewAd'

const FormContainer = reduxForm({
    form: FormName,
    validate,
})

function createContainer(ComposedComponent) {
    class NewAd extends Component {
        componentDidMount() {
            this.props.fetchPages()
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(FormContainer(NewAd))
}

export default createContainer
