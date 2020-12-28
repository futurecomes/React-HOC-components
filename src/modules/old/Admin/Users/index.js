import React from 'react'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import Table from 'src/shared/components/old/common/Table/Full'
import Link from 'src/shared/components/old/interactive/Link'
import UsersContainer from 'src/containers/Admin/Users'
import { formatDate } from 'src/shared/helpers/datetime'
import { css } from 'src/styles/old'

import styles from '../styles'

const statusColor = status => {
    switch (status) {
        case 'inactive':
            return 'red'
        case 'archived':
            return 'orange'
        default:
            return 'green'
    }
}

const Columns = [
    {
        Header: 'ID',
        width: 90,
        accessor: 'id',
        Cell: cell => (
            <Link to={`/admin/users/${cell.value}`} type="link">
                {cell.value}
            </Link>
        ),
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email verified',
        accessor: 'email_verified',
    },
    {
        Header: 'Creator',
        width: 90,
        accessor: 'creator',
    },
    {
        Header: 'Status',
        width: 100,
        accessor: 'status',
        Cell: cell => (
            <span style={{ color: statusColor(cell.value.toLowerCase()) }}>
                {cell.value ? cell.value[0].toUpperCase() + cell.value.slice(1) : ''}
            </span>
        ),
    },
    {
        Header: 'Last Active',
        accessor: 'last_active',
    },
    {
        Header: 'Join Date',
        accessor: 'created_at',
    },
]

function transformUsers(users) {
    return users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        creator: user.creator ? 'Yes' : 'No',
        status: user.status || '',
        last_active: user.lastActive ? formatDate(new Date(user.lastActive)) : '',
        created_at: formatDate(new Date(user.createdAt)),
        email_verified: user.emailVerified ? 'Yes' : 'No',
    }))
}

const BreadcrumbLinks = [
    {
        text: 'Admin',
        path: '/admin/dashboard',
    },
    {
        text: 'Users',
        path: '/admin/users',
    },
]

const Users = ({ users, totalUsers, fetch, downloadUsers, deleteUsers }) => (
    <div>
        <Breadcrumbs links={BreadcrumbLinks} style={styles.containerBreadcrumbs} />

        <div className={css(styles.container)}>
            <Table
                items={transformUsers(users)}
                columns={Columns}
                totalItems={totalUsers}
                itemsPerPage={20}
                fetchItems={fetch}
                downloadItems={downloadUsers}
                deleteItems={deleteUsers}
            />
        </div>
    </div>
)

export default UsersContainer(Users)
