import { createElement } from 'react';
import { connect } from 'react-redux';

import { togglePlay } from 'src/middlewares/audio';
import PlayButton from 'src/shared/components/old/interactive/PlayButton';
import PauseButton from 'src/shared/components/old/interactive/PauseButton';

const TogglePlayButtonContainer = ({
    isPlaying,
    onClick,
    podcast,
    currentShowId,
    currentEpisodeId,
    isSmall,
    className,
}) =>
    createElement(
        isPlaying && podcast.show === currentShowId && podcast.guid === currentEpisodeId ? PauseButton : PlayButton,
        {
            onClick: e => {
                e.stopPropagation();
                onClick(podcast.show, podcast.guid, null, podcast);
            },
            isSmall,
            className,
        },
        null,
    );

const mapStateToProps = state => ({
    isPlaying: state.audio.player.isPlaying,
    currentShowId: state.audio.selectedPodcast.showId,
    currentEpisodeId: state.audio.selectedPodcast.episodeId,
});

export const TogglePlayButton = connect(
    mapStateToProps,
    {
        onClick: togglePlay,
    },
)(TogglePlayButtonContainer);
