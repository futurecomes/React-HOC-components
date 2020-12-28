import React from 'react'
import { css } from 'glamor'

import { colors } from 'src/styles/old'

export function Headline({ style = {}, children, size }) {
    return React.createElement(`h${size || 1}`, { ...css({ color: colors.azure, ...style }) }, children)
}
