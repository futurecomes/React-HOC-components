import React, { Component } from 'react';
import { connect } from 'react-redux';
import _orderBy from 'lodash/orderBy';

import {
    fetchPodcast,
    subscribe,
    podcastFetchShow,
    fetchPodcastData,
    podcastsIsFetching,
} from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { fetchCurrentPlan } from 'src/shared/components/old/Billing/actions';
import ShowAPI from 'src/api/shows';

function mapStateToProps({
    isPersisted,
    podcasts: { isFetching, show, shows, episodes },
    auth: { token, user, isFetching: isLoading },
}) {
    return {
        isPersisted,
        isFetching,
        isLoading,
        show: show ? shows[show.id] : null,
        episodes: show.id ? _orderBy(episodes[show.id], e => -new Date(e.releasedAt)) : [],
        isAuth: !!token && !!user.id,
        token,
    };
}

function createContainer(ComposedComponent) {
    class ShowContainer extends Component {
        async componentDidMount() {
            const name = this.props.history.location.pathname.split('/')[1];
            this.props.podcastsIsFetching();

            try {
                const show = await ShowAPI.checkIfProtected(name);
                if (show.isProtected) {
                    this.props.podcastFetchShow(show.data);
                } else {
                    this.props.fetch(name);
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
        {
            fetch: fetchPodcast,
            onSubscribe: subscribe,
            fetchCurrentPlan,
            getShowById: fetchPodcastData,
            podcastFetchShow,
            podcastsIsFetching,
        },
    )(ShowContainer);
}

export default createContainer;
