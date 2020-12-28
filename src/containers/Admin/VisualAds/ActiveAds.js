import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchActiveVisualAds, downloadVisualAds, deleteActiveVisualAds } from 'src/actions/old/admin'

function mapStateToProps({ admin: { activeVisualAds: { data, totalCount } } }) {
    return {
        ads: data,
        totalAds: totalCount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchActiveVisualAds,
            downloadAds: downloadVisualAds,
            deleteAds: deleteActiveVisualAds,
        },
        dispatch,
    )
}

const container = connect(mapStateToProps, mapDispatchToProps)

export default container
