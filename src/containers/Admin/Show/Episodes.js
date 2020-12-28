import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchEpisodes, downloadEpisodes, deleteEpisodes } from 'src/actions/old/admin'

function mapStateToProps({ admin: { isFetching, episodes: { data, totalCount } } }) {
    return {
        isFetching,
        episodes: data,
        totalEpisodes: totalCount,
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchEpisodes.bind(null, props.showId),
            downloadEpisodes,
            deleteEpisodes,
        },
        dispatch,
    )
}

const container = connect(mapStateToProps, mapDispatchToProps)

export default container
