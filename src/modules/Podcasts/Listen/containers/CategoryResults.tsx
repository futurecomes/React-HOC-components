import * as H from 'history';
import { isEmpty, throttle } from 'lodash';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { AppState } from 'src/config/appState';
import { Button } from 'src/shared/components/Button';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';

import { Episode } from '../../models/podcasts';
import { changeCurrentCategory, clearPodcastsByCategory, loadMorePodcastsByCategory } from '../actions/listenActions';
import { BackButton } from '../components/BackButton';
import { DetailedEpisodeTile } from '../components/DetailedEpisodeTile';
import { Category } from '../models/listen';
import {
    getAreMoreLatest,
    getCurrentCategory,
    getCurrentCategoryLatestEpisodes,
    getCurrentCategoryTrendingEpisodes,
} from '../selectors/listenSelectors';
import * as S from './styles';

const Results = styled.div({
    marginBottom: '4rem',
});

const LoadMoreButtonWrapper = styled.div({
    width: '100%',
    textAlign: 'center',
});

interface MatchParams {
    categoryName: string;
}

interface StateProps {
    latestEpisodes: Episode[];
    trendingEpisodes: Episode[];
    areMoreLatest?: boolean;
    currentCategory: Category | undefined;
}

interface ActionsProps {
    clearPodcastsByCategory: typeof clearPodcastsByCategory;
    loadMorePodcastsByCategory: typeof loadMorePodcastsByCategory;
    changeCurrentCategory: typeof changeCurrentCategory;
}

interface Props extends StateProps, ActionsProps, RouteComponentProps<MatchParams> {
    categories: Category[] | undefined;
    isFetching: boolean;
    history: H.History;
    togglePlay: (showId: number, episodeId: string | number, force: boolean, currentPodcast: Episode) => void;
    fetchPodcastsByCategory: (category: Category, type: string, from?: number) => void;
}

export class CategoryResultsContainer extends React.Component<Props> {
    public componentDidMount(): void {
        // Done not to rewrite fetchPodcastsByCategory epic (had to hurry)
        const { currentCategory } = this.props;

        if (currentCategory) {
            this.fetchEpisodes(currentCategory);
        }
    }

    private fetchEpisodes = (currentCategory: Category) => {
        this.props.fetchPodcastsByCategory(currentCategory, 'latest');
        this.props.fetchPodcastsByCategory(currentCategory, 'trending');
    };

    private loadMore = (currentCategory: Category, from: number) =>
        throttle(() => this.props.fetchPodcastsByCategory(currentCategory, 'latest', from), 500, {
            trailing: false,
        });

    public handlePlayEpisode = (item: Episode) => () => this.props.togglePlay(item.show, item.guid, false, item);

    public goToShow = (item: Episode) => () => this.props.history.push(item.show ? item.showUrl : item.url);

    private displayItems = (episodes: Episode[]) =>
        episodes.map(episode => (
            <DetailedEpisodeTile
                key={episode.guid}
                episode={episode}
                onClick={this.goToShow(episode)}
                onPlay={this.handlePlayEpisode(episode)}
            />
        ));

    public componentDidUpdate(prevProps: Props): void {
        // Done not to rewrite fetchPodcastsByCategory epic (had to hurry)

        const { categoryName } = this.props.match.params;

        if (categoryName && this.props.categories) {
            const categoryFromUrl = this.props.categories.find(category => category.urlParam === categoryName);

            if (!categoryFromUrl) {
                return this.props.history.push('/listen');
            }

            this.props.changeCurrentCategory(categoryFromUrl);
        }

        const previousCategory = prevProps.currentCategory;
        const currentCategory = this.props.currentCategory;

        if (
            currentCategory &&
            (!previousCategory || (previousCategory && previousCategory.id !== currentCategory.id))
        ) {
            this.props.clearPodcastsByCategory();
            this.fetchEpisodes(currentCategory);
        }
    }

    public render(): JSX.Element {
        const { currentCategory, latestEpisodes, trendingEpisodes } = this.props;

        const noInitialResults = !latestEpisodes || (isEmpty(latestEpisodes) && this.props.isFetching);

        return noInitialResults || !currentCategory ? (
            <CenteredSpinner />
        ) : (
            <>
                <BackButton history={this.props.history} />
                {trendingEpisodes && !isEmpty(trendingEpisodes) && (
                    <Results>
                        <S.Header>
                            <span>{currentCategory!.name} / </span>Top &amp; Trending Episodes
                        </S.Header>
                        {this.displayItems(trendingEpisodes)}
                    </Results>
                )}
                {latestEpisodes && !isEmpty(latestEpisodes) && (
                    <Results>
                        <S.Header>
                            <span>{currentCategory!.name} / </span>Latest Episodes from Messy Podcasters
                        </S.Header>
                        {this.displayItems(latestEpisodes)}
                        {this.props.areMoreLatest && (
                            <>
                                {this.props.isFetching ? (
                                    <CenteredSpinner />
                                ) : (
                                    <LoadMoreButtonWrapper>
                                        <Button
                                            type="secondary"
                                            onClick={this.loadMore(currentCategory!, latestEpisodes.length)}
                                        >
                                            Load more results
                                        </Button>
                                    </LoadMoreButtonWrapper>
                                )}
                            </>
                        )}
                    </Results>
                )}
            </>
        );
    }

    public componentWillUnmount(): void {
        this.props.clearPodcastsByCategory();
    }
}

const mapStateToProps = (state: AppState) => ({
    currentCategory: getCurrentCategory(state),
    areMoreLatest: getAreMoreLatest(state),
    latestEpisodes: getCurrentCategoryLatestEpisodes(state),
    trendingEpisodes: getCurrentCategoryTrendingEpisodes(state),
});

export const CategoryResults = connect(
    mapStateToProps,
    {
        clearPodcastsByCategory,
        loadMorePodcastsByCategory,
        changeCurrentCategory,
    },
)(CategoryResultsContainer);
