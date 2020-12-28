import React from 'react'
import { injectStripe } from 'react-stripe-elements'

import BillingAPI from 'src/api/billing'
import { PaymentForm } from 'src/shared/components/old/Billing/PaymentForm'
import { CircleTickMessage } from 'src/modules/old/StripeFinalize/CircleTickMessage'

import * as S from './styled'

export class UpdateCardFormContainer extends React.Component {
    state = {
        processing: false,
        success: null,
    }

    onCardUpdate = async e => {
        e.preventDefault()
        this.setState({ processing: true })
        const stripe = await this.props.stripe.createToken()
        if (stripe.error) {
            this.setState({ processing: false })
            return
        }
        try {
            const response = await BillingAPI.setDefaultCard(this.props.authToken, stripe.token.id)
            this.setState({ processing: false, success: true })
            this.props.updateBillingData({ last4: response.data.last4 })
        } catch (err) {
            this.setState({ success: false })
        }
    }

    render() {
        return (
            <S.FormWrapper>
                <h3>Update Billing Information: </h3>
                <div css={{ marginBottom: 20 }}>The current card is **** **** **** {this.props.last4}</div>
                {this.state.success === null && (
                    <PaymentForm
                        payButtonDisabled={this.state.processing}
                        isProcessingPayment={this.state.processing}
                        onSubmit={this.onCardUpdate}
                        payButtonText="Update"
                        formattedPrice=""
                    />
                )}
                {this.state.success && (
                    <CircleTickMessage message="Successfully updated Billing Information" />
                )}
                {this.state.success === false && (
                    <h3>Something went wrong with updating Billing Information</h3>
                )}
            </S.FormWrapper>
        )
    }
}

export const UpdateCardForm = injectStripe(UpdateCardFormContainer)
