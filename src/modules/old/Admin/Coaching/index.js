import React from 'react'
import moment from 'moment'

import Breadcrumbs from 'src/shared/components/old/common/Breadcrumbs'
import Table from 'src/shared/components/old/common/Table/Full'
import { css } from 'src/styles/old'

import CoachingContainer from './containers'
import styles from '../styles'

export class Coaching extends React.Component {
    Columns = [
        {
            Header: 'User',
            accessor: 'creatorName',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Type',
            accessor: 'type',
        },
        {
            Header: 'Took place',
            accessor: 'tookPlace',
            Cell: d => (
                <span
                    onClick={() =>
                        this.props.editCoachingLesson({ id: d.original.id, tookPlace: !d.original.tookPlace })
                    }
                    css={{ cursor: 'pointer' }}
                >
                    {d.original.tookPlace ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            Header: 'Purchased on',
            accessor: 'createdAt',
            Cell: d => moment(d.value).format('MMMM Do YYYY, h:mm a'),
        },
    ]

    BreadcrumbLinks = [
        {
            text: 'Admin',
            path: '/admin/dashboard',
        },
        {
            text: 'Coaching',
            path: '/admin/coaching',
        },
    ]

    render() {
        return (
            <div>
                <Breadcrumbs links={this.BreadcrumbLinks} style={styles.containerBreadcrumbs} />
                <div className={css(styles.container)}>
                    <Table
                        items={this.props.coaching.data}
                        columns={this.Columns}
                        totalItems={this.props.coaching.totalCount}
                        itemsPerPage={1}
                        simple
                    />
                </div>
            </div>
        )
    }
}

export default CoachingContainer(Coaching)
