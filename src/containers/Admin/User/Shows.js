import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUserShows, downloadShows, deleteShows } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        isFetching,
        shows: { data, totalCount },
    },
}) {
    return {
        isFetching,
        shows: data,
        totalShows: totalCount,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchUserShows.bind(null, props.userId),
            downloadShows,
            deleteShows,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
