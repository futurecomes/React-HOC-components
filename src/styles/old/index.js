import { tablet } from './breakPoints'

export { StyleSheet, css, merge } from './styles'
export { default as colors } from './colors'
export { mobile, tablet, desktop, lgDesktop, xlgDesktop } from './breakPoints'
export { default as modalStyles } from './modalStyles'

export const tabletMax = tablet.high('max-width')
