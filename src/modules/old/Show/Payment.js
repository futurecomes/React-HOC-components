import React from 'react'
import { injectStripe } from 'react-stripe-elements'
import NumberFormat from 'react-number-format'
import Spinner from 'react-svg-spinner'
import _throttle from 'lodash/throttle'

import ShowAPI from 'src/api/shows'
import { PaymentForm } from 'src/shared/components/old/Billing/PaymentForm'

import * as S from './styled'
import { CircleTickMessage } from '../StripeFinalize/CircleTickMessage'

export class SupportShowFormContainer extends React.Component {
    state = {
        amount: '5',
        formattedAmount: '$5',
        loading: false,
        success: null,
        monthly: false,
    }

    supportShow = _throttle(
        async () => {
            const { token, showId, stripe } = this.props
            const { amount, monthly } = this.state
            const response = await stripe.createToken()
            if (!response.token) {
                return
            }
            this.setState({ loading: true })
            try {
                await ShowAPI.support(token, {
                    stripeToken: response.token.id,
                    show: showId,
                    amount: Number(amount) * 100,
                    monthly,
                })
                if (monthly) {
                    this.props.fetchCurrentPlan()
                }
                this.setState({ success: true })
            } catch (err) {
                this.setState({ success: false })
            }
            this.setState({ loading: false })
        },
        2000,
        { trailing: false },
    )

    onSubmit = async e => {
        e.preventDefault()
        await this.supportShow()
    }

    onAmountChange = values => {
        this.setState({ amount: values.value, formattedAmount: values.formattedValue })
    }

    render() {
        const { loading, success, amount } = this.state

        const isInvalid = Number(amount) < 3
        const showForm = !loading && success === null

        return (
            <S.PaymentFormWrapper finalized={success}>
                {loading && (
                    <div css={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner size="32px" speed="fast" />
                    </div>
                )}
                {showForm && (
                    <React.Fragment>
                        <div css={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span css={{ marginRight: 5 }}>Specify the level of support (USD): </span>
                            <NumberFormat
                                allowNegative={false}
                                css={{ padding: '5px 10px 5px 3px', boxShadow: 'rgba(50,50,93,0.14902) 0px 1px 3px, rgba(0,0,0,0.0196078) 0px 1px 0px', border: '0px', outline: '0px',  }}
                                onValueChange={this.onAmountChange}
                                value={amount}
                                isNumericString
                                thousandSeparator
                                prefix={'$'}
                                decimalScale={2}
                                isAllowed={values => Number(values.value) <= 10000}
                            />
                        </div>
                        {this.props.isAuth && (
                            <div css={{ display: 'flex', alignItems: 'center' }}>
                                <label htmlFor="monthly">Check this box to make your support monthly</label>
                                <input
                                    css={{ height: 15, margin: 'auto 10px' }}
                                    type="checkbox"
                                    id="monthly"
                                    checked={this.state.monthly}
                                    onChange={() => this.setState(state => ({ monthly: !state.monthly }))}
                                />
                            </div>
                        )}
                        {isInvalid && <p css={{ color: 'tomato' }}>Minimal level of support is $3</p>}
                        <PaymentForm
                            payButtonText="Support"
                            onSubmit={this.onSubmit}
                            formattedPrice={this.state.formattedAmount}
                            payButtonDisabled={isInvalid}
                        />
                    </React.Fragment>
                )}
                {success && <CircleTickMessage message="Thank you for the support!" />}
                {success === false && <p css={{ textAlign: 'center' }}>Ooops, something went wrong</p>}
            </S.PaymentFormWrapper>
        )
    }
}

export const SupportShowForm = injectStripe(SupportShowFormContainer)
