import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import ShowsContainer from 'src/containers/Admin/User/Shows'

import { formatDate } from 'src/shared/helpers/datetime'

const Columns = [
    {
        Header: 'Show ID',
        width: 75,
        accessor: 'id',
        Cell: cell => (
            <Link to={`/admin/shows/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Show Title',
        accessor: 'title',
    },
    {
        Header: 'Episode Count',
        accessor: 'episodeCount',
    },
    {
        Header: 'Total Listens',
        accessor: 'totalListens',
    },
    {
        Header: 'Last Updated',
        accessor: 'updatedAt',
    },
    {
        Header: 'Created',
        accessor: 'createdAt',
    },
]

function transformItems(items) {
    return items.map(item => ({
        id: item.id,
        title: item.title,
        episodeCount: item.episodeCount,
        totalListens: item.totalListens,
        updatedAt: formatDate(new Date(item.updatedAt)),
        createdAt: formatDate(new Date(item.createdAt)),
    }))
}

const Shows = ({ shows, totalShows, fetch, downloadShows, deleteShows }) => (
    <Table
        title="User's Shows"
        items={transformItems(shows)}
        columns={Columns}
        totalItems={totalShows}
        itemsPerPage={5}
        fetchItems={fetch}
        downloadItems={downloadShows}
        deleteItems={deleteShows}
    />
)

export default ShowsContainer(Shows)
