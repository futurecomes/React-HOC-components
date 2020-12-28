import React from 'react'

import { PaymentForm } from 'src/shared/components/old/Billing/PaymentForm'
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner'
import { CircleTickMessage } from 'src/modules/old/StripeFinalize/CircleTickMessage'

export const ShowPayment = props => (
    <React.Fragment>
        {props.success === null && !props.isLoading && (
            <React.Fragment>
                <h4 css={{ fontWeight: 500 }}>{props.description}</h4>
                {props.actionElement}
                <PaymentForm
                    payButtonDisabled={props.payButtonDisabled}
                    payButtonText={props.payButtonText}
                    onSubmit={props.onSubmit}
                    price={props.price}
                />
            </React.Fragment>
        )}
        {props.isLoading && <CenteredSpinner />}
        {props.success && <CircleTickMessage message={props.message} />}
    </React.Fragment>
)
