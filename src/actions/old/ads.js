import AdsApi from 'src/api/ads';

export const ADS_IS_FETCHING = 'ADS_IS_FETCHING';
export const ADS_FETCH_ADS = 'ADS_FETCH_ADS';
export const ADS_FETCH_RANDOM_AD = 'ADS_FETCH_RANDOM_AD';
export const ADS_REGISTER_PLAY = 'ADS_REGISTER_PLAY';
export const ADS_FETCH_RANDOM_AUDIO_AD = 'ADS_FETCH_RANDOM_AUDIO_AD';

export function fetchAds(adAttributes) {
    return (dispatch, getStore) => {
        const { auth } = getStore();

        dispatch({
            type: ADS_IS_FETCHING,
        });

        AdsApi.fetchAds(auth.token, adAttributes).then(res =>
            dispatch({
                type: ADS_FETCH_ADS,
                payload: res,
            }),
        );
    };
}

export function fetchRandomAd(adAttributes) {
    return (dispatch, getStore) => {
        const { auth } = getStore();

        dispatch({
            type: ADS_IS_FETCHING,
        });

        AdsApi.fetchRandomAd(auth.token, adAttributes).then(res =>
            dispatch({
                type: ADS_FETCH_RANDOM_AD,
                payload: res,
            }),
        );
    };
}

export function registerAd(id, adAttributes) {
    return dispatch => {
        AdsApi.registerAd(id, adAttributes).then(res =>
            dispatch({
                type: ADS_REGISTER_PLAY,
                payload: res,
            }),
        );
    };
}

export function fetchAudioAds(adAttributes = {}) {
    return (dispatch, getStore) => {
        const { auth } = getStore();

        dispatch({
            type: ADS_IS_FETCHING,
        });

        AdsApi.fetchRandomAd(auth.token, Object.assign({}, adAttributes, { type: 'audio' })).then(res =>
            dispatch({
                type: ADS_FETCH_RANDOM_AUDIO_AD,
                payload: res,
            }),
        );
    };
}
