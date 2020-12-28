import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import isAuthenticatedHOC from 'src/containers/hoc/isAuthenticated';
import container from 'src/containers/MyShows';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { Header } from './Header';
import { ShowModel } from './models';
import { ActionsShowProps } from './models/actionsShowProps';
import { Show } from './Show';

interface StateProps extends ActionsShowProps, RouteComponentProps {
    shows: ShowModel[];
    isFetching: boolean;
    userToken: string;
    isPaidUser: boolean;
}

const MyPodcast: React.FC<StateProps> = ({ isFetching, shows, ...rest }) => {
    if (isFetching) {
        return <CenteredSpinner />;
    }

    return (
        <>
            <Header />

            {shows.map(show => (
                <Show key={show.id} show={show} {...rest} />
            ))}
        </>
    );
};

// export default for React.lazy
export default isAuthenticatedHOC(container(MyPodcast));
