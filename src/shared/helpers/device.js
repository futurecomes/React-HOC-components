import MobileDetect from 'mobile-detect'

export const isMobile = new MobileDetect(window.navigator.userAgent).phone()
export const userAgent = window.navigator.userAgent
