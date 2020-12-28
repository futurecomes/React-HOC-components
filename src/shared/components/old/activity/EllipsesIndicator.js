import React, { Component } from 'react'

const ellipses = '...'

class EllipsesIndicator extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            count: 1,
            delta: 1,
        }

        this.interval = null
        this.setContent = this.setContent.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval(this.setContent, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    setContent() {
        const { count, delta } = this.state
        let newDelta = delta

        if (count === 3) {
            newDelta = -1
        } else if (count === 0) {
            newDelta = 1
        }

        this.setState({
            count: count + newDelta,
            delta: newDelta,
        })
    }

    render() {
        return <span>{ellipses.substring(0, this.state.count)}</span>
    }
}

export default EllipsesIndicator
