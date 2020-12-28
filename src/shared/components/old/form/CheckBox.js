import React from 'react';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

const CheckBox = ({ label, input, bottomTag, children }) => (
    <div className={css(styles.container, styles.checkWrapper)}>
        <input
            {...input}
            id={input.name}
            type="checkbox"
            className={css(styles.checkBox)}
            css={{ background: 'white' }}
        />
        <div className={css(styles.checkLabels)}>
            <label className={css(styles.label, styles.checkBoxLabel)} htmlFor={input.name}>
                {children || label}
            </label>
            {bottomTag && (
                <label
                    className={css(styles.label, styles.checkBoxLabel, styles.tag, styles.grayText)}
                    htmlFor={input.name}
                >
                    {bottomTag}
                </label>
            )}
        </div>
    </div>
);

CheckBox.defaultProps = {
    type: 'text',
    placeholder: '',
    label: '',
    bottomTag: '',
    children: null,
};

export default FieldHOC(CheckBox);
