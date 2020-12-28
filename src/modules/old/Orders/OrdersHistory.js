import React from 'react';
import ReactTable from 'react-table';

import { coachingColumns, musicLibraryColumns } from './columns';
import { SubscriptionsList } from './SubscriptionsList';

// import { css } from 'src/styles/old';

export const OrdersHistory = props => (
    <React.Fragment>
        {props.subscriptions && (
            <React.Fragment>
                <h2 css={{ fontSize: '16px' }}>Subscriptions</h2>
                <SubscriptionsList
                    subscriptions={props.subscriptions}
                    cancelSubscription={props.cancelSubscription}
                    reactivateSubscription={props.reactivateSubscription}
                />
            </React.Fragment>
        )}

        {props.coaching && (
            <React.Fragment>
                <h2 css={{ fontSize: '16px', marginTop: '35px' }}>Coaching</h2>
                <ReactTable
                    data={props.coaching}
                    columns={coachingColumns}
                    className="-highlight"
                    showPagination={props.coaching.length > 5}
                    resizable={false}
                    minRows={3}
                />
            </React.Fragment>
        )}

        {props.musicLibraryPayments && (
            <React.Fragment>
                <h2 css={{ fontSize: '16px', marginTop: '35px' }}>Music Library</h2>
                <ReactTable
                    data={props.musicLibraryPayments}
                    columns={musicLibraryColumns}
                    className="-highlight"
                    showPagination={props.musicLibraryPayments.length > 5}
                    resizable={false}
                    minRows={3}
                />
            </React.Fragment>
        )}
    </React.Fragment>
);
