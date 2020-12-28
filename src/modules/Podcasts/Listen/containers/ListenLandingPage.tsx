import * as H from 'history';
import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';

import { Episode, Show } from '../../models/podcasts';
import { loadMorePodcasts } from '../actions/listenActions';
import { getLatestEpisodes, getPromotedShows, getTrendingEpisodes } from '../selectors/listenSelectors';
import { PodcastItems } from './PodcastItems';

interface StateProps {
    trendingEpisodes: Episode[];
    latestEpisodes: Episode[];
    promotedShows: Show[];
}

interface ActionsProps {
    loadMorePodcasts: typeof loadMorePodcasts;
}

interface Props extends StateProps, ActionsProps {
    history: H.History;
    togglePlay: (showId: number, episodeId: string, force: boolean, currentPodcast: Episode) => void;
}

class ListenLandingPageContainer extends React.PureComponent<Props> {
    public loadMore = (path: string, type: string, from: number) => {
        this.props.loadMorePodcasts({ path, type, from });
    };

    public render(): JSX.Element {
        return (
            <>
                <PodcastItems
                    sectionTitle="Top &amp; Trending Episodes"
                    items={this.props.trendingEpisodes}
                    history={this.props.history}
                    togglePlay={this.props.togglePlay}
                />
                <PodcastItems
                    sectionTitle="Can't Miss Shows"
                    items={this.props.promotedShows}
                    history={this.props.history}
                    togglePlay={this.props.togglePlay}
                    areItemsShows
                    isCarousel
                />
                <PodcastItems
                    sectionTitle="Latest Episodes from Messy Podcasters"
                    items={this.props.latestEpisodes}
                    history={this.props.history}
                    togglePlay={this.props.togglePlay}
                    onLoadMore={this.loadMore}
                    isCarousel
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    trendingEpisodes: getTrendingEpisodes(state),
    latestEpisodes: getLatestEpisodes(state),
    promotedShows: getPromotedShows(state),
});

export const ListenLandingPage = connect(
    mapStateToProps,
    {
        loadMorePodcasts,
    },
)(ListenLandingPageContainer);
