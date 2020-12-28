import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, initialize } from 'redux-form'

import { isEmpty, pick } from 'lodash/fp'

import { fetchAd, updateVisualAd, deleteVisualAds } from 'src/actions/old/admin'

import { fetchPages } from 'src/actions/old/pages'

function validate(values) {
    const errors = {}

    if (isEmpty(values)) {
        return errors
    }

    return errors
}

function initialValues(ad) {
    const pagesEnabled = ad.pagesEnabled || []
    const pages = pagesEnabled.reduce((ret, page) => {
        /* eslint-disable no-param-reassign */
        ret[`pages-${page}`] = true
        return ret
        /* eslint-enable */
    }, {})

    return {
        id: ad.id,
        name: ad.name,
        url: ad.url,
        frequency: ad.frequency,
        lastActive: ad.lastActive || '',
        createdAt: ad.createdAt,
        notes: ad.notes,
        ...pages,
    }
}

function persistAd(attrs) {
    const validAttrs = pick([
        'name',
        'url',
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

    return updateVisualAd(attrs.id, {
        pagesEnabled,
        ...validAttrs(attrs),
    })
}

function toggleAdEnabled(id, isEnabled) {
    return updateVisualAd(id, {
        enabled: isEnabled,
    })
}

function deleteAd(id) {
    return deleteVisualAds([id])
}

function mapStateToProps({ admin: { isFetching, ad }, pages: { list: pages } }) {
    return {
        isFetching,
        initialValues: initialValues(ad),
        ad,
        pages,
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchAd,
            fetchPages,
            updateAd: persistAd,
            enableAd: toggleAdEnabled.bind(null, props.id, true),
            disableAd: toggleAdEnabled.bind(null, props.id, false),
            deleteAd: deleteAd.bind(null, props.id),
        },
        dispatch,
    )
}

const FormName = 'VisualAd'

const FormContainer = reduxForm({
    form: FormName,
    validate,
})

function createContainer(ComposedComponent) {
    class AdDetails extends Component {
        componentDidMount() {
            this.props.fetch(this.props.id)
            this.props.fetchPages()
        }

        componentWillReceiveProps({ dispatch, ad }) {
            if ((!isEmpty(ad) && isEmpty(this.props.ad)) || ad.id !== this.props.ad.id) {
                dispatch(initialize(FormName, initialValues(ad)))
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(FormContainer(AdDetails))
}

export default createContainer
