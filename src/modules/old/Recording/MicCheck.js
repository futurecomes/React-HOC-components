import React from 'react'
import Modal from 'react-modal'
import _noop from 'lodash/noop'

import closeSrc from 'src/shared/components/old/shared/static/svg/close.svg'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import Button from 'src/shared/components/old/interactive/Button'
import Link from 'src/shared/components/old/interactive/Link'
import container from 'src/containers/Recording/MicCheck'
import { css, modalStyles } from 'src/styles/old'

import styles from './styles'

const MicCheck = ({ isOpen, close, devices, handleSubmit, isPermissionDenied }) => (
    <Modal
        isOpen={isOpen}
        shouldCloseOnEsc={!isPermissionDenied}
        shouldCloseOnOverlayClick={!isPermissionDenied}
        onRequestClose={!isPermissionDenied ? close : _noop}
        style={modalStyles}
        contentLabel="miccheck"
    >
        <div className={css(styles.modalPadding)}>
            <div className={css(styles.topRow)}>
                <h2 className={css(styles.blueTitle)}>Mic Check</h2>
                <button onClick={!isPermissionDenied ? close : _noop} className={css(styles.trash)}>
                    <img src={closeSrc} alt="Close Mic Check" />
                </button>
            </div>
            <span className={css(styles.info)}>
                This is checking what microphone Messy's recorder is using. Default is fine – that's your
                computer's built-in microphone. (If a pop-up appeared asking you if it's okay to let the site
                to use your microphone, you'll want to click "allow" If you accidently clicked "don't allow",
                go into your browser's setting and update to allow microphone access). If you’d like to use an
                external microphone like a Blue Yeti, you will select that instead from the drop-down menu.
            </span>
            <form onSubmit={handleSubmit} className={css(styles.form)}>
                <Dropdown
                    name="deviceId"
                    label="Microphone"
                    placeholder="Searching for devices..."
                    values={devices}
                />
                {isPermissionDenied && (
                    <span className={css(styles.info)}>
                        Either your microphone is not connected, or your browser has not been granted
                        permission to use it. Try clearing your browser audio permissions for Messy and
                        refreshing the app, or use a different browser.
                    </span>
                )}
                <div className={css(styles.buttonWrapper)}>
                    {isPermissionDenied ? (
                        <Link type="red" style={styles.button} to="/my-podcasts">
                            Back to My Podcasts
                        </Link>
                    ) : (
                        <Button isSubmit type="blue">
                            Looks Good
                        </Button>
                    )}
                </div>
            </form>
        </div>
    </Modal>
)

export default container(MicCheck)
