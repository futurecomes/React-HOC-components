import React from 'react';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

const FileUpload = ({ label, input, isOptional, meta: { error } }) => {
    let inputValue = '';

    if (typeof input.value === 'object') {
        inputValue = input.value.file.name;
    } else if (typeof input.value === 'string') {
        const tokens = input.value.split('/');
        if (tokens.length > 0) {
            inputValue = tokens[tokens.length - 1];
        }
    }

    return (
        <div className={css(styles.container)}>
            <label className={css(styles.label)}>
                {label}
                {isOptional && <span className={css(styles.grayText)}>&#0020; (Optional)</span>}
            </label>
            <input
                type="file"
                onDrop={input.onDrop}
                onChange={input.onChange}
                onFocus={input.onFocus}
                className={css(styles.file)}
            />
            <input type="text" className={css(styles.input, error && styles.errorBorder)} value={inputValue} />

            {error && <span className={css(styles.label, styles.error)}>{error}</span>}
        </div>
    );
};

FileUpload.defaultProps = {
    isOptional: false,
};

export default FieldHOC(FileUpload);
