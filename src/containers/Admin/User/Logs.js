import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUserLogs } from 'src/actions/old/admin';

function fetchAll(...args) {
    return fetchUserLogs(null, ...args);
}

function fetchLastWeek(...args) {
    const now = new Date();
    const lastWeek = now.setDate(now.getDate() - 7);
    return fetchUserLogs(lastWeek, ...args);
}

function fetchLastMonth(...args) {
    const now = new Date();
    const lastMonth = now.setMonth(now.getMonth() - 1);
    return fetchUserLogs(lastMonth, ...args);
}

function fetchLastYear(...args) {
    const now = new Date();
    const lastYear = now.setYear(now.getYear() - 1);
    return fetchUserLogs(lastYear, ...args);
}

function mapStateToProps({
    admin: {
        isFetching,
        userLogs: { data, totalCount, error },
    },
}) {
    return {
        isFetching,
        logs: data,
        totalLogs: totalCount,
        errorFetchingLogs: error,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetchLastWeek: fetchLastWeek.bind(null, props.userId),
            fetchLastMonth: fetchLastMonth.bind(null, props.userId),
            fetchLastYear: fetchLastYear.bind(null, props.userId),
            fetchAll: fetchAll.bind(null, props.userId),
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
