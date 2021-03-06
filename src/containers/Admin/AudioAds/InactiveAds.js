import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchInactiveAudioAds, downloadAudioAds, deleteInactiveAudioAds } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        inactiveAudioAds: { data, totalCount },
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
            fetch: fetchInactiveAudioAds,
            downloadAds: downloadAudioAds,
            deleteAds: deleteInactiveAudioAds,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
