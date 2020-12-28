import React, { Component } from 'react'

import Link from 'src/shared/components/old/interactive/Link'
import Button from 'src/shared/components/old/interactive/Button'
import container from 'src/containers/Recording'
import { css } from 'src/styles/old'

import Session from './Session'
import { SessionsTable } from './SessionsTable'
import { SessionModal } from './SessionModal'
import backSrc from './static/svg/back.svg'
import styles from './styles'

class Recording extends Component {
    state = {
        isModalOpen: false,
        sessionName: '',
        takeName: '',
        errors: {
            sessionName: false,
            takeName: false,
        },
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    endSession = () => {
        if (this.props.isRecording) {
            return
        }
        this.props.closeSession()
        this.setState({ sessionName: '', takeName: '', errors: { sessionName: false, takeName: false } })
    }

    openModal = () => {
        this.setState({ isModalOpen: true, sessionName: '', takeName: '' })
    }

    setErrors = () => {
        this.setState(state => ({
            errors: {
                sessionName: !state.sessionName,
                takeName: !state.takeName,
            },
        }))
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }

    render() {
        const { sessions, openSession, deleteSession, toggleMicCheck, fetchSessions } = this.props

        const isSession = !!this.props.match.params.id

        return (
            <div>
                {isSession ? (
                    <div className={css(styles.topRow)}>
                        <Link
                            type="white"
                            icon={backSrc}
                            style={styles.button}
                            to="/create/record"
                            onClick={this.endSession}
                        >
                            Recordings
                        </Link>
                        <div className={css(styles.rightRow)}>
                            <Button onClick={toggleMicCheck} alternate>
                                Mic Check
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={css(styles.topRow)}>
                        <h1 className={css(styles.blueTitle)}>My Recordings</h1>
                        <Button type="blue" style={styles.button} onClick={this.openModal}>
                            New Recording Session
                        </Button>
                    </div>
                )}

                <SessionModal
                    onChange={this.onChange}
                    takeName={this.state.takeName}
                    sessionName={this.state.sessionName}
                    openSession={openSession}
                    isModalOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    errors={this.state.errors}
                    setErrors={this.setErrors}
                    setRecordingName={this.props.setRecordingName}
                />

                {isSession ? (
                    <React.Fragment>
                        <Session />
                        <div className={css(styles.infoWrapper)}>
                            <span className={css(styles.info)}>
                                {"Tip: Once you're done recording head over to "}
                                <Link to="#editor" style={styles.info}>
                                    {'Editor & Publisher'}
                                </Link>
                            </span>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <SessionsTable
                            sessions={sessions}
                            openSession={openSession}
                            deleteSession={deleteSession}
                            fetchSessions={fetchSessions}
                        />
                        <div className={css(styles.infoWrapper)}>
                            <span className={css(styles.info, styles.infoBold)}>
                                {"What's a Recording Session?"}
                            </span>
                            <span className={css(styles.info)}>
                                It’s hard to get everything in one take, so we combine recordings to make it
                                easier to manage.
                            </span>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

export default container(Recording)
