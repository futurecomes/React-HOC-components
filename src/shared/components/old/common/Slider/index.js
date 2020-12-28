import React, { Component } from 'react'

import InputRange from 'react-input-range'

import { css } from 'src/styles/old'
import styles from './styles'

class Slider extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            isHover: false,
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    componentDidMount() {
        this.slider.node.addEventListener('mouseenter', this.handleMouseEnter)
        this.slider.node.addEventListener('mouseleave', this.handleMouseLeave)
    }

    componentWillUnmount() {
        this.slider.node.removeEventListener('mouseenter', this.handleMouseEnter)
        this.slider.node.removeEventListener('mouseleave', this.handleMouseLeave)
    }

    handleMouseEnter() {
        this.setState({ isHover: true })
    }

    handleMouseLeave() {
        this.setState({ isHover: false })
    }

    render() {
        const { min, max, val, onChange, alt, disabled } = this.props
        const { isHover } = this.state

        return (
            <InputRange
                ref={ref => {
                    this.slider = ref
                }}
                maxValue={max}
                disabled={disabled}
                minValue={min}
                value={val}
                onChange={onChange}
                classNames={{
                    activeTrack: css(styles.activeTrack, alt && styles.altColor),
                    disabledInputRange: css(styles.activeTrack),
                    inputRange: css(styles.inputRange),
                    labelContainer: css(styles.labelContainer),
                    maxLabel: css(styles.label),
                    minLabel: css(styles.label),
                    slider: css(styles.slider, isHover && styles.activeSlider, alt && styles.altColor),
                    sliderContainer: css(styles.container),
                    track: css(styles.track),
                    valueLabel: css(styles.value),
                }}
            />
        )
    }
}

Slider.defaultProps = {
    min: 0,
    disabled: false,
    alt: false,
}

export default Slider
