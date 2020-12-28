import * as H from 'history';
import { isEmpty, throttle } from 'lodash';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from 'src/config/appState';
import { getUserLoginStatus } from 'src/modules/Auth/selectors/authSelectors';
import { Button } from 'src/shared/components/Button';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';

import { Episode } from '../../models/podcasts';
import { clearSearchResults } from '../actions/listenActions';
import { BackButton } from '../components/BackButton';
import { DetailedEpisodeTile } from '../components/DetailedEpisodeTile';
import { getIsMoreSearch, getSearchTerm } from '../selectors/listenSelectors';
import * as S from './styles';

const NoResultsInfo = styled.div({
    display: 'block',
    margin: '1rem auto 0',
    maxWidth: '40rem',
    a: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

const LoadMoreButtonWrapper = styled.div({
    width: '100%',
    textAlign: 'center',
});

interface StateProps {
    searchTerm?: string;
    isMoreSearch?: boolean;
    isUserLoggedIn?: boolean;
}

interface ActionsProps {
    clearSearchResults: typeof clearSearchResults;
}

interface State {
    searchTerm: string;
}

interface Props extends StateProps, ActionsProps {
    episodes?: Episode[];
    history: H.History;
    togglePlay: (showId: number, episodeId: string | number, force: boolean, currentEpisode: Episode) => void;
    searchForPodcasts: (from: number, searchTerm: string) => void;
    isFetching: boolean;
}

class SearchResultsContainer extends React.Component<Props, State> {
    public state: State = {
        searchTerm: '',
    };

    private loadMore = (from: number, searchTerm: string) =>
        throttle(() => this.props.searchForPodcasts(from, searchTerm), 500, { trailing: false });

    public playEpisode = (item: Episode) => () => this.props.togglePlay(item.show, item.guid, false, item);

    public goToShow = (item: Episode) => () => this.props.history.push(item.show ? item.showUrl : item.url);

    private resetSearch = () => this.props.clearSearchResults();

    public render(): JSX.Element {
        const noInitialResults = this.props.isFetching && (!this.props.episodes || isEmpty(this.props.episodes));

        if (noInitialResults) {
            return <CenteredSpinner />;
        }

        return !this.props.episodes || isEmpty(this.props.episodes) ? (
            <NoResultsInfo>
                <h2>We can't find any Messy podcasts that match that search term...</h2>
                <p>
                    You can <Link to="/join">create your own podcast</Link> to fill that gap, or search our{' '}
                    <a onClick={this.resetSearch}>Top &amp; Trending</a> episodes to see other shows you might enjoy.
                </p>
            </NoResultsInfo>
        ) : (
            <>
                <BackButton history={this.props.history} />
                <S.Header>
                    Latest Episodes from Messy Podcasters<span> / search for: "{this.state.searchTerm}"</span>
                </S.Header>
                {this.props.episodes.map(episode => (
                    <DetailedEpisodeTile
                        key={episode.guid}
                        episode={episode}
                        onClick={this.goToShow(episode)}
                        onPlay={this.playEpisode(episode)}
                    />
                ))}
                {this.props.isMoreSearch && this.props.searchTerm && (
                    <>
                        {this.props.isFetching ? (
                            <CenteredSpinner />
                        ) : (
                            <LoadMoreButtonWrapper>
                                <Button
                                    type="secondary"
                                    onClick={this.loadMore(this.props.episodes.length, this.props.searchTerm)}
                                >
                                    Load more results
                                </Button>
                            </LoadMoreButtonWrapper>
                        )}
                    </>
                )}
            </>
        );
    }

    public componentDidUpdate(prevProps: Props): void {
        if (prevProps.isFetching) {
            this.setState({ searchTerm: this.props.searchTerm || '' });
        }
    }

    public componentWillUnmount(): void {
        this.props.clearSearchResults();
    }
}

const mapStateToProps = (state: AppState) => ({
    isMoreSearch: getIsMoreSearch(state),
    searchTerm: getSearchTerm(state),
    isUserLoggedIn: getUserLoginStatus(state),
});

export const SearchResults = connect(
    mapStateToProps,
    {
        clearSearchResults,
    },
)(SearchResultsContainer);
