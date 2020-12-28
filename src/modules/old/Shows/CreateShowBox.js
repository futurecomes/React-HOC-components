import React from 'react'

import { css } from 'src/styles/old'

import CreateShow from './Create'
import styles from './styles'

export function CreateShowBox(props) {
    return (
        <div className={css(styles.card)}>
            <div className={css(styles.cardSection)}>
                <h1 className={css(styles.bigTitle)}>{props.title}</h1>
            </div>

            {props.noShows && (
                <p className={css(styles.cardText)}>
                    {`
            This is where the podcasts you make will appear.
            So if you're ready to Get Messy, click Create Show.
        `}
                </p>
            )}

            <div className={css(styles.cardSection, styles.bottom)}>
                <CreateShow buttonStyle={styles.cardButton} />
            </div>
        </div>
    )
}
