import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDashboardAnalytics } from 'src/modules/old/Admin/actions'

function mapStateToProps({ admin: { isFetching, analytics } }) {
    return {
        isFetching,
        analytics,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        componentDidMount() {
            this.props.fetch()
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(
        mapStateToProps,
        {
            fetch: fetchDashboardAnalytics,
        },
    )(Container)
}

export default createContainer
