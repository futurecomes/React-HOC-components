import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import closeIcon from 'src/public/img/icons/player/close.svg';

import { AppState } from 'src/config/appState';
import * as audioMiddleware from 'src/middlewares/audio';
import { Episode } from 'src/modules/Podcasts/models/podcasts';
import { getCurrentShowTitle } from 'src/modules/Podcasts/selectors/podcastsSelectors';
import { getIsPlayerModalVisible } from 'src/modules/UI/selectors/uiSelectors';
import { color, media } from 'src/styles/variables';

import { EpisodeInfo } from '../components/EpisodeInfo';
import { RateAndVolume } from '../components/RateAndVolume';
import { TimeSlider } from '../components/TimeSlider';
import { TrackButtons } from '../components/TrackButtons';
import { AdData, PlayerData } from '../models/audio';
import { getAdData, getCurrentPodcast, getPlayerData } from '../selectors/audioSelectors';
import { RateControl } from '../components/RateControl';

interface PlayBarWrapperProps {
    display: number; // Throws error in console if boolean
}

const PlayBarWrapper = styled.div<PlayBarWrapperProps>(({ display }) => ({
    display: 'block',
    visibility: display ? 'visible' : 'hidden',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: display ? 0 : '-50%',
    zIndex: 10,
    backgroundColor: color.blackPearl,
    borderTop: `1px solid ${color.trout}`,
    transition: 'bottom 0.3s ease-in-out',
}));

const Content = styled(Row)({
    maxWidth: media.contentWidth,
    margin: '0 auto',
    padding: '0.5rem',
    flexDirection: 'column',
    [media.sm]: {
        padding: '0.5rem 1.5rem',
    },
    [media.md]: {
        padding: '0.5rem 2.5rem',
    },
    [media.lg]: {
        flexDirection: 'row',
    },
});

const Controls = styled(Col)({
    display: 'flex',
    paddingRight: '1rem',
    padding: '0 0.5rem',
    flexWrap: 'wrap',
    [media.sm]: {
        padding: 0,
    },
    [media.md]: {
        flexWrap: 'nowrap',
    },
});

const CloseButton = styled.button({
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    opacity: 0.7,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    img: {
        width: '100%',
    },
    [media.lg]: {
        top: '1.25rem',
    },
    '&:hover': {
        opacity: 1,
    },
});

interface StateProps {
    podcast: Episode;
    player: PlayerData;
    ad: AdData;
    isVisible?: boolean;
    currentShowTitle?: string;
}

interface ActionsProps {
    togglePlay: typeof audioMiddleware.togglePlay;
    toggleBar: typeof audioMiddleware.toggleBar;
    seekToTime: typeof audioMiddleware.seekToTime;
    setVolume: typeof audioMiddleware.setVolume;
    setPlayer: typeof audioMiddleware.setPlayer;
    cycleRate: typeof audioMiddleware.cycleRate;
}

type Props = StateProps & ActionsProps;

class PlayBarContainer extends React.Component<Props> {
    private handleCloseBar = () => this.props.toggleBar(true, true);

    public render(): JSX.Element {
        const { podcast, togglePlay, seekToTime, setVolume, cycleRate, ad, player, currentShowTitle } = this.props;

        return (
            <PlayBarWrapper display={podcast.guid !== -1 ? 1 : 0}>
                <Content type="flex" align="middle">
                    <EpisodeInfo
                        title={player.isAd ? ad.adName || 'Messy Ad' : podcast.title}
                        showId={podcast.show}
                        showTitle={podcast.showTitle || currentShowTitle}
                        imageUrl={podcast.imageUrl}
                    />
                    <Controls xs={24} lg={14}>
                        <TrackButtons
                            isPlaying={player.isPlaying}
                            currentTime={player.currentTime}
                            onTogglePlay={togglePlay}
                            onSeekToTime={seekToTime}
                            disabled={player.isAd}
                        >
                            <RateControl rate={player.rate} onCycleRate={cycleRate} />
                        </TrackButtons>
                        <TimeSlider
                            duration={player.duration}
                            currentTime={player.currentTime}
                            disabled={player.disabled}
                            onSeekToTime={seekToTime}
                        />
                        <RateAndVolume
                            rate={player.rate}
                            volume={player.volume}
                            onCycleRate={cycleRate}
                            onSetVolume={setVolume}
                            hideOnMobile
                        />
                    </Controls>
                </Content>
                <CloseButton onClick={this.handleCloseBar} tabIndex={0}>
                    <img src={closeIcon} alt="Close Player" />
                </CloseButton>
            </PlayBarWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    podcast: getCurrentPodcast(state),
    player: getPlayerData(state),
    ad: getAdData(state),
    isVisible: getIsPlayerModalVisible(state),
    currentShowTitle: getCurrentShowTitle(state), // There is no title in episode data if played from Show page
});

export const PlayBar = connect(
    mapStateToProps,
    {
        togglePlay: audioMiddleware.togglePlay,
        toggleBar: audioMiddleware.toggleBar,
        seekToTime: audioMiddleware.seekToTime,
        setVolume: audioMiddleware.setVolume,
        setPlayer: audioMiddleware.setPlayer,
        cycleRate: audioMiddleware.cycleRate,
    },
)(PlayBarContainer);
