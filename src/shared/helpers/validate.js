// eslint-disable-next-line
const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const errorPresence = 'This field cannot be left blank'
const errorLength = 'This field should not exceed 40 characters'
const errorEmailFormat = 'Enter a valid email address'
const errorPasswordFormat =
    'Password must be a minimum 6 characters and include 1 number and 1 capital letter'
const errorPasswordConfirm = 'Passwords do not match'

function hasCapitalLetter(string) {
    return /[A-Z]/.test(string)
}

function hasNumber(string) {
    return /\d/.test(string)
}

export function validatePresence(value) {
    if (typeof value === 'boolean') {
        if (value !== true && value !== false) {
            return errorPresence
        }

        return
    }

    if (!value) {
        return errorPresence
    }

    return
}

export function validateName(name = '') {
    if (!name) {
        return errorPresence
    }

    if (name.length >= 40) {
        return errorLength
    }

    return
}

export function validateEmail(email = '') {
    if (!email) {
        return errorPresence
    }

    if (!emailRE.test(email)) {
        return errorEmailFormat
    }

    return
}

export function validatePasswordPresence(password = '') {
    return !password ? errorPresence : undefined
}

export function validatePasswordFormat(password = '') {
    return password.length < 6 || (!hasCapitalLetter(password) || !hasNumber(password))
        ? errorPasswordFormat
        : undefined
}

export function validatePasswordConfirm(password = '', passwordConfirm) {
    return password !== passwordConfirm ? errorPasswordConfirm : undefined
}

export function validatePassword(password = '', passwordConfirm) {
    let error

    error = validatePasswordPresence(password)
    if (error) return error

    error = validatePasswordFormat(password)
    if (error) return error

    if (passwordConfirm !== undefined) {
        error = validatePasswordConfirm(password, passwordConfirm)
        if (error) return error
    }

    return
}

export function validateSignInPassword(password = '') {
    return validatePasswordPresence(password)
}

export function validateSignUpPassword(password = '') {
    let error = validatePassword(password)
    if (error) return error

    error = validatePasswordFormat(password)
    if (error) return error

    return
}

export const validateImageFile = (
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    isRequired,
    maxSize = 5,
    jpgOrPng,
) => imageFile => {
    if (!imageFile || !imageFile.size) {
        return isRequired && errorPresence
    }

    const { file, size } = imageFile

    const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)

    if (jpgOrPng && !isJpgOrPng) {
        return `Only images with jpg or png extension are allowed`
    }

    const { width, height } = size

    // Hack for covert art editor
    if (width === 400 && height === 400 && file.name === 'coverArt.png') {
        return
    }

    const validateMaxSize = maxWidth && maxHeight

    if (validateMaxSize && (width > maxWidth || height > maxHeight)) {
        return `Image must be between ${minWidth}x${minHeight} and ${maxWidth}x${maxHeight}`
    }

    if (width < minWidth || height < minHeight) {
        return `Image must be bigger than ${minWidth}x${minHeight}`
    }

    if (file.size > maxSize * Math.pow(1024, 2)) {
        return `This image exceeds the maximum uplopad size (${maxSize} MB)`
    }

    return
}

export function validateFrequency(value) {
    const errorFrequencyTooLow = 'Frequency must be greater than or equal to 0'
    const errorFrequencyTooHigh = 'Frequency must be less than or equal to 100'

    const error = validatePresence(value)
    if (error) return error

    const num = Number(value)

    if (num < 0) {
        return errorFrequencyTooLow
    } else if (num > 100) {
        return errorFrequencyTooHigh
    }

    return
}
