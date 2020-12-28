import React, { Component } from 'react'

import Container from 'src/containers/common/Table/Bars/ActionBar'

import Dropdown from 'src/shared/components/old/form/Dropdown'

import Button from 'src/shared/components/old/interactive/Button'

import { css } from 'src/styles/old'
import styles from './styles'

class ActionBar extends Component {
    constructor(props) {
        super(props)

        this.handleActionSubmit = this.handleActionSubmit.bind(this)
    }

    handleActionSubmit(form) {
        const action = form.action ? form.action.toLowerCase() : ''

        this.props.handleAction(action)
    }

    render() {
        const { actions, handleSubmit } = this.props

        const values = Object.keys(actions).map(actionKey => ({
            text: actions[actionKey].text,
            value: actionKey,
        }))

        return (
            <div className={css(styles.actionBar)}>
                <form onSubmit={handleSubmit(this.handleActionSubmit)}>
                    <div className={css(styles.actionDropdownContainer)}>
                        <Dropdown name="action" label="" placeholder="Action" values={values} />
                    </div>

                    <Button isSubmit type="blue" style={styles.submit}>
                        Perform
                    </Button>
                </form>
            </div>
        )
    }
}

export default Container(ActionBar)
