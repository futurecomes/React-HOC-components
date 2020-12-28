import React from 'react'
import Modal from 'react-modal'

import Link from 'src/shared/components/old/interactive/Link'
import { css, modalStyles } from 'src/styles/old'

import styles from './styles'

const NoRecording = ({ isOpen, close }) => (
    <Modal isOpen={isOpen} onRequestClose={close} style={modalStyles} contentLabel="norecording">
        <div className={css(styles.modalPadding)}>
            <div className={css(styles.topRow)}>
                <h2 className={css(styles.blueTitle)}>No Recording on mobile devices</h2>
            </div>
            <span className={css(styles.info)}>
                {"Recording is disabled on mobile devices, if you'd to record " +
                    'a session, you should visit this site with a desktop browser.'}
            </span>
            <div className={css(styles.buttonWrapper)}>
                <Link type="red" style={styles.button} to="/my-podcasts">
                    Back to My Podcasts
                </Link>
            </div>
        </div>
    </Modal>
)

export default NoRecording
