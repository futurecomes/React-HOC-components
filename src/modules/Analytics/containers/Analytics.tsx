import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppState } from 'src/config/appState';
import { fetchUserShows } from 'src/modules/old/Shows/actions';
import { Show } from 'src/modules/Podcasts/models/podcasts';
import { getUserShowById } from 'src/modules/Shows/selectors/showsSelectors';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { breakPoints } from 'src/styles/variables';

import { fetchShowAnalytics } from '../actions/analyticsActions';
import { EpisodesBreakdown } from '../components/EpisodesBreakdown';
import { PlaysChart } from '../components/PlaysChart';
import { ShowDetails } from '../components/ShowDetails';
import { AnalyticsEpisode } from '../models/analytics';
import {
    getAnalyticsShowEpisodes,
    getAnalyticsShowTotalPlays,
    getIsAnalyticsFetching,
} from '../selectors/analyticsSelectors';

interface StateProps {
    showData?: Show;
    totalPlays: number;
    episodes: AnalyticsEpisode[];
    isFetching: boolean;
}

interface ActionsProps {
    fetchShowAnalytics: typeof fetchShowAnalytics;
    fetchUserShows: typeof fetchUserShows;
}

type Props = RouteComponentProps<{ show: string }> & StateProps & ActionsProps;

interface State {
    showFullLabels: boolean;
}

class AnalyticsContainer extends React.Component<Props> {
    public state: State = {
        showFullLabels: true,
    };

    public updateChartDataKeys = () =>
        this.setState({
            showFullLabels: window.innerWidth >= breakPoints.md,
        });

    public async componentDidMount(): Promise<void> {
        window.addEventListener('resize', this.updateChartDataKeys);
        this.updateChartDataKeys();
        // Needs to wait for rehydrate, it can be solved by using PersistGate
        setTimeout(() => {
            this.props.fetchUserShows();
            this.props.fetchShowAnalytics(this.props.match.params.show);
        }, 1000);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateChartDataKeys);
    }

    public render(): JSX.Element {
        return !this.props.isFetching && this.props.showData && this.props.episodes ? (
            <>
                <ShowDetails showData={this.props.showData} totalPlays={this.props.totalPlays} />
                <PlaysChart showFullLabels={this.state.showFullLabels} />
                {this.props.episodes && (
                    <EpisodesBreakdown episodes={this.props.episodes} showFullLabels={this.state.showFullLabels} />
                )}
            </>
        ) : (
            <CenteredSpinner />
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: Props) => ({
    showData: getUserShowById(state, ownProps.match.params.show),
    totalPlays: getAnalyticsShowTotalPlays(state),
    episodes: getAnalyticsShowEpisodes(state),
    isFetching: getIsAnalyticsFetching(state),
});

export default withRouter(
    connect(
        mapStateToProps,
        {
            fetchUserShows,
            fetchShowAnalytics,
        },
    )(AnalyticsContainer),
);
