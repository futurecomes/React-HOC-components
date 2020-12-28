import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { togglePlay } from 'src/middlewares/audio';
import pauseIcon from 'src/public/img/icons/player/pauseBlack.svg';
import playIcon from 'src/public/img/icons/player/playBlack.svg';
import { EpisodeModel } from '../../models';
import { Image } from './style';

interface Props {
    episode: EpisodeModel;
    isPlaying: boolean;
    currentShowId: number;
    currentEpisodeId: string;
    togglePlay: typeof togglePlay;
}

export const PlayButtonPure: React.FC<Props> = ({
    isPlaying,
    currentShowId,
    currentEpisodeId,
    episode,
    togglePlay,
}) => {
    const shouldShowPauseIcon = isPlaying && episode.show === currentShowId && episode.guid === currentEpisodeId;

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        togglePlay(episode.show, episode.guid, null, episode);
    };

    return <Image src={shouldShowPauseIcon ? pauseIcon : playIcon} onClick={onClick} />;
};

const mapStateToProps = (state: AppState) => ({
    isPlaying: state.audio.player.isPlaying,
    currentShowId: state.audio.selectedPodcast.showId,
    currentEpisodeId: state.audio.selectedPodcast.episodeId,
});

export const PlayButton = connect(
    mapStateToProps,
    {
        togglePlay,
    },
)(PlayButtonPure);
