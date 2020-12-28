import moment from 'moment'
import React from 'react'

export const musicLibraryColumns = [
    {
        Header: 'Name',
        accessor: 'name',
        Cell: cell => {
            return <div> {cell.value} </div>
        },
        maxWidth: 300,
    },
    {
        Header: header => {
            return <div css={{ textAlign: 'center' }}> Took place </div>
        },
        accessor: 'createdAt',
        Cell: cell => {
            return <div css={{ textAlign: 'center' }}> {moment(cell.value).format('MM.DD.YYYY')} </div>
        },
        maxWidth: 150,
    },
    {
        Header: header => {
            return <div css={{ textAlign: 'center' }}> Price </div>
        },
        accessor: 'amount',
        Cell: cell => {
            return <div css={{ textAlign: 'center' }}> {`$${cell.value / 100}`} </div>
        },
        maxWidth: 100,
    },
]

const coachingTypes = {
    growth: 'Growth',
    launch: 'Launch',
    combined: 'Launch & Growth',
    monetization: 'Monetization',
    complete: 'Complete Experience',
}

export const coachingColumns = [
    {
        Header: 'Type',
        accessor: 'type',
        Cell: cell => {
            return <div> {coachingTypes[cell.value] || cell.value} </div>
        },
        maxWidth: 300,
    },
    {
        Header: header => {
            return <div css={{ textAlign: 'center' }}> Took place </div>
        },
        accessor: 'date',
        Cell: cell => {
            return <div css={{ textAlign: 'center' }}> {moment(cell.value).format('MM.YYYY')} </div>
        },
        maxWidth: 150,
    },
    {
        Header: header => {
            return <div css={{ textAlign: 'center' }}> Price </div>
        },
        accessor: 'amount',
        Cell: cell => {
            return <div css={{ textAlign: 'center' }}> {`$${cell.value / 100}`} </div>
        },
        maxWidth: 100,
    },
]
