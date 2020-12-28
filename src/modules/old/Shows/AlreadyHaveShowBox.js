import React from 'react'

import { css } from 'src/styles/old'

import ImportShow from './Import'
import styles from './styles'

export function AlreadyHaveShowBox() {
    return (
        <div className={css(styles.card)}>
            <div className={css(styles.cardSection)}>
                <h1 className={css(styles.bigTitle)}>Already Have a Show?</h1>
                <p className={css(styles.cardText)}>
                    {`
                    If you want to keep hosting your podcast somewhere else but want
                    to add it to the Messy network you can do that here!
                `}
                </p>
            </div>
            <div className={css(styles.cardSection, styles.bottom)}>
                <ImportShow buttonStyle={styles.cardButton} />
            </div>
        </div>
    )
}
