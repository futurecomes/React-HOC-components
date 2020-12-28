export const validatePodcastLink = (link, source) => {
    if (!link) {
        return false;
    }

    const validators = {
        apple: /https:\/\/.*podcasts.apple.com\/.*\/podcast.*/,
        spotify: /https:\/\/.*spotify.com\/show\/.*/,
        google: /.*google.*/,
        patreon: /.*patreon.*/,
    };

    switch (source) {
        case 'apple':
            return validators.apple.test(link) || 'This is not a valid Apple Podcasts link.';
        case 'spotify':
            return validators.spotify.test(link) || 'This is not a valid Spotify link.';
        case 'google':
            return validators.google.test(link) || 'This is not a valid Google Podcasts link.';
        case 'patreon':
            return validators.patreon.test(link) || 'This is not a valid Patreon link.';
        default:
            return;
    }
};
