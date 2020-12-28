import React from 'react'

import Table from 'src/shared/components/old/common/Table/Simple'
import Link from 'src/shared/components/old/interactive/Link'
import Container from 'src/containers/Admin/FreeMusic/Shows'
import { css } from 'src/styles/old'
import { formatDate } from 'src/shared/helpers/datetime'

import styles from '../styles'

const Columns = [
    {
        Header: 'Show - Episode',
        width: 125,
        accessor: 'show_expanded.id',
        Cell: cell => (
            <Link to={`/admin/shows/${cell.original.show_expanded.id}/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Show Title',
        accessor: 'show_expanded.title',
    },
    {
        Header: 'Total Listens',
        width: 115,
        accessor: 'show_expanded.total_listens',
    },
    {
        Header: 'Show Released',
        accessor: 'show_expanded.released_at',
    },
]

function transformItems(items = []) {
    return items.map(item => ({
        show_expanded: {
            id: item.showExpanded && item.showExpanded.length > 0 ? item.showExpanded[0].id : '',
            show: item.showExpanded && item.showExpanded.length > 0 ? item.showExpanded[0].show : '',
            title: item.showExpanded && item.showExpanded.length > 0 ? item.showExpanded[0].title : '',
            total_listens:
                item.showExpanded && item.showExpanded.length > 0 ? item.showExpanded[0].totalListens : '',
            released_at:
                item.showExpanded && item.showExpanded.length > 0 && item.showExpanded[0].releasedAt
                    ? formatDate(new Date(item.showExpanded[0].releasedAt))
                    : 'unreleased',
        },

        id: item.id,
        name: item.name,
        duration: item.duration,
        numUsed: item.numUsed,
    }))
}

const FreeMusicShows = ({ freeMusic, totalCount, fetch }) => (
    <div>
        <h1 className={css(styles.detailTableTitle)}>Where this Free Music appeared</h1>
        <Table
            // title="Active Free Music"
            items={transformItems(freeMusic)}
            columns={Columns}
            totalItems={totalCount}
            itemsPerPage={5}
            fetch={fetch}
        />
    </div>
)

export default Container(FreeMusicShows)
