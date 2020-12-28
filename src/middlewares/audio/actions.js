import { Howl } from 'howler';
import _sample from 'lodash/sample';

import { submitPlayed, registerListen, updatePlayed } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { registerAd } from 'src/actions/old/ads';

let adAudio;
let intervalId;

export const AUDIO_SET_AD = 'AUDIO_SET_AD';
function streamAudioAd(dispatch, store) {
    const {
        ads: { audioAds = [] },
        audio: {
            currentPodcast: { id: podcast, show },
            player: { volume },
        },
    } = store;

    const resumePlay = () => {
        if (adAudio) {
            dispatch({
                type: AUDIO_SET_AD,
                payload: {
                    isAd: false,
                },
            });

            if (window.audio && store.audio.currentPodcast.id !== -1) {
                window.audio.play();
            }

            adAudio = null;
        }
    };

    const ad = _sample(audioAds);
    if (!ad) {
        return;
    }

    if (!adAudio && ad.url) {
        adAudio = new Howl({
            src: [ad.url],
            preload: true,
            html5: true,
            volume: volume / 100,
            autoplay: true,
            onplay: () => {
                if (window.audio) {
                    window.audio.pause();
                }

                dispatch({
                    type: AUDIO_SET_AD,
                    payload: {
                        ad,
                        isAd: true,
                    },
                });
            },
            onstop: resumePlay,
            onend: () => {
                dispatch(registerAd(ad.id, { show, podcast }));
                resumePlay();
            },
            onloaderror: resumePlay,
        });
    }
}

export const AUDIO_SET_ELAPSED_TIME = 'AUDIO_SET_ELAPSED_TIME';
function handleUpdateTime() {
    return (dispatch, getStore) => {
        const {
            audio: {
                player: { currentTime: currentTimeState, duration, rate },
            },
        } = getStore();

        let currentTime = currentTimeState;
        if (currentTime < duration) {
            currentTime += 0.5 * rate;
        } else {
            currentTime = 0;
        }

        // Mid Ads
        // if (currentTime > (duration / 2) - 10 && !midAd) {
        //   streamAudioAd(dispatch, getStore(), 'mid');
        // }

        dispatch({
            type: AUDIO_SET_ELAPSED_TIME,
            payload: currentTime,
        });
    };
}

export const AUDIO_SET_INTERVAL = 'AUDIO_SET_INTERVAL';
function handleStartCounter(dispatch) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = window.setInterval(() => {
        dispatch(handleUpdateTime());
    }, 500);

    dispatch({
        type: AUDIO_SET_INTERVAL,
        payload: intervalId,
    });
}

export const AUDIO_TOGGLE_PLAY = 'AUDIO_TOGGLE_PLAY';
export function togglePlay(showId, episodeId, force, currentPodcast) {
    return {
        type: AUDIO_TOGGLE_PLAY,
        payload: {
            showId,
            episodeId,
            currentPodcast,
            force,
        },
    };
}

export const AUDIO_TOGGLE_BAR = 'AUDIO_TOGGLE_BAR';
export function toggleBar(force = false, close = false) {
    return {
        type: AUDIO_TOGGLE_BAR,
        payload: {
            force,
            close,
        },
    };
}

export const AUDIO_HIDE_BAR = 'AUDIO_HIDE_BAR';
function handleToggleBar({ payload }) {
    return (dispatch, getStore) => {
        const {
            audio: {
                player: { hide },
            },
        } = getStore();

        dispatch({
            type: AUDIO_HIDE_BAR,
            payload: {
                hide: payload.force === true ? true : !hide,
                close: payload.close,
            },
        });

        if (payload.close && window.audio) {
            window.audio.stop();
        }
    };
}

export const AUDIO_STOP_PLAYBACK = 'AUDIO_STOP_PLAYBACK';
export const AUDIO_START_PLAYBACK = 'AUDIO_START_PLAYBACK';
function handleStopCounter() {
    if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
    }
}

