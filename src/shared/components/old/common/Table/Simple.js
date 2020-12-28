import React, { Component } from 'react'

import { debounce } from 'lodash/fp'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import TableContainer from 'src/containers/common/Table/Simple'

import './table.css'

const numberOfRows = 20

class Table extends Component {
    constructor(props) {
        super(props)

        this.handleAllSelection = this.handleAllSelection.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
        this.handleFetchData = debounce(250)(this.handleFetchData)

        this.state = {
            loading: false,
            selection: {
                all: false,
                ids: [],
            },
            filter: props.filter || '',
            start: 0,
            end: 20,
            sort: 'id',
            order: 'ASC',
            page: 0,
        }
    }

    componentDidMount() {
        const { filter, sort, order } = this.state
        this.handleFetchData(filter, 0, sort, order)
    }

    componentWillReceiveProps(props) {
        if (this.props.filter !== props.filter) {
            this.setState({
                filter: props.filter,
                page: 0,
            })

            this.handleFetchData(props.filter, 0, this.state.sort, this.state.order)
        }
    }

    formatItems() {
        const { items } = this.props

        if (items.length < 1) {
            return items
        }

        if (items[0].isSelected !== undefined) {
            return items
        }

        return items.map(item => ({
            isSelected: this.state.selection.ids.indexOf(item.id) > -1 || this.state.selection.all,
            ...item,
        }))
    }

    formatColumns() {
        const { columns } = this.props

        if (columns.length < 1) {
            return columns
        }

        if (columns[0].accessor === 'isSelected') {
            return columns
        }

        return [
            {
                Header: () => <span />,
                width: 45,
                resizable: false,
                sortable: false,
                accessor: 'isSelected',
                Cell: cell => (
                    <input
                        type="checkbox"
                        onChange={this.handleSelection}
                        checked={cell.row.isSelected}
                        data-id={cell.row.id}
                    />
                ),
            },
            ...columns,
        ]
    }

    handleAllSelection(e) {
        const checkbox = e.target
        const isChecked = checkbox.checked

        this.setState({
            selection: {
                all: isChecked,
                ids: [],
            },
        })

        this.props.onSelectionChange({
            all: isChecked,
            ids: [],
        })
    }

    handleSelection(e) {
        const checkbox = e.target
        const isChecked = checkbox.checked
        const id = parseInt(checkbox.getAttribute('data-id'), 10)

        const selectedIds = this.state.selection.ids

        if (isChecked) {
            selectedIds.push(id)
        } else {
            selectedIds.splice(selectedIds.indexOf(id), 1)
        }

        this.setState({
            selection: {
                all: false,
                ids: selectedIds,
            },
        })

        this.props.onSelectionChange({
            all: false,
            ids: selectedIds,
        })
    }

    handleFetchData(filter, from, sort, order) {
        if (this.props.simple) {
            return
        }
        this.setState({ loading: true })

        this.props.fetch(filter, from, numberOfRows, sort, order).then(() => {
            this.setState({ loading: false })
        })
    }

    onPageChange = page => {
        this.setState({ page, loading: true })
        const { filter, sort, order } = this.state
        const from = page ? page * numberOfRows : 0

        this.handleFetchData(filter, from, sort, order)
    }

    sortChange = field => {
        const [sorted] = field
        const order = sorted.desc ? 'desc' : 'asc'
        this.setState({ page: 0, sort: sorted.id, order })
        this.handleFetchData(this.state.filter, 0, sorted.id, order)
    }

    render() {
        const { totalItems, sortable } = this.props

        const data = this.formatItems()
        const columns = this.formatColumns()

        return (
            <ReactTable
                data={data}
                columns={columns}
                filter={this.state.filter}
                manual
                loadingText="Loading..."
                loading={this.state.loading}
                defaultPageSize={numberOfRows}
                pages={Math.ceil(totalItems / numberOfRows)}
                showPageSizeOptions={false}
                sortable={sortable}
                onPageChange={this.onPageChange}
                onSortedChange={this.sortChange}
                page={this.state.page}
            />
        )
    }
}

Table.defaultProps = {
    columns: undefined,
    itemsPerPage: 20, // [5, 10, 20, 25, 50, 100]
    sortable: true,
    filter: '',
    onSelectionChange: () => {},
}

export default TableContainer(Table)
