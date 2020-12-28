import React from 'react'

import Table from 'src/shared/components/old/common/Table/Simple'
import Link from 'src/shared/components/old/interactive/Link'
import AudioAdsContainer from 'src/containers/Admin/Episode/AudioAds'
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
]

function transformItems(items) {
    return items.map(item => ({
        id: item.id,
        ad_expanded: {
            name: item.adExpanded[0].name,
        },
    }))
}

const AudioAds = ({ ads, totalAds, fetch }) => (
    <div>
        <span className={css(styles.label)}>Audio Ads Inserted</span>
        <Table
            items={transformItems(ads)}
            columns={Columns}
            totalItems={totalAds}
            itemsPerPage={5}
            fetch={fetch}
        />
    </div>
)

export default AudioAdsContainer(AudioAds)
