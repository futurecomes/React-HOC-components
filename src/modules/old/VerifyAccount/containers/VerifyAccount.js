import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { verify } from 'src/modules/Auth/actions/auth';
import { fetchCurrentPlan } from 'src/shared/components/old/Billing/actions';

function mapStateToProps({ auth: { isFetching, token, error } }) {
    return {
        isFetching,
        error,
        isAuthenticated: !!token,
    };
}

const container = connect(
    mapStateToProps,
    {
        verify,
        fetchCurrentPlan,
    },
);

export default function createContainer(ComposedComponent) {
    class VerifyAccount extends Component {
        componentWillMount() {
            const {
                match: {
                    params: { token },
                },
                // history: {replace},
            } = this.props;

            if (token) {
                this.props.verify(token);
                // replace('/verify');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return withRouter(container(VerifyAccount));
}
