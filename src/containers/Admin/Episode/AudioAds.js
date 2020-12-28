import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAudioAdsByEpisode } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        isFetching,
        audioAds: { data, totalCount },
    },
}) {
    return {
        isFetching,
        ads: data,
        totalAds: totalCount,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchAudioAdsByEpisode.bind(null, props.episodeId),
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
