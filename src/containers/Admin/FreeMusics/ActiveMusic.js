import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchActiveFreeMusic, downloadFreeMusic, deleteActiveFreeMusic } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        activeFreeMusic: { data, totalCount },
    },
}) {
    return {
        freeMusic: data,
        totalFreeMusic: totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchActiveFreeMusic,
            downloadFreeMusic,
            deleteFreeMusic: deleteActiveFreeMusic,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
