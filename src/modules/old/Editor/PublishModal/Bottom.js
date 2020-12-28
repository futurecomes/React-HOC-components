import React from 'react'
import { Redirect } from 'react-router-dom'

import Button from 'src/shared/components/old/interactive/Button'
import { css } from 'src/styles/old'

import styles from '../styles'

export const Bottom = props => (
    <React.Fragment>
        {props.isPublishing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>
                    {props.progress.message} {props.progress.percentage}%
                </span>
                <progress style={{ width: '100%' }} value={props.progress.percentage} max="100" />
            </div>
        )}
        {props.errorMessage && (
            <div className={css(styles.modalButtons, styles.error, styles.errorPanel)}>
                {props.errorMessage}
            </div>
        )}
        {props.selectedShow && props.selectedShow.isUsingDefaultArt && (
            <div className={css(styles.modalButtons, styles.error, styles.errorPanel)}>
                Whoops! Looks like you forgot to add show art. Save this episode draft, then go to My Podcasts
                and click on Edit Show to create or upload show art!
            </div>
        )}
        {props.touchedName && !props.episodeName && (
            <div className={css(styles.modalButtons, styles.error, styles.errorPanel)}>
                Whoops! It looks like you're trying to publish a podcast without an episode title.
            </div>
        )}
        <div className={css(styles.modalButtons)}>
            {!props.isPublishing && (
                <Button
                    isDisabled={
                        !props.selectedShow ||
                        !props.episodeName ||
                        !props.canPublish ||
                        props.selectedShow.isUsingDefaultArt
                    }
                    type="purple"
                    onClick={() => props.editorPublish(props.episodeName)}
                    test="publishEpisode"
                >
                    Publish
                </Button>
            )}

            {props.isPublishing && <Button type="purple">Publishing</Button>}
            <Button type="white" onClick={props.isPublishing ? null : props.closeModal} alternate>
                Keep Editing
            </Button>
            {props.didPublish && <Redirect to="/my-podcasts" />}
        </div>
    </React.Fragment>
)
