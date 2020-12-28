import React from 'react'

import Table from 'src/shared/components/old/common/Table/Simple'
import Link from 'src/shared/components/old/interactive/Link'
import Container from 'src/containers/Admin/AudioAd/Episodes'
import { css } from 'src/styles/old'
import { formatDate } from 'src/shared/helpers/datetime'

import styles from '../styles'

const Columns = [
    {
        Header: 'Show ID',
        accessor: 'podcast_expanded.show',
        width: 110,
        Cell: cell => (
            <Link to={`/admin/shows/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Episode ID',
        accessor: 'podcast_expanded.id',
        width: 110,
        Cell: cell => (
            <Link to={`/admin/shows/${cell.original.showId}/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Show Title',
        accessor: 'name',
    },
    {
        Header: 'Total Listens',
        accessor: 'listens',
        width: 120,
    },
    {
        Header: 'Show Released',
        accessor: 'podcast_expanded.released_at',
    },
]

function transformItems(items) {
    return items.map(item => ({
        podcast_expanded: {
            show: item.podcastExpanded && item.podcastExpanded.length > 0 ? item.podcastExpanded[0].show : '',
            id: item.podcastExpanded && item.podcastExpanded.length > 0 ? item.podcastExpanded[0].id : '',
            released_at:
                item.podcastExpanded && item.podcastExpanded.length > 0
                    ? formatDate(new Date(item.podcastExpanded[0].releasedAt))
                    : '',
        },
        name:
            item.podcastExpanded && item.podcastExpanded.length > 0 ? item.podcastExpanded[0].showTitle : '',
        listens: item.numPlayed,
    }))
}

const Episodes = ({ episodes, totalEpisodes, fetch }) => (
    <div>
        <h1 className={css(styles.detailTableTitle)}>Where this ad appeared</h1>
        <Table
            items={transformItems(episodes)}
            columns={Columns}
            totalItems={totalEpisodes}
            itemsPerPage={5}
            fetch={fetch}
        />
    </div>
)

export default Container(Episodes)
