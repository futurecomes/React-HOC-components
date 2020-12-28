import React from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-svg-spinner'
import _throttle from 'lodash/throttle'

import BillingAPI from 'src/api/billing'

import { RegisterStripe } from './RegisterStripe'
import * as S from './styled'

export class BillingContainer extends React.Component {
    state = {
        loading: false,
        errorLink: false,
    }

    loginToStripe = async () => {
        this.setState({ loading: true })
        try {
            const { url } = await BillingAPI.createExpressLink(this.props.token)
            window.open(url, '_blank')
        } catch (error) {
            this.setState({ errorLink: true })
        }
        this.setState({ loading: false })
    }

    throttledLoginToStripe = _throttle(this.loginToStripe, 3000, { trailing: false })

    render() {
        return (
            <S.Container>
                {this.props.hasExpressAccount ? (
                    <React.Fragment>
                        {this.state.errorLink && <S.Title>Something went wrong</S.Title>}
                        <S.Title>Login to your Stripe account to check your Listener Support balance.</S.Title>
                        <S.StripeLink onClick={this.throttledLoginToStripe} rel="noopener noreferrer">
                            {this.state.loading ? (
                                <Spinner color="white" size="16px" speed="fast" />
                            ) : (
                                'Login'
                            )}
                        </S.StripeLink>
                    </React.Fragment>
                ) : (
                    <RegisterStripe />
                )}
                <S.Processing>
                    The processing fee is 8.9% + 30¢ for each Listener Support.
                </S.Processing>
            </S.Container>
        )
    }
}

export const Billing = connect(state => ({
    token: state.auth.token,
    hasExpressAccount: !!state.auth.user.stripeExpressAccount,
}))(BillingContainer)
