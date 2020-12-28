import ProfileApi from 'src/api/profiles';

export const PROFILE_IS_FETCHING = 'PROFILE_IS_FETCHING';

export const PROFILE_FETCH_USER = 'PROFILE_FETCH_USER';
export function fetchUserProfile(profileId) {
    return dispatch => {
        dispatch({
            type: PROFILE_IS_FETCHING,
        });

        ProfileApi.fetchUserProfile(profileId).then(payload =>
            dispatch({
                type: PROFILE_FETCH_USER,
                payload,
            }),
        );
    };
}
