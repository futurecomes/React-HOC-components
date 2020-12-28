import React, { Component } from 'react'

import * as S from './styled'

export class SpinningWheel extends Component {
    state = {
        degree: Math.floor(Math.random() * 360) + 1,
    }

    isRolling = false

    onSpinEnd = () => {
        this.isRolling = false
        clearInterval(this.spinProgress)
        this.props.onSpinEnd()
    }

    roll = () => {
        if (this.isRolling) {
            return
        }
        this.isRolling = true
        const extraDegree = Math.floor(Math.random() * 360) + 1
        const totalDegree = this.state.degree + extraDegree + 1800
        this.setState({ degree: totalDegree })
        this.props.onSpinProgress()
        this.spinProgress = setInterval(this.props.onSpinProgress, this.props.spinProgressTime || 200)
        this.rollTimeout = setTimeout(this.onSpinEnd, this.props.spinTime)
    }

    componentWillUnmount() {
        clearTimeout(this.rollTimeout)
    }

    render() {
        const { colors } = this.props
        const sliceAngle = 360 / colors.length
        const skewSlice = 90 - sliceAngle

        return (
            <S.Wheel>
                <S.InnerWheel
                    style={{ transform: `rotate(${this.state.degree}deg)` }}
                    time={this.props.spinTime / 1000}
                >
                    {colors.map((color, index) => (
                        <S.CirclePart
                            key={color}
                            rotate={sliceAngle * (index + 1)}
                            color={color}
                            skewSlice={skewSlice}
                        />
                    ))}
                </S.InnerWheel>
                <S.Spin onClick={this.roll}>
                    <S.InnerSpin />
                </S.Spin>
            </S.Wheel>
        )
    }
}
