import { isEmpty } from 'lodash';
import React from 'react';

import { Show } from 'src/modules/Podcasts/models/podcasts';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';

import { UserShow } from './UserShow';

interface Props {
    shows: Show[];
    isFetching: boolean;
}

export const UserShows: React.FC<Props> = ({ shows, isFetching }) => (
    <SectionWrapper>
        <ContentWrapper>
            {isFetching ? (
                <CenteredSpinner />
            ) : isEmpty(shows) ? (
                <span>This user has not recorded anything yet</span>
            ) : (
                shows.map(show => <UserShow key={show.title} show={show} />)
            )}
        </ContentWrapper>
    </SectionWrapper>
);
