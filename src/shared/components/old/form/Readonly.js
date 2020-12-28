/* eslint-disable no-restricted-globals */

import React from 'react';
import { css } from 'src/styles/old';
import styles from './styles';

const Readonly = ({ label, value }) => (
    <div className={css(styles.container)}>
        {label && (
            <label className={css(styles.label)} htmlFor={name}>
                {label}
            </label>
        )}

        <div className={css(styles.grayText)}>{value}</div>
    </div>
);

Readonly.defaultProps = {
    type: 'text',
};

export default Readonly;
