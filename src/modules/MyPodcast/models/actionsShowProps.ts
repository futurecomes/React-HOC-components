import { editShow } from 'src/actions/old/shows';
import { submitProtectPodcast, submitUnprotectPodcast } from 'src/modules/old/Shows/thunks/api';
import { openUnprotectPodcastModal, closeUnprotectPodcastModal } from 'src/modules/old/Shows/actions';
import { editorInitialize, selectShow, setEpisodeDescription, setEpisodeName } from 'src/actions/old/editor';

export interface ActionsShowProps {
    editShow: typeof editShow;
    submitProtectPodcast: typeof submitProtectPodcast;
    openUnprotectPodcastModal: typeof openUnprotectPodcastModal;
    editorInitialize: typeof editorInitialize;
    selectShow: typeof selectShow;
    setEpisodeDescription: typeof setEpisodeDescription;
    setEpisodeName: typeof setEpisodeName;
    closeUnprotectPodcastModal: typeof closeUnprotectPodcastModal;
    submitUnprotectPodcast: typeof submitUnprotectPodcast;
    unprotectPodcastModal: any;
}
