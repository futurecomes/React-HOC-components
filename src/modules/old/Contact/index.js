import React from 'react'

import { css } from 'src/styles/old'

import styles from './styles'

const email = 'help@messy.fm'

const Contact = () => (
    <div className={css(styles.container)}>
        <h1 className={css(styles.title)}>Contact</h1>
        <p className={css(styles.p)}>
            We’re delighted that you’re interested in Messy. If you need to contact us for whatever reason, be
            it compliments or concerns, email us at{' '}
            <a className={css(styles.link)} href={`mailto:${email}`}>
                {email}
            </a>
            . We’ll get back to you quickly.
        </p>
    </div>
)

export default Contact
