import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchShows, downloadShows, deleteShows } from 'src/actions/old/admin'
import { adminEditShow } from 'src/modules/old/Admin/actions'

function mapStateToProps({
    admin: {
        shows: { data, totalCount },
    },
}) {
    return {
        shows: data,
        totalShows: totalCount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchShows,
            downloadShows,
            deleteShows,
            adminEditShow,
        },
        dispatch,
    )
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
)

export default container
