import React from 'react'

import { IconFont } from 'src/shared/components/old/IconFont'

import * as S from './styled'

const intervalTime = {
    0: 'One Month',
    1: 'Six Months',
    2: '12 Months',
}

export class Card extends React.Component {
    state = {
        isCardOpen: false,
    }
    toggleCard() {
        this.setState({
            isCardOpen: !this.state.isCardOpen,
        })
    }
    calculateMinPrice() {
        return this.props.options
            ? Math.min(...this.props.options.map(option => option.amount / 100))
            : this.props.item.amount / 100
    }
    render() {
        return (
            <S.TileWrapper isOpen={this.state.isCardOpen} onClick={this.toggleCard.bind(this)}>
                <S.TextIconWrapper>
                    <S.IconWrapper>
                        <img
                            src={this.props.icon}
                            css={{ maxWidth: this.props.bigicon ? 60 : 50 }}
                            height={50}
                            alt="graphic"
                        />
                    </S.IconWrapper>
                    <div>
                        <S.Text selected={this.props.selected}>
                            {this.props.product}
                            <IconFont color="#bababa">
                                {this.state.isCardOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                            </IconFont>
                        </S.Text>

                        <S.DescriptionText display={this.state.isCardOpen ? 'block' : 'none'}>
                            {this.props.description && (
                                <p css={{ fontSize: 14, textAlign: 'justify' }}>{this.props.description}</p>
                            )}
                            {this.props.smallText && <p css={{ fontSize: 13 }}>{this.props.smallText}</p>}
                        </S.DescriptionText>
                    </div>
                </S.TextIconWrapper>
                {this.state.isCardOpen ? (
                    this.props.options ? (
                        <div>
                            {this.props.options.map((option, i) => (
                                <S.Option key={option.name}>
                                    <span>{intervalTime[i]} </span>
                                    <S.Button
                                        disabled={this.props.checkIfDisabled(option)}
                                        onClick={() => this.props.addSubscriptionToBasket(option)}
                                    >
                                        ${option.amount / 100}
                                    </S.Button>
                                </S.Option>
                            ))}
                        </div>
                    ) : (
                        <S.SingleButtonWrapper>
                            <S.Button
                                disabled={this.props.disabled}
                                onClick={() => this.props.addProductToBasket(this.props.item)}
                            >
                                ${this.props.item.amount / 100}
                            </S.Button>
                        </S.SingleButtonWrapper>
                    )
                ) : this.calculateMinPrice() === Infinity || isNaN(this.calculateMinPrice()) ? (
                    <></>
                ) : (
                    <S.PriceStartsAt>Prices Start at ${this.calculateMinPrice()}</S.PriceStartsAt>
                )}
            </S.TileWrapper>
        )
    }
}
