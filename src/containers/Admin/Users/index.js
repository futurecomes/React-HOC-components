import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUsers, downloadUsers, deleteUsers } from 'src/actions/old/admin'

function mapStateToProps({ admin: { users: { data, totalCount } } }) {
    return {
        users: data,
        totalUsers: totalCount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchUsers,
            downloadUsers,
            deleteUsers,
        },
        dispatch,
    )
}

const container = connect(mapStateToProps, mapDispatchToProps)

export default container
