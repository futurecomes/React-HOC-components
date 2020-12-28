import { Icon } from 'antd';
import React, { FunctionComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import * as audioMiddleware from 'src/middlewares/audio';
import { Episode } from 'src/modules/Podcasts/models/podcasts';
import { getCurrentPlayingPodcastGuid, isAudioPlaying } from 'src/modules/Podcasts/Show/showSelectors';

export const StyledIconPlayButton = styled(Icon)({
    position: 'relative',
    display: 'block',
    fontSize: 'unset',
});

interface StateProps {
    isPlaying: boolean;
    currentPlayingPodcastGuid?: string;
}

interface ActionsProps {
    togglePlay: typeof audioMiddleware.togglePlay;
}

interface Props extends StateProps, ActionsProps {
    episode: Partial<Episode>;
}

export const PlayButtonContainer: FunctionComponent<Props> = ({
    togglePlay,
    isPlaying,
    currentPlayingPodcastGuid,
    episode,
}) => {
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // these arguments are required by old code implementation
        isPlaying ? togglePlay(false) : togglePlay(episode.show, episode.guid, true, episode);
    };

    const currentIcon = currentPlayingPodcastGuid === episode.guid && isPlaying ? 'pause-circle' : 'play-circle';

    return (
        <StyledIconPlayButton
            // Double checking if episode is playing beacause information about play and current episode playing is implemented separately currently
            type={currentIcon}
            onClick={onClick}
        />
    );
};

export const PlayButton = connect(
    (state: AppState) => ({
        currentPlayingPodcastGuid: getCurrentPlayingPodcastGuid(state),
        isPlaying: isAudioPlaying(state),
    }),
    { togglePlay: audioMiddleware.togglePlay },
)(PlayButtonContainer);
