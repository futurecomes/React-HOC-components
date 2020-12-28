

import React from 'react';
import queryString from 'query-string';
import { Howl } from 'howler';

import request from 'src/api/core';
import logo from 'src/public/img/messy-logo-signet.svg';
import formatTime from 'src/shared/helpers/formatTime';

import playIcon from 'src/public/img/icons/player/play.svg';
import pauseIcon from 'src/public/img/icons/player/pause.svg';

import * as S from './playerEmbedStyles';

export default class PlayerEmbed extends React.Component {
    state = {
        playing: null,
        elapsedTime: 0,
        podcasts: [],
        error: '',
    };

    async componentDidMount() {
        const { show } = queryString.parse(this.props.location.search);
        if (!show) {
            return;
        }
        const query = queryString.stringify({ show });
        try {
            const {data} = await request.get(`podcast_player?${query}`);
            const releasedPodcasts = data.filter(podcast => podcast.released === true)
            this.setState({ podcasts: releasedPodcasts, playing: releasedPodcasts[0] });
            this.howler = this.howlerFactory(releasedPodcasts[0].url);
        } catch (error) {
            this.setState({ error: error.reason });
        }
    }

    howlerFactory = url =>
        new Howl({
            src: [url],
            preload: true,
            html5: true,
            onplay: this.play,
            onend: this.onEnd,
            onload: () => this.setState(state => ({ playing: { ...state.playing, duration: this.howler.duration() } })),
        });

    play = () => {
        this.playTime = this.playTime ? Date.now() - this.state.elapsedTime * 1000 : Date.now();
        this.setState({ isPlaying: true });
        this.interval = setInterval(() => this.setState({ elapsedTime: (Date.now() - this.playTime) / 1000 }), 200);
    };

    onEnd = () => {
        const currentEpisodeIndex = this.state.podcasts.findIndex(ep => ep.guid === this.state.playing.guid);
        const numberOfEpisodes = this.state.podcasts.length;
        this.setEpisodeToPlay((numberOfEpisodes + currentEpisodeIndex + 1) % numberOfEpisodes);
    };

    setEpisodeToPlay = index => {
        clearInterval(this.interval);
        this.howler.unload();
        this.setState({ isPlaying: false, elapsedTime: 0 });
        const nextEpisode = this.state.podcasts[index];
        this.setState({ playing: nextEpisode });
        this.howler = this.howlerFactory(nextEpisode.url);
    };

    onPlayClick = () => {
        this.howler.play();
    };

    onPauseClick = () => {
        clearInterval(this.interval);
        this.howler.pause();
        this.setState({ isPlaying: false });
    };

    onSeek = (e) => {
        this.howler.pause();
        clearInterval(this.interval);
        const { left, width } = e.target.getBoundingClientRect();

        if (e.clientX < left) {
            return;
        }

        const position = e.clientX - left;
        this.playTime = (position * this.state.playing.duration) / width;
        this.setState({ elapsedTime: this.playTime, isPlaying: false });
        this.howler.seek(this.playTime);
        this.howler.play();
    };

    render() {

        const {playing, elapsedTime, podcasts, error, isPlaying} = this.state;

        if (this.state.error) {
            return <p>{error}</p>;
        }

        if (!podcasts.length) {
            return null;
        }

        const { imageUrl, showTitle } = this.state.podcasts[0];

        return (
            <S.Wrapper>
            <S.Top>
            <S.LogoLink href="https://www.messy.fm" target="_blank" rel="noopener noreferrer">
            <img src={logo} height={40} alt="Messy.fm" />
            </S.LogoLink>
            <img src={imageUrl} height={100} alt="Show Art" />
            <S.TopWrapper>
            <S.Show>
            <S.ShowTitle>{showTitle}</S.ShowTitle>
            <S.EpisodeTitle>{playing.title}</S.EpisodeTitle>
            </S.Show>
            <S.ProgressWrapper>
            <span>{formatTime(elapsedTime)}</span>
            <S.ProgressBar
        onClick={(e) => {this.onSeek(e)}}
        width={`${(elapsedTime / playing.duration) * 100}%`}
        />
        <span>{formatTime(playing.duration)}</span>
        </S.ProgressWrapper>
        </S.TopWrapper>
        </S.Top>
        <S.TogglePlayButton onClick={isPlaying ? this.onPauseClick : this.onPlayClick} height={15}>
            <img
        src={isPlaying ? pauseIcon : playIcon}
        alt={isPlaying ? 'Pause' : 'Play'}
        />
        </S.TogglePlayButton>
        <S.Bottom>
        {podcasts.map((p, i) => (
                <S.Episode onClick={() => this.setEpisodeToPlay(i)} key={p.guid}>
            <span>{p.title}</span>
            </S.Episode>
    ))}
    </S.Bottom>
        </S.Wrapper>
    );
    }
}
