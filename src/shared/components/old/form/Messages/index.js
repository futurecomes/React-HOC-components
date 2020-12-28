import React, { Component } from 'react'

import Scroll from 'react-scroll'

import FormMessagesContainer from 'src/containers/FormMessages'
import Error from './Error'
import Success from './Success'

import { css } from 'src/styles/old'
import styles from '../styles'

const ScrollElement = Scroll.Element
const scroller = Scroll.scroller

function listIsDifferent(first, second) {
    if (first.errors.length !== second.errors.length) {
        return true
    }

    if (first.errors.some((val, i) => val !== second.errors[i])) {
        return true
    }

    if (first.successes.length !== second.successes.length) {
        return true
    }

    if (first.successes.some((val, i) => val !== second.successes[i])) {
        return true
    }

    return false
}

const NAME = 'FormErrors'

class Errors extends Component {
    componentWillReceiveProps({ messages }) {
        if (listIsDifferent(messages, this.props.messages)) {
            scroller.scrollTo(NAME, {
                duration: 750,
                smooth: true,
                offset: -150,
                delay: 100,
            })
        }
    }

    componentWillUnmount() {
        this.props.clearMessages()
    }

    render() {
        const { messages, spaceBelow } = this.props

        return (
            (messages.errors.length > 0 || messages.successes.length > 0) && (
                <ScrollElement
                    name={NAME}
                    className={css(styles.column, styles.errorsWrapper, spaceBelow && styles.spaceBelow)}
                >
                    {messages.errors.map((error, i) => (
                        <Error key={`form-err-${i.toString()}`}>{error}</Error>
                    ))}

                    {messages.successes.map((success, i) => (
                        <Success key={`form-succ-${i.toString()}`}>{success}</Success>
                    ))}
                </ScrollElement>
            )
        )
    }
}

Errors.defaultProps = {
    spaceBelow: false,
}

export default FormMessagesContainer(Errors)
