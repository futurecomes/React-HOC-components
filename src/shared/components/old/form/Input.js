import React from 'react';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

const Input = ({
    label,
    input,
    type,
    placeholder,
    isOptional,
    isDisabled,
    isReadonly,
    maxLength,
    meta: { touched, error },
    style = {},
    gray,
}) => (
    <div className={css(styles.container)}>
        {label && (
            <label className={css(styles.label)}>
                {label}
                {isOptional && <span className={css(styles.grayText)}>(Optional)</span>}
            </label>
        )}
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            readOnly={isReadonly}
            maxLength={maxLength}
            disabled={isDisabled}
            className={css(gray ? styles.inputGray : styles.input, touched && error && styles.errorBorder)}
            css={style}
        />
        {touched && error && <span className={css(styles.label, styles.error)}>{error}</span>}
    </div>
);

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    format: () => {},
    maxLength: null,
    isOptional: false,
    isReadonly: false,
    isDisabled: false,
};

export default FieldHOC(Input);
