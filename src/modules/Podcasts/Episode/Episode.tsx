import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppState } from 'src/config/appState';
import { togglePlay } from 'src/middlewares/audio';
import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';
import { color } from 'src/styles/variables';

import { DetailedEpisodeTile } from '../Listen/components/DetailedEpisodeTile';
import { SingleEpisodeData } from '../models/podcasts';
import * as singleEpisodeActons from './actions/SingleEpisodeActions';
import { convertSingleEpisodeDataToEpisode } from './helpers/convertSingleEpisodeDataToEpisode';
import { getSingleEpisodeData } from './selectors/episodeSelectors';

interface StateProps {
    episodeData: SingleEpisodeData;
    isFetchingEpisode: boolean;
    isPlaying: boolean;
}

interface ActionsProps {
    fetchSingleEpisode: typeof singleEpisodeActons.singleEpisodeIsFetchingStart;
    play: typeof togglePlay;
}

type Props = RouteComponentProps<{ guid: string }> & ActionsProps & StateProps;

class EpisodeContainer extends React.Component<Props> {
    public componentDidMount(): void {
        this.props.fetchSingleEpisode(this.props.match.params.guid);
    }

    public handlePlayEpisode = () =>
        this.props.play(
            this.props.episodeData.showId,
            this.props.episodeData.episodeGuid,
            false,
            convertSingleEpisodeDataToEpisode(this.props.episodeData),
        );

    public goToShow = () => this.props.history.push(`/show/${this.props.episodeData.showId}`);

    public render(): JSX.Element | null {
        return this.props.episodeData ? (
            <SectionWrapper backgroundColor={color.solitude}>
                <ContentWrapper>
                    <DetailedEpisodeTile
                        episode={convertSingleEpisodeDataToEpisode(this.props.episodeData)}
                        onClick={this.goToShow}
                        onPlay={this.handlePlayEpisode}
                        showPlayButton
                    />
                </ContentWrapper>
            </SectionWrapper>
        ) : null;
    }
}

export default connect(
    (state: AppState) => ({
        episodeData: getSingleEpisodeData(state),
    }),
    {
        fetchSingleEpisode: singleEpisodeActons.singleEpisodeIsFetchingStart,
        play: togglePlay,
    },
)(withRouter(EpisodeContainer));
