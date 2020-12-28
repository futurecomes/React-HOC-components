import moment from 'moment'

export const roundPercentage = value => {
    if (typeof value === 'undefined') {
        return ''
    }

    return Math.round(value * 100)
}

export const formatPercentage = value => {
    if (typeof value === 'undefined') {
        return ''
    }

    return `${roundPercentage(value)}%`
}

export const formatDecimal = value => {
    if (typeof value === 'undefined') {
        return ''
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const dateFormat = 'MM-DD-YYYY'

export const columns = [
    { Header: 'Users', accessor: 'counter' },
    { Header: 'From', accessor: 'from', Cell: d => moment(d.value).format(dateFormat) },
    { Header: 'To', accessor: 'to', Cell: d => moment(d.value).format(dateFormat) },
]
