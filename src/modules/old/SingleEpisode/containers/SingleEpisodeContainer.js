import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from 'src/shared/components/old/activity/LinesIndicator';

import { NotFound } from '../components/NotFound';
import { singleEpisodeIsFetchingStart } from '../../../Podcasts/Episode/actions/SingleEpisodeActions';

function mapStateToProps({
    SingleEpisodeReducer: {
        SingleEpisodeData: { isFetching, isFetched, episodeData },
    },
}) {
    return {
        isFetched,
        isFetching,
        episodeData,
    };
}
export default SingleEpisodeComponent =>
    withRouter(
        connect(
            mapStateToProps,
            { singleEpisodeIsFetchingStart },
        )(
            class SingleEpisodeContainer extends Component {
                componentDidMount() {
                    const guid = this.props.match.params.guid;
                    this.props.singleEpisodeIsFetchingStart(guid);
                }

                render() {
                    const { isFetching, isFetched, episodeData } = this.props;
                    return isFetching ? (
                        <Loading size={75} />
                    ) : isFetched ? (
                        <SingleEpisodeComponent {...episodeData} />
                    ) : (
                        <NotFound />
                    );
                }
            },
        ),
    );
