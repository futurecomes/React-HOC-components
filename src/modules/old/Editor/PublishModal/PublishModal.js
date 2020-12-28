import React from 'react'

import Button from 'src/shared/components/old/interactive/Button'
import { css } from 'src/styles/old'

import { Bottom } from './Bottom'
import styles from '../styles'
import { Top } from './Top'

export class PublishModal extends React.Component {
    state = {
        showWarning: this.props.isEpisodeTooShort,
    }

    closeWarning = () => this.setState({ showWarning: false })

    render() {
        return (
            <div className={css(styles.modalPadding)}>
                {this.state.showWarning ? (
                    <div>
                        <p css={{ textAlign: 'center' }}>
                            Hello! It looks like you are trying a podcast shorter than 60 seconds. Are you
                            sure you want to continue?
                        </p>
                        <div css={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button type="white" onClick={this.closeWarning} alternate>
                                Yes
                            </Button>
                            <Button type="white" onClick={this.props.closeModal} alternate>
                                Keep Editing
                            </Button>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        {' '}
                        <div className={css(styles.modalTop)}>
                            <h2 className={css(styles.blueTitle)}>Publish Episode</h2>
                        </div>
                        <div className={css(styles.modalContent)}>
                            <Top
                                setEpisodeName={this.props.setEpisodeName}
                                episodeName={this.props.episodeName}
                                onNameBlur={this.props.onNameBlur}
                                setEpisodeDescription={this.props.setEpisodeDescription}
                                episodeDescription={this.props.episodeDescription}
                                onReleaseChange={this.props.onReleaseChange}
                                release={this.props.release}
                                isToday={this.props.isToday}
                                releaseDate={this.props.releaseDate}
                                onDateChange={this.props.onDateChange}
                                shows={this.props.shows}
                                selectedShow={this.props.selectedShow}
                                select={this.props.select}
                            />
                            <Bottom
                                isPublishing={this.props.isPublishing}
                                progress={this.props.progress}
                                errorMessage={this.props.errorMessage}
                                selectedShow={this.props.selectedShow}
                                touchedName={this.props.touchedName}
                                episodeName={this.props.episodeName}
                                editorPublish={this.props.editorPublish}
                                didPublish={this.props.didPublish}
                                canPublish={this.props.canPublish}
                                closeModal={this.props.closeModal}
                            />
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}
