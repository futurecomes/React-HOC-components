import React from 'react'

import { css } from 'src/styles/old'
import styles from '../styles'

const Success = ({ children }) => (
    <span className={css(styles.formMessage, styles.formSuccess)}>{children}</span>
)

export default Success
