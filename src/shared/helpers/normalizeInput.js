function normalizeInput(prefix, value) {
    return value.replace(prefix, '')
}

export function normalizeInstagram(value) {
    const prefix = '@'
    return normalizeInput(prefix, value)
}

export function normalizeTwitter(value) {
    const prefix = '@'
    return normalizeInput(prefix, value)
}

export function normalizeFacebook(value) {
    const prefix = 'facebook.com/'
    return normalizeInput(prefix, value)
}

export function normalizeProfileUrl(value) {
    const prefix = 'messy.fm/profile/'
    return normalizeInput(prefix, value)
}
