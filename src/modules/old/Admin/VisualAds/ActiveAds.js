import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import ActiveAdsContainer from 'src/containers/Admin/VisualAds/ActiveAds'
import { formatDate } from 'src/shared/helpers/datetime'

const Columns = [
    {
        Header: 'V-Ad ID',
        width: 95,
        accessor: 'id',
        Cell: cell => (
            <Link to={`/admin/ads/visual/${cell.value}`} type="link">
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
        Header: 'Views',
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
        total_listens: ad.totalListens || 0,
        activated_at: ad.activatedAt ? formatDate(new Date(ad.activatedAt)) : '',
    }))
}

const ActiveAds = ({ ads, totalAds, fetch, downloadAds, deleteAds }) => (
    <Table
        title="Active Visual Ads"
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
