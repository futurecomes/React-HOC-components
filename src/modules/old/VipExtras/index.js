import React from 'react'
import { Route } from 'react-router-dom'
import { Elements } from 'react-stripe-elements'

import VipExtrasContainer from './containers'
import { OrderSummary } from './OrderSummary'
import { Cards } from './Cards'
import { PaymentPage } from './PaymentPage'
import * as S from './styled'

const addItemToBasket = item => state => ({
    basket: [...state.basket, item],
})

class VipExtras extends React.Component {
    state = {
        basket: this.props.basket,
    }

    componentDidMount() {
        this.props.resetVipExtrasState()
    }

    componentDidUpdate(prevProps) {
        if (this.props.basket !== prevProps.basket) {
            // eslint-disable-next-line
            this.setState({ basket: this.props.basket })
        }
    }

    addProductToBasket = item => this.setState(addItemToBasket(item))

    addSubscriptionToBasket = subscription => {
        const { basket } = this.state

        const planPattern = /^(basic|premium):\d+$/
        const subscriptionPattern = /-\d+/g
        const subscriptionType = subscription.id.replace(subscriptionPattern, '')

        const isPlan = planPattern.test(subscription.id)

        const subscriptionIndex = isPlan
            ? basket.findIndex(element => planPattern.test(element.id))
            : basket.findIndex(element => element.id.replace(subscriptionPattern, '') === subscriptionType)

        if (subscriptionIndex !== -1) {
            this.setState({
                basket: [
                    ...basket.slice(0, subscriptionIndex),
                    subscription,
                    ...basket.slice(subscriptionIndex + 1),
                ],
            })
        } else {
            this.setState(addItemToBasket(subscription))
        }
    }

    removeFromBasket = id => this.setState(state => ({ basket: state.basket.filter(item => item.id !== id) }))

    getElementsFromBasket = id => this.state.basket.find(item => item.id === id)

    calculateBasket = () => this.state.basket.reduce((acc, val) => acc + val.amount, 0)

    checkout = () => {
        window.scrollTo(0, 0)
        this.props.syncVipExtrasBasket(this.state.basket)
        this.props.history.push('/pricing/payment')
    }

    render() {
        const { basicSubscriptions, premiumSubscriptions, musicLibrarySongs } = this.props
        const sum = this.calculateBasket()
        const isCardPage = this.props.location.pathname === '/pricing'
        return (
            <div>
                <S.Wrapper>
                    <Route
                        exact
                        path="/pricing"
                        render={() => (
                            <Cards
                                basicSubscriptions={basicSubscriptions}
                                premiumSubscriptions={premiumSubscriptions}
                                embedPodcastSubscriptions={this.props.embedPodcastSubscriptions}
                                adRemovalSubscriptions={this.props.adRemovalSubscriptions}
                                musicLibrarySongs={musicLibrarySongs}
                                addProductToBasket={this.addProductToBasket}
                                addSubscriptionToBasket={this.addSubscriptionToBasket}
                                getElementsFromBasket={this.getElementsFromBasket}
                                currentUserPlan={this.props.currentUserPlan}
                                hasMusicLibraryAccess={this.props.hasMusicLibraryAccess}
                                adRemovalSubscription={this.props.adRemovalSubscription}
                                prices={this.props.prices}
                                embedPodcastSubscription={this.props.embedPodcastSubscription}
                            />
                        )}
                    />

                    <Route
                        path="/pricing/payment"
                        render={props => (
                            <Elements>
                                <PaymentPage
                                    {...props}
                                    sum={sum}
                                    basket={this.state.basket}
                                    vipExtrasPayment={this.props.vipExtrasPayment}
                                    isProcessingPayment={this.props.isProcessingPayment}
                                    paymentSucceeded={this.props.paymentSucceeded}
                                    resetVipExtrasState={this.props.resetVipExtrasState}
                                />
                            </Elements>
                        )}
                    />

                    {!this.props.isProcessingPayment && this.props.paymentSucceeded === null && (
                        <OrderSummary
                            removeFromBasket={this.removeFromBasket}
                            sum={sum}
                            basket={this.state.basket}
                            checkout={this.checkout}
                            showCheckout={sum > 0 && isCardPage}
                        />
                    )}
                </S.Wrapper>
            </div>
        )
    }
}

export default VipExtrasContainer(VipExtras)
