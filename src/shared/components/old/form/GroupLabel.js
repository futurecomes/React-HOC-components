import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

const GroupLabel = ({ text }) => (
    <div className={css(styles.container)}>
        <span className={css(styles.label)}>{text}</span>
    </div>
);

export default GroupLabel;
