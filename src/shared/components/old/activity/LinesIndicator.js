import React from 'react'

import linesSVGSrc from './static/svg/lines.svg'
import { css } from 'src/styles/old'
import styles from './styles'

const LinesIndicator = ({ size }) => (
    <div className={css(styles.container)}>
        <img
            src={linesSVGSrc}
            alt="loading..."
            style={{
                height: size,
                width: 'auto',
                flex: 1,
            }}
        />
    </div>
)

LinesIndicator.defaultProps = {
    size: 50,
}

export default LinesIndicator