export const AUDIO_SET_CURRENT_TIME = 'AUDIO_SET_CURRENT_TIME';
function handleSeekToTime({ payload }) {
    return (dispatch, getStore) => {
        // Most likely will actually call some audio player function and time will be updated
        // by the player async
        const {
            audio: {
                player: { duration },
            },
        } = getStore();

        let currentTime = payload < 0 ? 0 : payload;
        if (window.audio) {
            currentTime = currentTime > duration ? duration : currentTime;
            window.audio.seek(currentTime);
        }

        dispatch({
            type: AUDIO_SET_CURRENT_TIME,
            payload: currentTime,
        });
    };
}

function getAudioPlayer(dispatch, store) {
    const {
        // ads: {
        //   audioAds = [],
        // },
        audio: {
            currentPodcast,
            // currentPodcast: {showExpanded = []},
            player: { volume, currentTime, isPlaying },
        },
    } = store;

    // const adsEnabled = showExpanded[0] && showExpanded[0].adsEnabled;
    const shouldPlayAd = false;
    // audioAds.length && adsEnabled;xe
    if (!window.audio && currentPodcast && currentPodcast.url) {
        window.audio = new Howl({
            src: [currentPodcast.url],
            preload: true,
            html5: true,
            volume: volume / 100,
            autoplay: isPlaying,
            onplay: () => {
                handleStartCounter(dispatch);
            },
            onpause: () => {
                handleStopCounter();
            },
            onresume: () => {
                // This is never triggered
            },
            onstop: () => {
                handleStopCounter();
            },
            onseek: () => {
                // Can't do this cos there's no follow-up event to restart the timer
                // handleStopCounter();
            },
            onload: () => {
                if (!isPlaying) {
                    dispatch(
                        handleSeekToTime({
                            payload: 0,
                        }),
                    );
                }

                if (!shouldPlayAd && isPlaying) {
                    if (!window.audio.playing()) {
                        window.audio.play();
                    }
                }
            },
            onend: () => {
                handleStopCounter();
                dispatch(
                    handleSeekToTime({
                        payload: 0,
                    }),
                );
                window.audio.stop();
                dispatch(updatePlayed());
                dispatch({
                    type: AUDIO_HIDE_BAR,
                    payload: { hide: true },
                });
                dispatch({
                    type: AUDIO_STOP_PLAYBACK,
                    payload: {
                        isPlaying: false,
                    },
                });
            },
        });

        window.audio.seek(currentTime);
        if (shouldPlayAd) {
            streamAudioAd(dispatch, store);
        }
    }

    return window.audio;
}

