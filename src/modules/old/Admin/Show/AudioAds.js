import React from 'react'

import Table from 'src/shared/components/old/common/Table/Simple'
import Link from 'src/shared/components/old/interactive/Link'
import Container from 'src/containers/Admin/Show/AudioAds'
import { css } from 'src/styles/old'

import styles from '../styles'

const Columns = [
    {
        Header: 'A-Ad ID',
        width: 95,
        accessor: 'id',
        Cell: cell => (
            <Link to={`/admin/ads/audio/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Title',
        accessor: 'ad_expanded.name',
    },
    {
        Header: 'Episode',
        width: 95,
        accessor: 'podcast',
        Cell: cell => (
            <Link to={`/admin/shows/${cell.original.show}/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Episode Title',
        accessor: 'podcast_expanded.title',
    },
]

function transformItems(items) {
    return items.map(item => ({
        id: item.id,
        ad_expanded: {
            name: item.adExpanded[0].name,
        },
        podcast_expanded: {
            title: item.podcastExpanded[0].title,
        },
        podcast: item.podcast,
        show: item.show,
    }))
}

const AudioAds = ({ ads, totalAds, fetch }) => (
    <div className={css(styles.container)}>
        <span className={css(styles.title)}>Audio Ads Inserted</span>
        <Table
            items={transformItems(ads)}
            columns={Columns}
            totalItems={totalAds}
            itemsPerPage={5}
            fetch={fetch}
        />
    </div>
)

export default Container(AudioAds)
