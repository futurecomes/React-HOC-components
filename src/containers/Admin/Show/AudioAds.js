import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAudioAdsByShow } from 'src/actions/old/admin';

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
            fetch: fetchAudioAdsByShow.bind(null, props.showId),
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
