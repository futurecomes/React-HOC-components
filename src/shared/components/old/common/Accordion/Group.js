import React, { Component } from 'react'

import AnimateHeight from 'react-animate-height'
import ApiRecording from 'src/api/recording'
class AccordionGroup extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            isOpen: false,
            isSessionEdited: false,
            editedSession: null,
        }
    }

    sessionNameEditOpen(e) {
        this.setState(state => ({ ...state, isSessionEdited: true, editedSession: this.props.group }))
    }

    sessionNameEditClose(token) {
        return e => {
            if (e.currentTarget.value && !(e.currentTarget.value === this.state.editedSession.name)) {
                const editedSession = { id: this.state.editedSession.id, name: e.currentTarget.value }
                ApiRecording.updateSession(token, editedSession).then(this.props.fetch)
            }
            this.setState(state => ({ ...state, isSessionEdited: false, editedSession: null }))
        }
    }

    toggleOpen() {
        this.setState(state => ({ ...state, isOpen: !this.state.isOpen }))
    }

    render() {
        const { header, body } = this.props.render({
            isSessionEdited: this.state.isSessionEdited,
            sessionNameEditOpen: this.sessionNameEditOpen.bind(this),
            sessionNameEditClose: this.sessionNameEditClose.bind(this),
            isOpen: this.state.isOpen,
            toggleOpen: this.toggleOpen.bind(this),
            props: this.props.group,
        })
        return (
            <div>
                {header()}
                <AnimateHeight height={this.state.isOpen ? 'auto' : 0}>{body()}</AnimateHeight>
            </div>
        )
    }
}

export default AccordionGroup
