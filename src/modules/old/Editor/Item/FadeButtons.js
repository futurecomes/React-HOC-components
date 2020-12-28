import React from 'react';

import { FADE_DURATION } from 'src/config/settings';
import { css } from 'src/styles/old';
import Button from 'src/shared/components/old/interactive/Button';
import fadeIcon from 'src/shared/components/old/shared/static/png/fade.png';

import styles from '../styles';

export const FadeButtons = ({ fadeIn, fadeOut, frontendId, fadeRecordingSnippet }) => (
    <React.Fragment>
        <Button
            className={css(styles.fadeButton, fadeOut && styles.activeButton)}
            type="white"
            alternate
            title="Fade out"
            onClick={() => fadeRecordingSnippet(frontendId, true, FADE_DURATION)}
        >
            <img alt="fade" src={fadeIcon} className={css(styles.fadeIcon, fadeOut && styles.inverted)} />
        </Button>
        <Button
            className={css(styles.fadeButton, fadeIn && styles.activeButton)}
            type="white"
            alternate
            title="Fade in"
            onClick={() => fadeRecordingSnippet(frontendId, false, FADE_DURATION)}
        >
            <img src={fadeIcon} alt="fade" className={css(styles.fadeIcon, styles.fadeIn, fadeIn && styles.inverted)} />
        </Button>
    </React.Fragment>
);
