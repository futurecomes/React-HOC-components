import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import EpisodesContainer from 'src/containers/Admin/Show/Episodes'
import { formatDate } from 'src/shared/helpers/datetime'

const Columns = [
    {
        Header: 'ID',
        width: 80,
        accessor: 'guid',
        Cell: cell => (
            <Link to={`/admin/shows/${cell.original.show_id}/${cell.original.guid}`} type="link">
                {cell.original.guid}
            </Link>
        ),
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Recorder',
        width: 75,
        accessor: 'recorder_used',
    },
    {
        Header: 'Editor',
        width: 75,
        accessor: 'editor_used',
    },
    {
        Header: 'Listens',
        width: 75,
        accessor: 'total_listens',
    },
    {
        Header: 'Time',
        width: 105,
        accessor: 'duration',
    },
    {
        Header: 'Released',
        accessor: 'released_at',
        width: 155,
    },
    {
        Header: 'Created',
        accessor: 'created_at',
        width: 155,
    },
]

function transformEpisodes(episodes) {
    return episodes.map(episode => ({
        guid: episode.guid,
        show_id: episode.show,
        title: episode.title,
        recorder_used: episode.recorderUsed ? 'Yes' : 'No',
        editor_used: episode.editorUsed ? 'Yes' : 'No',
        total_listens: episode.totalListens || 0,
        duration: `${Math.round((episode.duration || 0) * 100) / 100} mins`,
        released_at: episode.releasedAt ? formatDate(new Date(episode.releasedAt)) : 'N/A',
        created_at: formatDate(new Date(episode.createdAt)),
    }))
}

const Episodes = ({ episodes, totalEpisodes, fetch, downloadEpisodes, deleteEpisodes }) => (
    <Table
        title="Episode List"
        items={transformEpisodes(episodes)}
        columns={Columns}
        totalItems={totalEpisodes}
        itemsPerPage={5}
        fetchItems={fetch}
        downloadItems={downloadEpisodes}
        deleteItems={deleteEpisodes}
    />
)

export default EpisodesContainer(Episodes)
