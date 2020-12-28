import React from 'react'
import Modal from 'react-modal'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import Button from 'src/shared/components/old/interactive/Button'
import container from 'src/containers/editor/Publish'
import { modalStyles } from 'src/styles/old'

import styles from './styles'
import { PublishModal } from './PublishModal/PublishModal'

/* eslint-disable*/
class Publish extends React.Component {
    state = {
        isOpen: false,
        isToday: true,
        touchedName: false,
    }

    closeModal = () => {
        this.props.editorSetError(null)
        this.setState({ isOpen: false })
    }

    openModal = () => {
        this.setState({ isOpen: true })
    }

    select = showName => {
        const show = this.props.shows.find(show => show.title === showName)
        this.props.selectShow(show.id)
    }

    onReleaseChange = e => this.props.onReleaseChange(e.target.name)

    onDateChange = date => {
        const isToday = moment().dayOfYear() === date.dayOfYear()
        const isDisabledTime = date.valueOf() < moment().valueOf()

        this.setState({ isToday })

        this.props.onDateChange(isToday && isDisabledTime ? moment() : date)
    }

    onNameBlur = () => this.setState({ touchedName: true })

    render() {
        const { shows, showIdx, canPublish } = this.props
        const selectedShow = shows.find(show => show.id === showIdx)

        return (
            <div>
                <Button
                    type="purple"
                    style={styles.button}
                    onClick={this.openModal}
                    isDisabled={!canPublish}
                    test="publish"
                >
                    Publish
                </Button>
                <Modal isOpen={this.state.isOpen} style={modalStyles} contentLabel="publishepisode">
                    <PublishModal
                        {...this.props}
                        isToday={this.state.isToday}
                        touchedName={this.state.touchedName}
                        onNameBlur={this.onNameBlur}
                        onDateChange={this.onDateChange}
                        onReleaseChange={this.onReleaseChange}
                        select={this.select}
                        closeModal={this.closeModal}
                        selectedShow={selectedShow}
                    />
                </Modal>
            </div>
        )
    }
}

export default container(Publish)
