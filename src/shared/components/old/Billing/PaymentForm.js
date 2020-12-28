import React from 'react'
import { CardElement } from 'react-stripe-elements'
import Spinner from 'react-svg-spinner'
import _noop from 'lodash/noop'

import * as S from './styled'

export const PaymentForm = props => (
    <form css={{ width: '100%' }} onSubmit={props.onSubmit}>
        <div>
            <span>Card details</span>
            <CardElement onChange={props.onChange || _noop} />
            <S.Error>{props.paymentError}</S.Error>
        </div>
        {props.isProcessingPayment && (
            <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <Spinner speed="fast" size="32px" />
            </div>
        )}
        <S.PayButton disabled={props.payButtonDisabled}>
            {props.payButtonText || 'Pay'}{' '}
            {props.formattedPrice !== undefined ? props.formattedPrice : `$${props.price}`}
        </S.PayButton>
    </form>
)
