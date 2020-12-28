import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { AppState } from 'src/config/appState';
import { togglePlay } from 'src/middlewares/audio';
import { fetchCategories } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import * as S from 'src/styles/sections';
import { color, media } from 'src/styles/variables';

import { Episode } from '../models/podcasts';
import { getIsPodcastsDataFetching, getPodcastsCategories } from '../selectors/podcastsSelectors';
import {
    clearPodcasts,
    fetchListenPageData,
    fetchPodcastsByCategory,
    loadMorePodcasts,
    searchForPodcasts,
} from './actions/listenActions';
import { Toolbar } from './components/Toolbar';
import { CategoryResults } from './containers/CategoryResults';
import { ListenLandingPage } from './containers/ListenLandingPage';
import { SearchResults } from './containers/SearchResults';
import { Category } from './models/listen';
import { getListenPageSearchResults, getSearchTerm } from './selectors/listenSelectors';

const ListenSectionWrapper = styled(S.SectionWrapper)({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app in the future, only on new pages for now
    paddingTop: 0,
    [media.md]: {
        paddingTop: 0,
    },
});

interface MatchParams {
    categoryId: string;
}

interface StateProps {
    categories: Category[];
    isFetching: boolean;
    searchTerm?: string;
    searchResults?: Episode[];
}

interface ActionsProps {
    fetchListenPageData: typeof fetchListenPageData;
    fetchCategories: typeof fetchCategories;
    clearPodcasts: typeof clearPodcasts;
    togglePlay: typeof togglePlay;
    searchForPodcasts: typeof searchForPodcasts;
    fetchPodcastsByCategory: typeof fetchPodcastsByCategory;
}

type Props = StateProps & ActionsProps & RouteComponentProps<MatchParams>;

class ListenContainer extends React.Component<Props> {
    public componentDidMount(): void {
        this.props.fetchListenPageData();
        this.props.fetchCategories();
    }

    public componentWillUnmount(): void {
        this.props.clearPodcasts();
    }

    public render(): JSX.Element {
        const { searchResults, history, isFetching, searchTerm } = this.props;

        const showSearchPage = searchResults || (searchTerm && isFetching);

        return (
            <>
                <S.SectionWrapper backgroundColor={color.solitude}>
                    <S.ContentWrapper>
                        <Toolbar history={this.props.history} />
                    </S.ContentWrapper>
                </S.SectionWrapper>
                <Route
                    path="/listen/category/:categoryName"
                    render={routeProps => (
                        <ListenSectionWrapper backgroundColor={color.solitude} fillHeight>
                            <S.ContentWrapper>
                                <CategoryResults
                                    isFetching={isFetching}
                                    togglePlay={this.props.togglePlay}
                                    history={history}
                                    fetchPodcastsByCategory={this.props.fetchPodcastsByCategory}
                                    categories={this.props.categories}
                                    {...routeProps}
                                />
                            </S.ContentWrapper>
                        </ListenSectionWrapper>
                    )}
                />
                <Route
                    path="/listen"
                    exact
                    render={() =>
                        showSearchPage ? (
                            <ListenSectionWrapper backgroundColor={color.solitude} fillHeight>
                                <S.ContentWrapper>
                                    <SearchResults
                                        episodes={searchResults}
                                        togglePlay={this.props.togglePlay}
                                        searchForPodcasts={this.props.searchForPodcasts}
                                        history={history}
                                        isFetching={isFetching}
                                    />
                                </S.ContentWrapper>
                            </ListenSectionWrapper>
                        ) : (
                            <ListenSectionWrapper backgroundColor={color.solitude} fillHeight>
                                <S.ContentWrapper>
                                    <ListenLandingPage history={history} togglePlay={this.props.togglePlay} />
                                </S.ContentWrapper>
                            </ListenSectionWrapper>
                        )
                    }
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    categories: getPodcastsCategories(state),
    searchResults: getListenPageSearchResults(state),
    searchTerm: getSearchTerm(state),
    isFetching: getIsPodcastsDataFetching(state),
});

const Listen = withRouter(
    connect(
        mapStateToProps,
        {
            fetchListenPageData,
            fetchCategories,
            loadMorePodcasts,
            clearPodcasts,
            togglePlay,
            fetchPodcastsByCategory,
            searchForPodcasts,
        },
    )(ListenContainer),
);

export default Listen;
