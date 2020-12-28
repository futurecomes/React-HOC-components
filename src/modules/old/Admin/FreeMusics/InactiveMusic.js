import React from 'react'

import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import Container from 'src/containers/Admin/FreeMusics/InactiveMusic'
import { css } from 'src/styles/old'

import styles from '../styles'

const Columns = [
    {
        Header: 'FM ID',
        width: 95,
        accessor: 'id',
        Cell: cell => (
            <Link to={`/admin/freemusic/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Title',
        accessor: 'name',
    },
    {
        Header: 'Length',
        width: 95,
        accessor: 'duration',
    },
    {
        Header: 'Used',
        width: 95,
        accessor: 'numUsed',
    },
]

function transformItems(items) {
    return items.map(item => ({
        id: item.id,
        name: item.name,
        duration: item.duration,
        numUsed: item.numUsed,
    }))
}

const InactiveMusic = ({ freeMusic, totalFreeMusic, fetch, downloadFreeMusic, deleteFreeMusic }) => (
    <div className={css(styles.container)}>
        <Table
            title="Inactive Free Music"
            items={transformItems(freeMusic)}
            columns={Columns}
            totalItems={totalFreeMusic}
            itemsPerPage={5}
            fetchItems={fetch}
            downloadItems={downloadFreeMusic}
            deleteItems={deleteFreeMusic}
        />
    </div>
)

export default Container(InactiveMusic)
