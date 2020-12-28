import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import InactiveAdsContainer from 'src/containers/Admin/AudioAds/InactiveAds'
import { css } from 'src/styles/old'
import { formatDate } from 'src/shared/helpers/datetime'

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
        accessor: 'name',
    },
    {
        Header: 'Plays',
        width: 95,
        accessor: 'total_listens',
    },
    {
        Header: 'Last Active',
        accessor: 'last_active',
    },
    {
        Header: 'Created',
        accessor: 'created_at',
    },
]

function transformAds(ads) {
    return ads.map(ad => ({
        id: ad.id,
        name: ad.name,
        // position: ad.position,
        total_listens: ad.totalListens || 0,
        last_active: ad.lastActive ? formatDate(new Date(ad.lastActive)) : '',
        created_at: formatDate(new Date(ad.createdAt)),
    }))
}

const InactiveAds = ({ ads, totalAds, fetch, downloadAds, deleteAds }) => (
    <div className={css(styles.container)}>
        <Table
            title="Inactive Audio Ads"
            items={transformAds(ads)}
            columns={Columns}
            totalItems={totalAds}
            itemsPerPage={20}
            fetchItems={fetch}
            downloadItems={downloadAds}
            deleteItems={deleteAds}
        />
    </div>
)

export default InactiveAdsContainer(InactiveAds)
