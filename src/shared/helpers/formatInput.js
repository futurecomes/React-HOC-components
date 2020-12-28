import { formatDate } from './datetime'

function formatInput(prefix, value) {
    if (!value) return value
    if (value === prefix) return ''
    if (!value.startsWith(prefix)) return `${prefix}${value}`
    return value
}

export function formatInstagram(value) {
    const prefix = '@'
    return formatInput(prefix, value)
}

export function formatTwitter(value) {
    const prefix = '@'
    return formatInput(prefix, value)
}

export function formatFacebook(value) {
    const prefix = 'facebook.com/'
    return formatInput(prefix, value)
}

export function formatProfileUrl(value) {
    const prefix = 'messy.fm/profile/'
    return formatInput(prefix, value)
}

export function formatBoolean(value) {
    if (typeof value === 'boolean') {
        return value
    }

    if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') {
            return true
        } else if (value.toLowerCase() === 'false') {
            return false
        }
    }

    return ''
}

export function formatDatetime(value) {
    if (new Date(value).toString() === 'Invalid Date') {
        return ''
    }

    return value && formatDate(new Date(value))
}

export function formatNumeric(value) {
    if (!value) return ''

    const strValue = `${value}`
    return strValue.replace(/[^0-9]/g, '')
}
