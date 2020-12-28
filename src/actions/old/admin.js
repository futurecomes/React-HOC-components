import AdminApi from 'src/api/admin';
import AdsApi from 'src/api/ads';
import AuthApi from 'src/api/auth';
import FreeMusicApi from 'src/api/freeMusic';
import PodcastsApi from 'src/api/podcasts';

import { clearMessages, setErrors, setSuccesses } from './messages';
import { determinePlan } from 'src/shared/components/old/Billing/helpers';
import { getDuration } from 'src/shared/helpers/getDuration';

export const ADMIN_IS_FETCHING = 'ADMIN_IS_FETCHING';
export const ADMIN_FETCH_COMPLETE = 'ADMIN_FETCH_COMPLETE';

function downloadCsvData(fileName, data) {
    const csvData = data;
    const blob = new Blob([csvData], {
        type: 'application/csv;charset=utf-8;',
    });

    if (window.navigator.msSaveBlob) {
        // FOR IE BROWSER
        navigator.msSaveBlob(blob, fileName);
    } else {
        // FOR OTHER BROWSERS
        const link = document.createElement('a');
        const csvUrl = URL.createObjectURL(blob);
        link.href = csvUrl;
        link.style.display = 'none';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export const ADMIN_FETCH_PODCAST_ANALYTICS = 'ADMIN_FETCH_PODCAST_ANALYTICS';
export const ADMIN_FETCH_USER_ANALYTICS = 'ADMIN_FETCH_USER_ANALYTICS';
export const ADMIN_FETCH_AUDIO_AD_ANALYTICS = 'ADMIN_FETCH_AUDIO_AD_ANALYTICS';
export const ADMIN_FETCH_VISUAL_AD_ANALYTICS = 'ADMIN_FETCH_VISUAL_AD_ANALYTICS';
export const ADMIN_FETCH_TOOL_ANALYTICS = 'ADMIN_FETCH_TOOL_ANALYTICS';

export const ADMIN_FETCH_USERS = 'ADMIN_FETCH_USERS';
export function fetchUsers(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchUsers(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_USERS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_USER = 'ADMIN_FETCH_USER';
export const ADMIN_FETCH_USER_PLAN = 'ADMIN_FETCH_USER_PLAN';
export function fetchUser(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = [AdminApi.fetchUser(token, id)];

        return Promise.all(requests).then(responses => {
            const user = responses[0];
            const payments = responses[1];

            dispatch({
                type: ADMIN_FETCH_USER,
                payload: user,
            });

            return dispatch({
                type: ADMIN_FETCH_USER_PLAN,
                payload: determinePlan(payments),
            });
        });
    };
}

export const ADMIN_FETCH_USER_LOGS = 'ADMIN_FETCH_USER_LOGS';
export const ADMIN_FETCH_USER_LOGS_REJECTED = 'ADMIN_FETCH_USER_LOGS_REJECTED';
export const fetchUserLogs = (...args) => async (dispatch, getState) => {
    const {
        auth: { token },
    } = getState();

    dispatch({
        type: ADMIN_IS_FETCHING,
    });

    try {
        const res = await AdminApi.fetchUserLogs(token, ...args);
        dispatch({
            type: ADMIN_FETCH_USER_LOGS,
            payload: res,
        });
    } catch (err) {
        dispatch({
            type: ADMIN_FETCH_USER_LOGS_REJECTED,
        });
    }
};

export const ADMIN_FETCH_USER_SHOWS = 'ADMIN_FETCH_USER_SHOWS';
export function fetchUserShows(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchUserShows(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_USER_SHOWS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_SHOWS = 'ADMIN_FETCH_SHOWS';
export function fetchShows(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchShows(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_SHOWS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_SHOW = 'ADMIN_FETCH_SHOW';
export const ADMIN_FETCH_CATEGORIES = 'ADMIN_FETCH_CATEGORIES';
export function fetchShow(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = [PodcastsApi.fetchShow(id), PodcastsApi.fetchCategories(token)];

        return Promise.all(requests).then(responses => {
            const show = responses[0];
            const categories = responses[1];

            dispatch({
                type: ADMIN_FETCH_CATEGORIES,
                payload: categories,
            });

            return dispatch({
                type: ADMIN_FETCH_SHOW,
                payload: show,
            });
        });
    };
}

export const ADMIN_FETCH_SHOW_ANALYTICS = 'ADMIN_FETCH_SHOW_ANALYTICS';
export function fetchShowAnalytics(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchShowAnalytics(token, id).then(res =>
            dispatch({
                type: ADMIN_FETCH_SHOW_ANALYTICS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_EPISODES = 'ADMIN_FETCH_EPISODES';
export function fetchEpisodes(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchEpisodes(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_EPISODES,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_EPISODE = 'ADMIN_FETCH_EPISODE';
export function fetchEpisode(id) {
    return dispatch => {
        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return PodcastsApi.fetchEpisode(id).then(episode => {
            dispatch({
                type: ADMIN_FETCH_EPISODE,
                payload: episode,
            });

            return PodcastsApi.fetchShow(episode.show).then(show =>
                dispatch({
                    type: ADMIN_FETCH_SHOW,
                    payload: show,
                }),
            );
        });
    };
}

export const ADMIN_FETCH_AUDIO_ADS = 'ADMIN_FETCH_AUDIO_ADS';
export function fetchAudioAdsByShow(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchAudioAdsByShow(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_AUDIO_ADS,
                payload: res,
            }),
        );
    };
}

export function fetchAudioAdsByEpisode(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchAudioAdsByEpisode(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_AUDIO_ADS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_ACTIVE_AUDIO_ADS = 'ADMIN_FETCH_ACTIVE_AUDIO_ADS';
export function fetchActiveAudioAds(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchActiveAudioAds(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_ACTIVE_AUDIO_ADS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_INACTIVE_AUDIO_ADS = 'ADMIN_FETCH_INACTIVE_AUDIO_ADS';
export function fetchInactiveAudioAds(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchInactiveAudioAds(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_INACTIVE_AUDIO_ADS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_AUDIO_AD_EPISODES = 'ADMIN_FETCH_AUDIO_AD_EPISODES';
export function fetchAudioAdEpisodes(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchAudioAdEpisodes(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_AUDIO_AD_EPISODES,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_ACTIVE_VISUAL_ADS = 'ADMIN_FETCH_ACTIVE_VISUAL_ADS';
export function fetchActiveVisualAds(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchActiveVisualAds(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_ACTIVE_VISUAL_ADS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_INACTIVE_VISUAL_ADS = 'ADMIN_FETCH_INACTIVE_VISUAL_ADS';
export function fetchInactiveVisualAds(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchInactiveVisualAds(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_INACTIVE_VISUAL_ADS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_AD = 'ADMIN_FETCH_AD';
export function fetchAd(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
            payload: 'ad',
        });

        return AdsApi.fetchAd(token, id).then(res =>
            dispatch({
                type: ADMIN_FETCH_AD,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_ACTIVE_FREE_MUSIC = 'ADMIN_FETCH_ACTIVE_FREE_MUSIC';
export function fetchActiveFreeMusic(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
            payload: 'freeMusic',
        });

        return AdminApi.fetchActiveFreeMusic(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_ACTIVE_FREE_MUSIC,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_INACTIVE_FREE_MUSIC = 'ADMIN_FETCH_INACTIVE_FREE_MUSIC';
export function fetchInactiveFreeMusic(...args) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchInactiveFreeMusic(token, ...args).then(res =>
            dispatch({
                type: ADMIN_FETCH_INACTIVE_FREE_MUSIC,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_FREE_MUSIC = 'ADMIN_FETCH_FREE_MUSIC';
export function fetchFreeMusic(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return FreeMusicApi.fetchFreeMusic(token, id).then(res =>
            dispatch({
                type: ADMIN_FETCH_FREE_MUSIC,
                payload: res,
            }),
        );
    };
}

export const ADMIN_FETCH_FREE_MUSIC_SHOWS = 'ADMIN_FETCH_FREE_MUSIC_SHOWS';
export function fetchFreeMusicShows(id) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.fetchFreeMusicShows(token, id).then(res =>
            dispatch({
                type: ADMIN_FETCH_FREE_MUSIC_SHOWS,
                payload: res,
            }),
        );
    };
}

export const ADMIN_CREATE_AUDIO_AD = 'ADMIN_CREATE_AUDIO_AD';
export function createAudioAd(attributes) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        return AdminApi.createAudioAd(token, attributes)
            .then(res => {
                dispatch(setSuccesses('form', ['Audio Ad created successfully']));

                return dispatch({
                    type: ADMIN_CREATE_AUDIO_AD,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_CREATE_VISUAL_AD = 'ADMIN_CREATE_VISUAL_AD';
export function createVisualAd(attributes) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));
        return AdminApi.createVisualAd(token, attributes)
            .then(res => {
                dispatch(setSuccesses('form', ['Visual Ad created successfully']));

                return dispatch({
                    type: ADMIN_CREATE_VISUAL_AD,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_CREATE_FREE_MUSIC = 'ADMIN_CREATE_FREE_MUSIC';
export function createFreeMusic(attributes) {
    return async (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        const url = URL.createObjectURL(attributes.audioFile.file);
        const duration = await getDuration(url);

        return AdminApi.createFreeMusic(token, { ...attributes, duration })
            .then(res => {
                dispatch(setSuccesses('form', ['Free Music created successfully']));

                return dispatch({
                    type: ADMIN_CREATE_FREE_MUSIC,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER';
export function updateUser(userAttributes, userId) {
    return (dispatch, getStore) => {
        const {
            auth: { token, user },
        } = getStore();
        const id = userId || user.id;

        const { profileImage, ...otherUserAttributes } = userAttributes;

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        AuthApi.updateUser(token, id, {
            ...otherUserAttributes,
            id,
            image: profileImage ? profileImage.source : otherUserAttributes.image,
        })
            .then(async res => {
                dispatch({
                    type: ADMIN_UPDATE_USER,
                    payload: res,
                });

                dispatch(setSuccesses('form', ['Account info updated successfully']));
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_SHOW = 'ADMIN_UPDATE_SHOW';
export function updateShow(showAttributes, showId) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        const { coverImage, ...otherAttributes } = showAttributes;

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        PodcastsApi.updateShow(token, showId, {
            ...otherAttributes,
            imageUrl: coverImage ? coverImage.source : otherAttributes.imageUrl,
        })
            .then(res => {
                dispatch({
                    type: ADMIN_UPDATE_SHOW,
                    payload: res,
                });

                dispatch(setSuccesses('form', ['Show info updated successfully']));
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_EPISODE = 'ADMIN_UPDATE_EPISODE';
export function updateEpisode(episodeAttrs, episodeId) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        PodcastsApi.updateEpisode(token, episodeId, episodeAttrs)
            .then(res => {
                dispatch({
                    type: ADMIN_UPDATE_EPISODE,
                    payload: res,
                });

                dispatch(setSuccesses('form', ['Episode info updated successfully']));
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_AUDIO_AD = 'ADMIN_UPDATE_AUDIO_AD';
export function updateAudioAd(id, attrs) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        return AdminApi.updateAudioAd(token, id, attrs)
            .then(res => {
                dispatch(setSuccesses('form', ['Audio Ad info updated successfully']));

                return dispatch({
                    type: ADMIN_UPDATE_AUDIO_AD,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_VISUAL_AD = 'ADMIN_UPDATE_VISUAL_AD';
export function updateVisualAd(id, attrs) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        return AdminApi.updateVisualAd(token, id, attrs)
            .then(res => {
                dispatch(setSuccesses('form', ['Visual Ad info updated successfully']));
                return dispatch({
                    type: ADMIN_UPDATE_VISUAL_AD,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_UPDATE_FREE_MUSIC = 'ADMIN_UPDATE_FREE_MUSIC';
export function updateFreeMusic(id, attrs) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        dispatch(clearMessages('form'));

        return AdminApi.updateFreeMusic(token, id, attrs)
            .then(res => {
                dispatch(setSuccesses('form', ['Free Music info updated successfully']));

                return dispatch({
                    type: ADMIN_UPDATE_FREE_MUSIC,
                    payload: res,
                });
            })
            .catch(({ reason }) => {
                dispatch({
                    type: ADMIN_FETCH_COMPLETE,
                });

                return dispatch(setErrors('form', reason));
            });
    };
}

export const ADMIN_DELETE_USERS = 'ADMIN_DELETE_USERS';
export function deleteUsers(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteUser(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_USERS,
            }),
        );
    };
}

export const ADMIN_DELETE_SHOWS = 'ADMIN_DELETE_SHOWS';
export function deleteShows(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteShow(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_SHOWS,
            }),
        );
    };
}

export const ADMIN_DELETE_EPISODES = 'ADMIN_DELETE_EPISODES';
export function deleteEpisodes(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteEpisode(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_EPISODES,
            }),
        );
    };
}

export const ADMIN_DELETE_ACTIVE_AUDIO_ADS = 'ADMIN_DELETE_ACTIVE_AUDIO_ADS';
export function deleteActiveAudioAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_ACTIVE_AUDIO_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_INACTIVE_AUDIO_ADS = 'ADMIN_DELETE_INACTIVE_AUDIO_ADS';
export function deleteInactiveAudioAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_INACTIVE_AUDIO_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_AUDIO_ADS = 'ADMIN_DELETE_AUDIO_ADS';
export function deleteAudioAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_AUDIO_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_ACTIVE_VISUAL_ADS = 'ADMIN_DELETE_ACTIVE_VISUAL_ADS';
export function deleteActiveVisualAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_ACTIVE_VISUAL_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_INACTIVE_VISUAL_ADS = 'ADMIN_DELETE_INACTIVE_VISUAL_ADS';
export function deleteInactiveVisualAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_INACTIVE_VISUAL_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_VISUAL_ADS = 'ADMIN_DELETE_VISUAL_ADS';
export function deleteVisualAds(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteAd(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_VISUAL_ADS,
            }),
        );
    };
}

export const ADMIN_DELETE_ACTIVE_FREE_MUSIC = 'ADMIN_DELETE_ACTIVE_FREE_MUSIC';
export function deleteActiveFreeMusic(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteFreeMusic(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_ACTIVE_FREE_MUSIC,
            }),
        );
    };
}

export const ADMIN_DELETE_INACTIVE_FREE_MUSIC = 'ADMIN_DELETE_INACTIVE_FREE_MUSIC';
export function deleteInactiveFreeMusic(ids) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        const requests = ids.map(id => AdminApi.deleteFreeMusic(token, id));
        return Promise.all(requests).then(() =>
            dispatch({
                type: ADMIN_DELETE_INACTIVE_FREE_MUSIC,
            }),
        );
    };
}

function download(objectName, ids, filename) {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: ADMIN_IS_FETCHING,
        });

        return AdminApi.download(token, objectName, ids).then(({ data }) => {
            dispatch({
                type: ADMIN_FETCH_COMPLETE,
            });

            downloadCsvData(filename, data);
        });
    };
}

export function downloadUsers(ids) {
    return download('user', ids, 'MessyBun Users.csv');
}

export function downloadShows(ids) {
    return download('show', ids, 'MessyBun Shows.csv');
}

export function downloadEpisodes(ids) {
    return download('podcast', ids, 'MessyBun Episodes.csv');
}

export function downloadAudioAds(ids) {
    return download('ad', ids, 'MessyBun Audio Ads.csv');
}

export function downloadVisualAds(ids) {
    return download('ad', ids, 'MessyBun Visual Ads.csv');
}

export function downloadFreeMusic(ids) {
    return download('free_music', ids, 'MessyBun Free Music.csv');
}
