import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import ActiveAdsContainer from 'src/containers/Admin/AudioAds/ActiveAds'
import { formatDate } from 'src/shared/helpers/datetime'

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
        Header: 'Frequency',
        width: 95,
        accessor: 'frequency',
    },
    {
        Header: 'Plays',
        width: 95,
        accessor: 'total_listens',
    },
    {
        Header: 'Activated',
        accessor: 'activated_at',
    },
]

function transformAds(ads) {
    return ads.map(ad => ({
        id: ad.id,
        name: ad.name,
        frequency: ad.frequency,
        position: ad.position,
        total_listens: ad.totalListens || 0,
        activated_at: ad.activatedAt ? formatDate(new Date(ad.activatedAt)) : '',
    }))
}

const ActiveAds = ({ ads, totalAds, fetch, downloadAds, deleteAds }) => (
    <Table
        title="Active Audio Ads"
        items={transformAds(ads)}
        columns={Columns}
        totalItems={totalAds}
        itemsPerPage={5}
        fetchItems={fetch}
        downloadItems={downloadAds}
        deleteItems={deleteAds}
    />
)

export default ActiveAdsContainer(ActiveAds)