export const AUDIO_PLAY_PODCAST = 'AUDIO_PLAY_PODCAST';
function handleTogglePlay(action) {
    return (dispatch, getState) => {
        const {
            audio: {
                player: { isPlaying: isStatePlaying },
                selectedPodcast: { showId, episodeId },
            },
        } = getState();
        if (
            action.payload.showId === undefined ||
            action.payload.episodeId === undefined ||
            (showId === action.payload.showId && episodeId === action.payload.episodeId)
        ) {
            const isPlaying = action.payload.force === true ? false : isStatePlaying;

            if (getState().audio.currentPodcast.guid !== action.payload.episodeId && episodeId !== -1) {
                setTimeout(() => {
                    dispatch(registerListen({ podcast: episodeId, show: showId }));
                    dispatch(submitPlayed({ podcast: episodeId, show: showId }));
                }, 1000);
            }

            const audio = getAudioPlayer(dispatch, getState());
            if (action.payload.force === false) {
                return;
            }
            if (audio) {
                if (isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }

            dispatch({
                type: isPlaying ? AUDIO_STOP_PLAYBACK : AUDIO_START_PLAYBACK,
            });
        } else {
            if (window.audio) {
                window.audio.pause();
            }
            dispatch({
                type: AUDIO_PLAY_PODCAST,
                payload: action.payload,
            });
        }
    };
}

export const AUDIO_SET_CURRENT_PODCAST = 'AUDIO_SET_CURRENT_PODCAST';
function handlePlayPodcast({ payload }) {
    return (dispatch, getState) => {
        dispatch({
            type: AUDIO_STOP_PLAYBACK,
        });

        if (window.audio) {
            window.audio.stop();
        }

        const currentPodcast = payload.currentPodcast;

        // midAd = false;
        if (window.audio) {
            window.audio.stop();
            delete window.audio;
        }

        dispatch(registerListen({ podcast: payload.episodeId, show: payload.showId }));
        dispatch(submitPlayed({ podcast: payload.episodeId, show: payload.showId }));
        getAudioPlayer(dispatch, {
            ...getState(),
            audio: {
                ...getState().audio,
                currentPodcast,
                player: {
                    ...getState().audio.player,
                    isPlaying: true,
                    currentTime: 0,
                },
            },
        });
        dispatch({
            type: AUDIO_SET_CURRENT_PODCAST,
            payload: {
                selectedPodcast: {
                    episodeId: payload.episodeId,
                    showId: payload.showId,
                },
                currentPodcast,
            },
        });

        dispatch({
            type: AUDIO_START_PLAYBACK,
        });
    };
}

export const AUDIO_SEEK_TO_TIME = 'AUDIO_SEEK_TO_TIME';
export function seekToTime(time) {
    return {
        type: AUDIO_SEEK_TO_TIME,
        payload: time,
    };
}

export const AUDIO_SET_PLAYER = 'AUDIO_SET_PLAYER';
export function setPlayer(audioPlayer) {
    return {
        type: AUDIO_SET_PLAYER,
        payload: audioPlayer,
    };
}

export const AUDIO_SET_CURRENT_PLAYER = 'AUDIO_SET_CURRENT_PLAYER';
export function handleSetPlayer({ payload }) {
    return (dispatch, getStore) => {
        const {
            audio: {
                player: { audioPlayer: oldAudioPlayer },
            },
        } = getStore();

        if (oldAudioPlayer) {
            oldAudioPlayer.stop();
        }

        dispatch({
            type: AUDIO_SET_CURRENT_PLAYER,
            payload,
        });
    };
}

export const AUDIO_SET_VOLUME = 'AUDIO_SET_VOLUME';
export function setVolume(volume) {
    return {
        type: AUDIO_SET_VOLUME,
        payload: volume,
    };
}

export const AUDIO_SET_CURRENT_VOLUME = 'AUDIO_SET_CURRENT_VOLUME';
function handleSetVolume({ payload }) {
    return dispatch => {
        // Most likely will actually call some audio player function and volume will be updated
        // by the player async
        if (window.audio) {
            window.audio.volume(payload / 100);
        }

        if (adAudio) {
            adAudio.volume(payload / 100);
        }

        dispatch({
            type: AUDIO_SET_CURRENT_VOLUME,
            payload,
        });
    };
}

export const AUDIO_CYCLE_RATE = 'AUDIO_CYCLE_RATE';
export function cycleRate() {
    return {
        type: AUDIO_CYCLE_RATE,
    };
}

const RATES_MAP = {
    0.5: 1,
    1: 1.5,
    1.5: 2,
    2: 0.5,
};

export const AUDIO_SET_PLAYBACK_RATE = 'AUDIO_SET_PLAYBACK_RATE';
function handleCycleRate() {
    return (dispatch, getStore) => {
        const {
            audio: {
                player: { rate },
            },
        } = getStore();
        const payload = RATES_MAP[rate];
        if (window.audio) {
            window.audio.rate(payload);
        }
        // Most likely will actually call some audio player function and volume will be updated
        // by the player async
        dispatch({
            type: AUDIO_SET_PLAYBACK_RATE,
            payload,
        });
    };
}

export const handlers = {
    [AUDIO_TOGGLE_PLAY]: handleTogglePlay,
    [AUDIO_TOGGLE_BAR]: handleToggleBar,
    [AUDIO_SET_PLAYER]: handleSetPlayer,
    [AUDIO_PLAY_PODCAST]: handlePlayPodcast,
    [AUDIO_SEEK_TO_TIME]: handleSeekToTime,
    [AUDIO_SET_VOLUME]: handleSetVolume,
    [AUDIO_CYCLE_RATE]: handleCycleRate,
};
