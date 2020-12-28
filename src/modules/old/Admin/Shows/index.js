import React from 'react'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import ShowsContainer from 'src/containers/Admin/Shows'
import { css } from 'src/styles/old'
import { formatDate } from 'src/shared/helpers/datetime'

import styles from '../styles'

function transformShows(shows) {
    return shows.map(show => ({
        id: show.id,
        title: show.title,
        created_by: show.createdBy || '',
        episode_count: show.episodeCount || 0,
        ads_enabled: show.adsEnabled ? 'Yes' : 'No',
        updated_at: show.updatedAt ? formatDate(new Date(show.updatedAt)) : '',
        created_at: formatDate(new Date(show.createdAt)),
        source_url: show.imported ? (show.sourceUrl ? show.sourceUrl : 'external (need url)') : 'internal',
    }))
}

const BreadcrumbLinks = [
    {
        text: 'Admin',
        path: '/admin/dashboard',
    },
    {
        text: 'Shows',
        path: '/admin/shows',
    },
]

class Shows extends React.PureComponent {
    editRssUrl(show) {
        const newUrl = prompt('Provide new RSS url', show.source_url)
        if (!newUrl) return
        if (newUrl !== show.source_url) {
            this.props.adminEditShow({ showId: show.id, rssUrl: newUrl.trim() })
        }
    }

    Columns = [
        {
            Header: 'Show ID',
            width: 95,
            accessor: 'id',
            Cell: cell => (
                <Link to={`/admin/shows/${cell.value}`} type="link">
                    {cell.value}
                </Link>
            ),
        },
        {
            Header: 'RSS url',
            accessor: 'source_url',
            Cell: cell => (
                <div style={{ cursor: 'pointer' }} onClick={() => this.editRssUrl(cell.original)}>
                    {cell.value}
                </div>
            ),
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Creator',
            width: 95,
            accessor: 'created_by',
            Cell: cell => (
                <Link to={`/admin/users/${cell.value}`} type="link">
                    {cell.value}
                </Link>
            ),
        },
        {
            Header: 'Episodes',
            width: 95,
            accessor: 'episode_count',
        },
        {
            Header: 'Ads',
            width: 95,
            accessor: 'ads_enabled',
        },
        {
            Header: 'Last Updated',
            accessor: 'updated_at',
        },
        {
            Header: 'Created',
            accessor: 'created_at',
        },
    ]

    render() {
        const { shows, totalShows, fetch, downloadShows, deleteShows } = this.props
        return (
            <div>
                <Breadcrumbs links={BreadcrumbLinks} style={styles.containerBreadcrumbs} />

                <div className={css(styles.container)}>
                    <Table
                        items={transformShows(shows)}
                        columns={this.Columns}
                        totalItems={totalShows}
                        itemsPerPage={20}
                        fetchItems={fetch}
                        downloadItems={downloadShows}
                        deleteItems={deleteShows}
                    />
                </div>
            </div>
        )
    }
}

export default ShowsContainer(Shows)
