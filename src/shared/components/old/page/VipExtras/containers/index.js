import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchSubscriptions } from 'src/shared/components/old/Billing/actions'
import { fetchFreeMusic } from 'src/actions/old/recording'
import * as selectors from '../selectors'
import { VipExtras } from '../index'
import { TextHeader } from 'src/shared/components/old/shared/TextHeader'
import { GradientStrip } from 'src/shared/components/old/shared/GradientStrip'
import { fetchExtrasDetails, syncVipExtrasBasket, vipExtrasPayment, resetVipExtrasState } from '../actions'

class VipExtrasContainer extends React.Component {
    componentDidMount() {
        this.props.fetchSubscriptions()
        this.props.fetchFreeMusic()
        this.props.fetchExtrasDetails()
    }

    render() {
        return (
            <React.Fragment>
                <GradientStrip>
                    <TextHeader css={{ fontSize: 28, padding: 50 }}>
                        Recording, Editing, & Publishing Your Podcast Is Free With Unlimited Bandwidth Here at
                        Messy.
                    </TextHeader>{' '}
                    <TextHeader css={{ fontSize: 28, paddingTop: 0, paddingBottom: 50 }}>
                        Want More? Look Below At Our Paid Features
                    </TextHeader>
                </GradientStrip>
                <VipExtras {...this.props} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    premiumSubscriptions: selectors.getPremiumSubscriptions(state),
    basicSubscriptions: selectors.getBasicSubscriptions(state),
    embedPodcastSubscriptions: selectors.getEmbedPodcastSubscriptions(state),
    adRemovalSubscriptions: selectors.getAdRemovalSubscriptions(state),
    musicLibrarySongs: selectors.getMusicLibrary(state),
    isAuthenticated: selectors.isAuthenticated(state),
    currentUserPlan: selectors.getCurrentUserPlan(state),
    hasMusicLibraryAccess: selectors.hasMusicLibraryAccess(state),
    adRemovalSubscription: selectors.adRemovalSubscription(state),
    isProcessingPayment: state.billing.vipExtras.isProcessingPayment,
    paymentSucceeded: state.billing.vipExtras.paymentSucceeded,
    embedPodcastSubscription: selectors.embedPodcastSubscription(state),
    prices: selectors.getVipExtrasPrices(state),
    basket: selectors.getBasket(state),
})

export default withRouter(
    connect(
        mapStateToProps,
        {
            fetchSubscriptions,
            fetchFreeMusic,
            fetchExtrasDetails,
            syncVipExtrasBasket,
            vipExtrasPayment,
            resetVipExtrasState,
        },
    )(VipExtrasContainer),
)
