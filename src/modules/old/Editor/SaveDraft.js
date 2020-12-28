import React from 'react'
import Modal from 'react-modal'

import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import Dropdown from 'src/shared/components/old/form/DropdownFormless'
import Button from 'src/shared/components/old/interactive/Button'
import container from 'src/containers/editor/SaveDraft'
import { css, modalStyles } from 'src/styles/old'

import styles from './styles'

class SaveDraft extends React.Component {
    toggleModal = state => {
        if (this.props.draftId) {
            this.props.editorUpdateDraft(this.props.draftId)
            return
        }
        this.props.toggleDraftModal(state)
    }

    select = showName => {
        const selectedShow = this.props.shows.find(show => show.title === showName)
        this.props.selectShow(selectedShow.id)
    }

    render() {
        const {
            editorSaveDraft,
            shows,
            canPublish,
            isSaveDraftOpen,
            isUploading,
            showIdx,
            draftId,
            isDraftSaved,
        } = this.props
        const selectedShow = shows.find(show => show.id === showIdx)

        return (
            <div>
                <Button
                    type={!draftId || !isDraftSaved ? 'blue' : 'gray'}
                    isDisabled={!canPublish}
                    style={styles.button}
                    onClick={() => this.toggleModal(true)}
                >
                    {this.props.draftId ? 'Save' : 'Save for Later'}
                </Button>
                <Modal isOpen={isSaveDraftOpen} style={modalStyles} contentLabel="savedraft">
                    <div className={css(styles.modalPadding)}>
                        <div className={css(styles.modalTop)}>
                            <h2 className={css(styles.blueTitle)}>Save for Later</h2>
                        </div>
                        <div className={css(styles.form)}>
                            <Dropdown
                                label="Show to Save Draft Under"
                                placeholder="Select Show"
                                values={shows.map(show => show.title)}
                                value={selectedShow ? selectedShow.title : null}
                                onChange={this.select}
                            />
                        </div>
                        <div className={css(styles.modalContent)}>
                            <p className={css(styles.paragraph)}>
                                Done for now? You can pick up where you left off or publish from the My
                                Podcast section.
                            </p>
                            <br />
                            <div className={css(styles.modalButtons)}>
                                <Button
                                    type="blue"
                                    onClick={() => editorSaveDraft()}
                                    isDisabled={!selectedShow || !canPublish}
                                >
                                    Save for Later
                                    {isUploading && <EllipsesIndicator />}
                                </Button>
                                <Button type="white" onClick={() => this.toggleModal(false)} alternate>
                                    Keep Editing
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default container(SaveDraft)
