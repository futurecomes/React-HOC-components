import { fetchShow } from 'src/api/podcasts';

import PodcastApi from 'src/api/podcasts';
import FreeMusicApi from 'src/api/freeMusic';
import { fetchShowEpisodesFulfilled } from 'src/modules/old/Shows/actions';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import { editorFinishPublish, editorInitialize } from 'src/actions/old/editor';

export const PODCASTS_IS_FETCHING = 'PODCASTS_IS_FETCHING';
export const podcastsIsFetching = (isFetching = true) => ({
    type: PODCASTS_IS_FETCHING,
    payload: isFetching,
});
export const PODCASTS_DONE_FETCHING = 'PODCASTS_DONE_FETCHING';

export const PODCASTS_FETCH_SUBSCRIBED = 'PODCASTS_FETCH_SUBSCRIBED';
export function fetchSubscribedPodcasts(userId) {
    return (dispatch, getState) => {
        const {
            auth: { user },
        } = getState();

        const id = userId || (user && user.id);
        dispatch(podcastsIsFetching());

        if (id) {
            PodcastApi.fetchSubscribedPodcasts(id).then(data =>
                dispatch({
                    type: PODCASTS_FETCH_SUBSCRIBED,
                    payload: data,
                }),
            );
        }
    };
}

export const PODCASTS_FETCH_UNPLAYED = 'PODCASTS_FETCH_UNPLAYED';
export function fetchUnplayedPodcasts() {
    return (dispatch, getState) => {
        const {
            auth: { token },
        } = getState();

        dispatch(podcastsIsFetching());

        if (token) {
            PodcastApi.fetchUnplayedPodcasts(token).then(data =>
                dispatch({
                    type: PODCASTS_FETCH_UNPLAYED,
                    payload: data,
                }),
            );
        }
    };
}

export const PODCASTS_FETCH_AUTHORED = 'PODCASTS_FETCH_AUTHORED';
export function fetchAuthoredPodcasts(userId) {
    return (dispatch, getState) => {
        const {
            auth: { user },
        } = getState();

        const id = userId || (user && user.id);

        dispatch(podcastsIsFetching());

        if (id) {
            PodcastApi.fetchAuthoredPodcasts(id).then(data =>
                dispatch({
                    type: PODCASTS_FETCH_AUTHORED,
                    payload: data.reduce((ret, show) => {
                        // eslint-disable-next-line no-param-reassign
                        ret[show.id] = show;
                        return ret;
                    }, {}),
                }),
            );
        }
    };
}

export const PODCASTS_FETCH_EPISODES = 'PODCASTS_FETCH_EPISODES';
export const PODCASTS_FETCH_SHOW = 'PODCASTS_FETCH_SHOW';
export const podcastFetchShow = show => ({
    type: PODCASTS_FETCH_SHOW,
    payload: show,
});
export const PODCASTS_FETCH_IS_SUBSCRIBED = 'PODCASTS_FETCH_IS_SUBSCRIBED';
export const PODCASTS_FETCH_UNPLAYED_COUNT = 'PODCASTS_FETCH_UNPLAYED_COUNT';
export const PODCASTS_FETCH_IS_PLAYED = 'PODCASTS_FETCH_IS_PLAYED';
export const fetchPodcastData = id => (dispatch, getState) => {
    const {
        auth: { token, user },
        podcasts,
    } = getState();

    if (!podcasts.shows[id]) {
        dispatch(podcastsIsFetching());
    }

    fetchShow(id).then(data => dispatch(podcastFetchShow(data)));

    PodcastApi.fetchEpisodes(id)
        .then(data => {
            dispatch(fetchShowEpisodesFulfilled({ episodes: data, showId: id }));
            return data;
        })
        .then(episodes => {
            if (!token) {
                return null;
            }

            // const requests = episodes.map(episode => PodcastApi.fetchIsPlayed(token, user.id, episode.id));
            //
            // return Promise.all(requests).then(data => {
            //     data.forEach(datum =>
            //         dispatch({
            //             type: PODCASTS_FETCH_IS_PLAYED,
            //             payload: {
            //                 show: id,
            //                 episode: datum.episode,
            //                 isPlayed: datum.isPlayed,
            //             },
            //         }),
            //     );
            // });
        });

    if (token) {
        PodcastApi.fetchIsSubscribed(token, user.id, id).then(data =>
            dispatch({
                type: PODCASTS_FETCH_IS_SUBSCRIBED,
                payload: {
                    show: id,
                    isSubscribed: !!data.active,
                },
            }),
        );

        PodcastApi.fetchUnplayedPodcasts(token).then(data =>
            dispatch({
                type: PODCASTS_FETCH_UNPLAYED_COUNT,
                payload: {
                    show: id,
                    unplayedCount: data.filter(e => e.show === id).length,
                },
            }),
        );
    }
};

export const fetchPodcast = customUrl => (dispatch, getState) => {
    const {
        auth: { token, user },
    } = getState();

    dispatch(podcastsIsFetching());

    PodcastApi.fetchShowWithUrl(customUrl).then(show => {
        dispatch(podcastFetchShow(show));
        PodcastApi.fetchEpisodes(show.id).then(episodes => {
            dispatch(fetchShowEpisodesFulfilled({ episodes, showId: show.id }));

            if (token) {
                PodcastApi.fetchIsSubscribed(token, user.id, show.id).then(subscription => {
                    dispatch({
                        type: PODCASTS_FETCH_IS_SUBSCRIBED,
                        payload: {
                            show: show.id,
                            isSubscribed: !!subscription.active,
                        },
                    });

                    PodcastApi.fetchUnplayedPodcasts(token).then(unplayedEpisodes => {
                        dispatch({
                            type: PODCASTS_FETCH_UNPLAYED_COUNT,
                            payload: {
                                show: show.id,
                                unplayedCount: unplayedEpisodes.filter(e => e.show === show.id).length,
                            },
                        });
                    });
                });
            } else {
                dispatch({
                    type: PODCASTS_DONE_FETCHING,
                });
            }
        });
    });
};

