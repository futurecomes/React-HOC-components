import { isEmpty } from 'lodash/fp';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSubscribedPodcasts } from 'src/modules/Podcasts/actions/oldPodcastsActions';

function mapStateToProps({ auth: { user }, podcasts: { subscriptions }, isPersisted }) {
    return {
        user,
        subscriptions,
        isRehydrated: isPersisted,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchSubscribedPodcasts,
        },
        dispatch,
    );
}

function createContainer(ComposedComponent) {
    class Library extends Component {
        componentWillMount() {
            if (this.props.user && this.props.user.id) {
                this.props.fetch(this.props.user.id);
            }
        }

        componentWillReceiveProps({ user }) {
            if (!isEmpty(user) && isEmpty(this.props.user)) {
                this.props.fetch(user.id);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Library);
}

export default createContainer;
