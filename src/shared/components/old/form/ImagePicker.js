import React from 'react';
import { isString } from 'lodash/fp';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

const ImagePicker = ({
    label,
    input,
    tag,
    imageUrl,
    validationInfo,
    style,
    optionalText,
    isOptional,
    meta: { touched, warning, error },
}) => (
    <div className={css(styles.imagePickerContainer)}>
        <label className={css(styles.label)}>
            {label}
            {isOptional && <span className={css(styles.grayText)}>({optionalText})</span>}
            {tag && (isString(tag) ? <span className={css(styles.tag, styles.grayText)}>{tag}</span> : tag)}
        </label>
        <div
            className={css(
                styles.fileWrapper,
                style,
                touched && warning && styles.warningBorder,
                touched && error && styles.errorBorder,
            )}
        >
            <input
                type="file"
                accept="image/*"
                onDrop={input.onDrop}
                onChange={input.onChange}
                onFocus={input.onFocus}
                className={css(styles.file)}
            />
            {(input.value && input.value.source) || imageUrl ? (
                <img
                    src={(input.value && input.value.source) || imageUrl}
                    className={css(styles.profileImg)}
                    alt="Uploaded"
                />
            ) : (
                <div className={css(styles.fileContent)}>
                    <span className={css(styles.cameraLogo)} />
                    <span className={css(styles.label, styles.grayText, styles.uploadTags)}>Upload Image</span>
                    {validationInfo && (
                        <span className={css(styles.label, styles.grayText, styles.uploadTags, styles.imageInputLabel)}>
                            {validationInfo}
                        </span>
                    )}
                </div>
            )}
        </div>

        {touched && error && <span className={css(styles.label, styles.uploadTags, styles.error)}>{error}</span>}
    </div>
);

ImagePicker.defaultProps = {
    imageUrl: '',
    optionalText: 'Optional',
    tag: '',
    imageValidationText: '',
    style: false,
    isOptional: false,
};

export default FieldHOC(ImagePicker);
