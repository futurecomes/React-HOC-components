import * as React from 'react';
import { Dropdown, Icon } from 'antd';

import formatTime from 'src/shared/helpers/formatTime';
import { PlayButton } from '../PlayButton';
import { MenuOverlay } from './MenuOverlay';
import { Container, PodcastTitle, EpisodeContent, PodcastNumber, PodcastDuration, Row } from './style';
import { EpisodeModel } from '../../models';
import { deletePodcast } from 'src/api/editor';
import { openEditEpisodeModal, closeEditEpisodeModal, updateEpisode } from 'src/modules/old/Shows/actions/episodeEdit';
import { editEpisodeForm } from 'src/modules/old/Shows/reducers/editEpisodeForm';

interface PodcastEpisodeActions {
    deletePodcast: typeof deletePodcast;
    openEditEpisodeModal: typeof openEditEpisodeModal;
    editEpisodeForm: typeof editEpisodeForm;
    closeEditEpisodeModal: typeof closeEditEpisodeModal;
    updateEpisode: typeof updateEpisode;
}

interface Props extends PodcastEpisodeActions {
    episode: EpisodeModel;
    index: number;
}

export const PodcastEpisode: React.FC<Props> = ({
    episode,
    index,
    deletePodcast,
    updateEpisode,
    openEditEpisodeModal,
}) => {
    const deleteEpisode = () => deletePodcast(episode);

    const unpublishPodcast = () => {
        const { guid, show, released } = episode;

        if (window.confirm(`Are you sure you want to ${released ? 'unpublish' : 'publish'} this episode?`)) {
            updateEpisode(guid, show, { released: !released });
        }
    };

    const openSettings = () => openEditEpisodeModal(episode);

    return (
        <Container>
            <Row>
                <PlayButton episode={episode} />

                <EpisodeContent>
                    <PodcastTitle>{episode.title}</PodcastTitle>
                    <PodcastNumber>Episode {index}</PodcastNumber>
                </EpisodeContent>
            </Row>

            <Row>
                <PodcastDuration>{formatTime(episode.duration)}</PodcastDuration>

                <Dropdown
                    overlay={
                        <MenuOverlay
                            deletePodcast={deleteEpisode}
                            unpublishPodcast={unpublishPodcast}
                            openSettings={openSettings}
                            url={episode.url}
                            released={episode.released}
                        />
                    }
                >
                    <Icon type="setting" theme="filled" />
                </Dropdown>
            </Row>
        </Container>
    );
};
