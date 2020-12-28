import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchInactiveFreeMusic, downloadFreeMusic, deleteInactiveFreeMusic } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        inactiveFreeMusic: { data, totalCount },
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
            fetch: fetchInactiveFreeMusic,
            downloadFreeMusic,
            deleteFreeMusic: deleteInactiveFreeMusic,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
