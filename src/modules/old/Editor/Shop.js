import React from 'react'
import { injectStripe } from 'react-stripe-elements'

import { IconFont } from 'src/shared/components/old/IconFont'
import { PaymentForm } from 'src/shared/components/old/Billing/PaymentForm'

import * as S from './styled'

class Shop extends React.Component {
    onSubmit = async e => {
        e.preventDefault()
        if (this.props.isProcessingPayment) {
            return
        }
        this.props.startMusicLibraryPaymentLoader()
        const response = await this.props.stripe.createToken()
        if (response.error) {
            this.props.setMusicLibraryPaymentError(response.error.message)
            return
        }
        if (this.props.musicLibraryInBasket) {
            this.props.buyMusicLibraryTotalAccess(response)
        } else {
            this.props.buyMusicItems(response)
        }
    }

    render() {
        const { itemsInBasket, removeMusicItemFromBasket, paymentError, isProcessingPayment } = this.props
        const price = this.props.musicLibraryInBasket ? 20 : itemsInBasket.length * 5
        return (
            <S.Shop>
                <PaymentForm
                    paymentError={paymentError}
                    price={price}
                    isProcessingPayment={isProcessingPayment}
                    onChange={() => this.props.setMusicLibraryPaymentError('')}
                    onSubmit={this.onSubmit}
                />

                <div css={{ margin: '25px 0 0 20px' }}>
                    {itemsInBasket.map(item => (
                        <S.ItemInBasket key={item.id}>
                            <span>{item.name}</span>{' '}
                            <IconFont
                                onClick={() => !isProcessingPayment && removeMusicItemFromBasket(item.id)}
                            >
                                remove_shopping_cart
                            </IconFont>
                        </S.ItemInBasket>
                    ))}
                    {this.props.musicLibraryInBasket && (
                        <S.ItemInBasket>
                            <span>Music Library</span>{' '}
                            <IconFont onClick={this.props.removeMusicLibraryFromBasket}>
                                remove_shopping_cart
                            </IconFont>
                        </S.ItemInBasket>
                    )}
                </div>
            </S.Shop>
        )
    }
}

export const ShopWithStripe = injectStripe(Shop)
