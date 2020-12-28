import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAudioAdEpisodes } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        episodes: { data, totalCount },
    },
}) {
    return {
        episodes: data,
        totalEpisodes: totalCount,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchAudioAdEpisodes.bind(null, props.adId),
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
