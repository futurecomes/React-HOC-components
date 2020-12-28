import React, { Component } from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import { ErrorMessage } from 'src/shared/components/old/shared/ErrorMessage'
import Container from 'src/containers/Admin/User/Logs'
import { formatDate } from 'src/shared/helpers/datetime'

const Columns = [
    {
        Header: 'Date',
        width: 150,
        accessor: 'created_at',
    },
    {
        Header: 'Action',
        width: 175,
        accessor: 'action',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
]

function transformItems(items) {
    return items.map(item => ({
        created_at: formatDate(new Date(item.createdAt)),
        action: item.action,
        description: item.description,
    }))
}

class Logs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentFetch: props.fetchAll,
        }
    }

    getActions() {
        return {
            lastweek: {
                text: 'Last Week',
                fn: function setLastWeek() {
                    this.setState({
                        currentFetch: this.props.fetchLastWeek,
                    })
                }.bind(this),
            },
            lastmonth: {
                text: 'Last Month',
                fn: function setLastMonth() {
                    this.setState({
                        currentFetch: this.props.fetchLastMonth,
                    })
                }.bind(this),
            },
            lastyear: {
                text: 'Last Year',
                fn: function setLastYear() {
                    this.setState({
                        currentFetch: this.props.fetchLastYear,
                    })
                }.bind(this),
            },
            all: {
                text: 'All',
                fn: function setAll() {
                    this.setState({
                        currentFetch: this.props.fetchAll,
                    })
                }.bind(this),
            },
        }
    }

    render() {
        const { logs, totalLogs, errorFetchingLogs } = this.props

        return (
            <React.Fragment>
                {errorFetchingLogs && (
                    <ErrorMessage textTransform="uppercase">
                        There was a problem with loading logs
                    </ErrorMessage>
                )}
                <Table
                    title="User Log"
                    items={transformItems(logs)}
                    columns={Columns}
                    totalItems={totalLogs}
                    itemsPerPage={5}
                    showSearchBar={false}
                    sortable={false}
                    fetchItems={this.state.currentFetch}
                    actions={this.getActions()}
                />
            </React.Fragment>
        )
    }
}

export default Container(Logs)
