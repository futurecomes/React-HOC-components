import React from 'react'
import moment from 'moment'
import ReactTable from 'react-table'

import * as S from './styled'

export class SubscriptionsList extends React.Component {
    columns = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: cell => {
                return <div> {cell.value} </div>
            },
            maxWidth: 100,
            whiteSpace: 'unset',
        },
        {
            Header: 'Renew',
            accessor: 'currentPeriodEnd',
            Cell: cell => {
                return <div> {cell.original.cancelAtPeriodEnd ? 'Never' : moment(cell.value).format('MM.DD.YYYY')} </div>
            },
            maxWidth: 80,
        },
        {
            Header: header => {
                return <div css={{ textAlign: 'center' }}> Price </div>
            },
            accessor: 'amount',
            Cell: cell => {
                return <div css={{ textAlign: 'center' }}> ${cell.value / 100} </div>
            },
            maxWidth: 60,
        },
        {
            Header: header => {
                return <div css={{ textAlign: 'center' }}> Status </div>
            },
            Cell: cell => {
                const isActive = cell.original.active
                const toCancel = cell.original.cancelAtPeriodEnd
                return (
                    <div css={{ color: toCancel ? 'peru' : isActive ? 'mediumseagreen' : 'tomato', textAlign: 'center' }}>
                        {toCancel ? 'To Cancel' : isActive ? 'Active' : 'Canceled'}
                    </div>
                )
            },
            maxWidth: 80,
        },
        {
            Header: header => {
                return <div css={{ textAlign: 'center' }}> Actions </div>
            },
            accessor: 'noop_1',
            sortable: false,
            Cell: cell =>
                cell.original.disabled && cell.original.innerSubscription ? null : !cell.original
                      .cancelAtPeriodEnd ? (
                    <S.ActionButton
                        onClick={() =>
                            this.props.cancelSubscription(
                                cell.original.id,
                                cell.original.name === 'Listener Support',
                            )
                        }
                    >
                        Cancel
                    </S.ActionButton>
                ) : (
                    <S.ActionButton onClick={() => this.props.reactivateSubscription(cell.original.id)}>
                        Reactivate
                    </S.ActionButton>
                ),
            maxWidth: 90,
        },
    ]

    render() {
        return (
            <ReactTable
                data={this.props.subscriptions}
                columns={this.columns.filter(c => c.Header !== 'actions/old' || this.props.cancelSubscription)}
                className="-highlight"
                minRows={3}
                showPagination={this.props.subscriptions.length > 5}
                resizable={false}
            />
        )
    }
}
