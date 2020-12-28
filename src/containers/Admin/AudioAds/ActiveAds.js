import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchActiveAudioAds, downloadAudioAds, deleteActiveAudioAds } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        activeAudioAds: { data, totalCount },
    },
}) {
    return {
        ads: data,
        totalAds: totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchActiveAudioAds,
            downloadAds: downloadAudioAds,
            deleteAds: deleteActiveAudioAds,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
