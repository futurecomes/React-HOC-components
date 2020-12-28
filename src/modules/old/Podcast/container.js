import React, { Component } from 'react';
import _orderBy from 'lodash/orderBy';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchPodcastData,
    subscribe,
    podcastFetchShow,
    podcastsIsFetching,
} from 'src/modules/Podcasts/actions/oldPodcastsActions';
import ShowAPI from 'src/api/shows';

function mapStateToProps(
    { isPersisted, podcasts: { isFetching, shows, episodes }, auth: { token, user, isFetching: isLoading } },
    ownProps,
) {
    return {
        isPersisted,
        isFetching,
        isLoading,
        show: shows[ownProps.id],
        episodes: episodes ? _orderBy(episodes[ownProps.id], e => -new Date(e.releasedAt)) : [],
        isAuth: !!token && !!user.id,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators(
        {
            fetch: fetchPodcastData,
            onSubscribe: subscribe.bind(this, ownProps.id),
            getShowById: fetchPodcastData,
            podcastFetchShow,
            podcastsIsFetching,
        },
        dispatch,
    );
}

function createContainer(ComposedComponent) {
    class PodcastContainer extends Component {
        async componentDidMount() {
            try {
                this.props.podcastsIsFetching();
                const show = await ShowAPI.checkIfProtected(this.props.id);
                if (show.isProtected) {
                    this.props.podcastFetchShow(show.data);
                } else {
                    this.props.fetch(this.props.id);
                }
            } catch (err) {
                this.props.podcastsIsFetching(false);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PodcastContainer);
}

export const PodcastContainer = createContainer;
