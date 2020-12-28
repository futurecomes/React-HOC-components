import React from 'react'

import { IconFont } from 'src/shared/components/old/IconFont'

import * as S from './styled'

export const OrderSummary = props => (
    <S.OrderSummary id="cart">
        <h3 css={{ textAlign: 'center', marginTop: 10 }}>Your Cart</h3>
        <div css={{ marginBottom: 10 }}>
            {props.basket.map(item => (
                <S.OrderItem key={item.id}>
                    <IconFont onClick={() => props.removeFromBasket(item.id)}>remove_circle</IconFont>
                    <span>{item.name}</span>
                    <span>${item.amount / 100}</span>
                </S.OrderItem>
            ))}
            {!props.basket.length && (
                <S.CartCopy>
                    Add one of the above services to this cart so you're on your way to becoming a VIP
                    Podcaster.
                </S.CartCopy>
            )}
        </div>
        <S.Checkout>
            {props.showCheckout && (
                <S.Button onClick={props.checkout} css={{ width: 150, borderRadius: 25, fontSize: 16 }}>
                    Checkout ${props.sum / 100}
                </S.Button>
            )}
        </S.Checkout>
    </S.OrderSummary>
)
