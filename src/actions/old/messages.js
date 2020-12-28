export const MESSAGES_SET = 'MESSAGES_SET'

export function clearMessages(name) {
    return {
        type: MESSAGES_SET,
        payload: {
            name,
            successes: [],
            errors: [],
        },
    }
}

export function setErrors(name, errors) {
    const errorPayload = Array.isArray(errors) ? errors : [errors]

    return {
        type: MESSAGES_SET,
        payload: {
            name,
            errors: errorPayload,
            successes: [],
        },
    }
}

export function setSuccesses(name, successes) {
    const successesPayload = Array.isArray(successes) ? successes : [successes]

    return {
        type: MESSAGES_SET,
        payload: {
            name,
            errors: [],
            successes: successesPayload,
        },
    }
}