export const PODCASTS_FETCH_CATEGORIES = 'PODCASTS_FETCH_CATEGORIES';
export function fetchCategories() {
    return (dispatch, getState, token) => {
        PodcastApi.fetchCategories(token).then(categories =>
            dispatch({
                type: PODCASTS_FETCH_CATEGORIES,
                payload: categories.filter(c => c),
            }),
        );
    };
}

export const PODCASTS_SET_SEARCH_TERM = 'PODCASTS_SET_SEARCH_TERM';
export function setSearchTerm(term = '') {
    return {
        type: PODCASTS_SET_SEARCH_TERM,
        payload: term,
    };
}

export const PODCASTS_SET_SORT_BY = 'PODCASTS_SET_SORT_BY';
export function setSortBy(tab) {
    return {
        type: PODCASTS_SET_SORT_BY,
        payload: tab,
    };
}

export const PODCASTS_SET_CATEGORY = 'PODCASTS_SET_CATEGORY';
export function setCategory(category) {
    return dispatch => {
        dispatch({
            type: PODCASTS_SET_CATEGORY,
            payload: category,
        });
    };
}

export const PODDCASTS_SUBSCRIBE = 'PODCASTS_SUBSCRIBE';
export function subscribe(showId) {
    return (dispatch, getState) => {
        const {
            auth: { token, user },
        } = getState();

        if (!user.id) {
            return;
        }

        PodcastApi.fetchIsSubscribed(token, user.id, showId).then(subscription =>
            PodcastApi.toggleSubscribe(token, subscription.id, user.id, showId).then(data =>
                dispatch({
                    type: PODCASTS_FETCH_IS_SUBSCRIBED,
                    payload: {
                        show: showId,
                        isSubscribed: !!data.active,
                    },
                }),
            ),
        );
    };
}

export const PODCASTS_CREATE = 'PODCASTS_CREATE';

// helper to populate the BE with free_music_instance objects
// whenever free music was used in an episode
function createFreeMusicInstances(token, podcastId, showId, editorSnippets) {
    const freeMusicIds = [];
    editorSnippets.forEach(snippet => {
        if (snippet.isFreeMusic && !freeMusicIds.includes(snippet.freeMusicId)) {
            freeMusicIds.push(snippet.freeMusicId);
            FreeMusicApi.createFreeMusicInstance(token, podcastId, showId, snippet.freeMusicId);
        }
    });
}

export function createPodcast(audioUrl) {
    return (dispatch, getState) => {
        const {
            auth: { token, user },
            editorMeta: { showIdx, episodeName, episodeDescription, release, releaseDate },
            editor: {
                present: { latestSnippetTime, layerRecordings },
            },
        } = getState();

        if (!user.id) {
            return;
        }

        const date = new Date();

        const isLater = release === 'later';

        PodcastApi.createEpisode(token, {
            title: mapHtmlToString(episodeName),
            description: mapHtmlToString(episodeDescription),
            show: showIdx,
            url: audioUrl,
            editor_used: true,
            recorder_used: true,
            creator: user.id,
            creator_name: user.name,
            duration: latestSnippetTime,
            releaseDate: isLater && releaseDate ? releaseDate.seconds(0).toISOString() : date,
        }).then(episode => {
            dispatch({
                type: PODCASTS_CREATE,
                payload: episode,
            });
            createFreeMusicInstances(token, episode.guid, showIdx, layerRecordings);
            dispatch(editorFinishPublish());
            dispatch(editorInitialize());
        });
    };
}

export const PODCASTS_SUBMIT_PLAYED = 'PODCASTS_SUBMIT_PLAYED';
export function submitPlayed({ podcast, show }) {
    return (dispatch, getState) => {
        const {
            auth: { user, token },
        } = getState();

        const userId = user && user.id;
        const payload = {
            user: userId || 'anonymous',
            podcast,
            show,
            finished: false,
        };

        PodcastApi.submitPlayed(token, payload).then(data =>
            dispatch({
                type: PODCASTS_SUBMIT_PLAYED,
                payload: data,
            }),
        );
    };
}

export const PODCASTS_UPDATE_PLAYED = 'PODCASTS_UPDATE_PLAYED';
export function updatePlayed() {
    return (dispatch, getState) => {
        const {
            auth: { user, token },
            podcasts: {
                play: { played },
            },
            audio: { currentPodcast },
        } = getState();

        const userId = user && user.id;
        const id = played && played.id;
        const payload = {
            user: userId,
            podcast: currentPodcast.id,
            show: currentPodcast.show,
            finished: true,
        };

        if (userId && id && token) {
            PodcastApi.updatePlayed(token, id, payload).then(data =>
                dispatch({
                    type: PODCASTS_UPDATE_PLAYED,
                    payload: data,
                }),
            );
        }
    };
}

export const PODCASTS_REGISTER_LISTEN = 'PODCASTS_REGISTER_LISTEN';
export function registerListen({ podcast: id }) {
    return dispatch => {
        if (id) {
            PodcastApi.registerListen(id).then(data =>
                dispatch({
                    type: PODCASTS_REGISTER_LISTEN,
                    payload: data,
                }),
            );
        }
    };
}
