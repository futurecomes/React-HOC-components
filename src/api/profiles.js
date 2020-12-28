import request from './core';

function fetchUserProfile(customUrl) {
    return request
        .get('user', {
            customUrl,
        })
        .then(({ data }) => data[0])
        .catch(() => {
            /* Ignore */
        });
}

export default {
    fetchUserProfile,
};
