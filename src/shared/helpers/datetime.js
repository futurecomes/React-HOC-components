import moment from 'moment'

/* eslint-disable import/prefer-default-export */
export function formatDate(dateInput) {
    const date = new Date(dateInput)
    if (date.toString() === 'Invalid Date') {
        return ''
    }

    return moment(date).format('MMM D, YYYY, LT')
}
