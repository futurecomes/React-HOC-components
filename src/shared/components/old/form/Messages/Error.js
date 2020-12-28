import React from 'react'

import { css } from 'src/styles/old'
import styles from '../styles'

const Error = ({ children }) => <span className={css(styles.formMessage, styles.formError)}>{children}</span>

export default Error
