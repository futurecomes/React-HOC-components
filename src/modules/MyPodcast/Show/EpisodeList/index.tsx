import { orderBy } from 'lodash';
import * as React from 'react';

import container from 'src/containers/Shows/ShowEpisodes';
import { PodcastEpisode } from '../PodcastEpisode';
import { EditEpisodeModal } from 'src/modules/old/Shows/EditEpisodeModal';
import { ShowModel, EpisodeModel } from '../../models';
import { fetchShowEpisodes } from 'src/actions/old';
import { deletePodcast } from 'src/api/editor';
import { openEditEpisodeModal, closeEditEpisodeModal, updateEpisode } from 'src/modules/old/Shows/actions/episodeEdit';

export interface EpisodeListActions {
    fetchShowEpisodes: typeof fetchShowEpisodes;
    deletePodcast: typeof deletePodcast;
    openEditEpisodeModal: typeof openEditEpisodeModal;
    editEpisodeForm: any;
    closeEditEpisodeModal: typeof closeEditEpisodeModal;
    updateEpisode: typeof updateEpisode;
}

interface Props extends EpisodeListActions {
    show: ShowModel;
    episodes: EpisodeModel;
    isUpdatingEpisode: boolean;
}

export const EpisodeListPure: React.FC<Props> = ({
    show,
    fetchShowEpisodes,
    episodes,
    editEpisodeForm,
    closeEditEpisodeModal,
    updateEpisode,
    isUpdatingEpisode,
    deletePodcast,
    openEditEpisodeModal,
}) => {
    React.useEffect(() => {
        fetchShowEpisodes(show.id);
    }, [show.id]);

    const getShowEpisodes = () =>
        episodes[show.id] ? orderBy(episodes[show.id], e => new Date(e.releasedAt).getTime()) : null;

    const showEpisodes = getShowEpisodes();

    return (
        <>
            {showEpisodes &&
                showEpisodes
                    .map((episode, i) => (
                        <>
                            <PodcastEpisode
                                key={episode.id}
                                index={i + 1}
                                episode={episode}
                                deletePodcast={deletePodcast}
                                updateEpisode={updateEpisode}
                                editEpisodeForm={editEpisodeForm}
                                closeEditEpisodeModal={closeEditEpisodeModal}
                                openEditEpisodeModal={openEditEpisodeModal}
                            />

                            {episode.guid === editEpisodeForm.guid && (
                                <EditEpisodeModal
                                    episode={episode}
                                    closeEditEpisodeModal={closeEditEpisodeModal}
                                    editEpisodeForm={editEpisodeForm}
                                    updateEpisode={updateEpisode}
                                    isUpdatingEpisode={isUpdatingEpisode}
                                />
                            )}
                        </>
                    ))
                    .reverse()}
        </>
    );
};

export const EpisodeList = container(EpisodeListPure);
