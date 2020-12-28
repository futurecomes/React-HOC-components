import React, { Component } from 'react'

class OnHoverButton extends Component {
    constructor(...args) {
        super(...args)

        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter() {
        this.props.onHover(true)
    }

    onMouseLeave() {
        this.props.onHover(false)
    }

    render() {
        return (
            <button
                style={this.props.className === '' ? { backgroundColor: 'transparent', padding: 0 } : {}}
                className={this.props.className}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {this.props.children}
            </button>
        )
    }
}

OnHoverButton.defaultProps = {
    className: '',
    disabled: false,
}

export default OnHoverButton
