import * as React from 'react';
import { Icon } from 'antd';

import Lock from 'src/public/img/icons/lock.svg';
import Network from 'src/public/img/icons/network.svg';
import { AnalyticsButton } from '../AnalyticsButton';
import EditButton from '../old/EditButton';
import SettingsButton from '../old/SettingsButton';
import { ShowModel } from '../../models';
import { AddEpisodeButton, Button, ButtonsWrapper, RelativeWrapper } from './style';

interface Props {
    show: ShowModel;
    isPaidUser: boolean;
    openProtectForm: () => void;
    openPromoteForm: () => void;
    newEpisode: () => void;
}

export const ButtonsList: React.FC<Props> = ({ show, isPaidUser, openProtectForm, openPromoteForm, newEpisode }) => (
    <ButtonsWrapper>
        <div>
            <EditButton show={show} />
            <Button image={Lock} onClick={openProtectForm}>{`Make Your Podcast ${
                show.protected ? 'Public' : 'Private'
            }`}</Button>
            <Button image={Network} onClick={openPromoteForm}>
                Promote
            </Button>
            <SettingsButton show={show} />

            {!show.isExternal && <AnalyticsButton isPaid={isPaidUser} showId={show.id} />}
        </div>

        {!show.isExternal && (
            <RelativeWrapper>
                <AddEpisodeButton onClick={newEpisode}>
                    <Icon type="plus" />
                </AddEpisodeButton>
            </RelativeWrapper>
        )}
    </ButtonsWrapper>
);
