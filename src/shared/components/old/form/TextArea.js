/* eslint-disable no-restricted-globals */

import React from 'react';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

const TextArea = ({ label, input, type, placeholder, isOptional, meta: { touched, error }, rows }) => (
    <div className={css(styles.container)}>
        <label className={css(styles.label)} htmlFor={name}>
            {label}
            {isOptional && <span className={css(styles.grayText)}>(Optional)</span>}
        </label>
        <textarea
            {...input}
            placeholder={placeholder}
            type={type}
            className={css(styles.input, touched && error && styles.errorBorder)}
            rows={rows}
        />
        {touched && error && <span className={css(styles.label, styles.error)}>{error}</span>}
    </div>
);

TextArea.defaultProps = {
    type: 'text',
    placeholder: '',
    isOptional: false,
    rows: 4,
};

export default FieldHOC(TextArea);
