import React from 'react'

import { css } from 'src/styles/old'
import styles from '../styles'

import musicSrc from '../static/svg/music.svg'
import trashSrc from '../static/svg/trash.svg'

export const File = ({ removeFile, name, i }) => (
    <div className={css(styles.accordionItem, styles.row)}>
        <img src={musicSrc} alt={name} className={css(styles.spaceRight)} />
        <span className={css(styles.blackText, styles.flex1)}>{name}</span>
        <button onClick={() => removeFile(i)} className={css(styles.iconButton)}>
            <img src={trashSrc} alt={`Remove ${name}`} />
        </button>
    </div>
)
