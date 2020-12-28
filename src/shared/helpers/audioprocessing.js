import { FADE_DURATION } from 'src/config/settings';

/* eslint-disable */
export function createVolumeAction(fileUrl, multiplier) {
    return {
        do: 'volumeChange',
        args: {
            fileUrl,
            multiplier,
        },
    };
}

export function createTrimmedAction(fileUrl, startOffset, duration) {
    return {
        do: 'trim',
        args: {
            fileUrl,
            startOffset,
            duration: Math.abs(duration),
        },
    };
}

export function createFadeAction(key, fileUrl, fadeDuration) {
    return {
        do: key,
        args: {
            fileUrl,
            fadeDuration,
        },
    };
}

export function createPrependSilenceAction(fileUrl, seconds) {
    return {
        do: 'prependSilence',
        args: {
            fileUrl,
            seconds,
        },
    };
}

export function createOverlayAction(files, outputName) {
    return {
        do: 'overlay',
        args: {
            files,
            outputName,
        },
    };
}

export function createUploadAction(episodeName) {
    return {
        do: 'upload',
        args: {
            episodeName,
        },
    };
}

export function processSnippet(recordingSnippet, layer) {
    const actionsArray = [];
    const fileUrl = `${recordingSnippet.url}?snippet_id=${recordingSnippet.frontendId}`;
    const audioAction = createVolumeAction(fileUrl, layer.audioVolume);
    const trimmedAction = createTrimmedAction(fileUrl, recordingSnippet.startOffset, recordingSnippet.playDuration);

    actionsArray.push(trimmedAction);

    if (recordingSnippet.fadeIn && recordingSnippet.playDuration > FADE_DURATION) {
        actionsArray.push(createFadeAction('fadeIn', fileUrl, recordingSnippet.fadeDuration));
    }

    if (recordingSnippet.fadeOut && recordingSnippet.playDuration > FADE_DURATION) {
        actionsArray.push(createFadeAction('fadeOut', fileUrl, recordingSnippet.fadeDuration));
    }

    if (recordingSnippet.timelineOffset > 0) {
        const prependedAction = createPrependSilenceAction(
            `${recordingSnippet.url}?snippet_id=${recordingSnippet.frontendId}`,
            recordingSnippet.timelineOffset,
        );
        actionsArray.push(audioAction, prependedAction);
    } else {
        actionsArray.push(audioAction);
    }

    return actionsArray;
}

export const cleanPodcastName = name => name.toLowerCase().replace(/\s+/g, '_');
export function processSnippets(recordingSnippets, layers, episodeName) {
    let actionsArray = [];
    recordingSnippets.forEach(snippet => {
        const layer = layers.find(layer => layer.frontendId === snippet.layer);
        if (layer && snippet.playDuration > 1) {
            actionsArray = actionsArray.concat(processSnippet(snippet, layer));
        }
    });

    const overlayAction = createOverlayAction(
        recordingSnippets.map(snippet => `${snippet.url}?snippet_id=${snippet.frontendId}`),
        `${cleanPodcastName(episodeName)}.wav`,
    );
    actionsArray.push(overlayAction);
    const uploadAction = createUploadAction(`${cleanPodcastName(episodeName)}.wav`);
    actionsArray.push(uploadAction);
    return actionsArray;
}
