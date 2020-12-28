import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchInactiveVisualAds, downloadVisualAds, deleteInactiveVisualAds } from 'src/actions/old/admin'

function mapStateToProps({ admin: { inactiveVisualAds: { data, totalCount } } }) {
    return {
        ads: data,
        totalAds: totalCount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchInactiveVisualAds,
            downloadAds: downloadVisualAds,
            deleteAds: deleteInactiveVisualAds,
        },
        dispatch,
    )
}

const container = connect(mapStateToProps, mapDispatchToProps)

export default container
