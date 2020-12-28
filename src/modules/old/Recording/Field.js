import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

export const Field = props => (
    <div className={css(styles.inputWrapper)}>
        <Labels labels={props.labels} />
        <input
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            className={css(styles.modalField)}
        />
        {props.isError && <span className={css(styles.warning)}>This field cannot be empty</span>}
    </div>
);

const Labels = ({ labels }) => (
    <React.Fragment>
        {labels.map(l => (
            <span key={l} className={css(styles.label)}>
                {l}
            </span>
        ))}
    </React.Fragment>
);
