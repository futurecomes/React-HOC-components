import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

import Plans from './Plans';
import Form from './Form';

export const HasPlan = ({ selectedPlan }) =>
    selectedPlan ? (
        <Form />
    ) : (
        <div className={css(styles.container)}>
            <Plans />
        </div>
    );

HasPlan.defaultProps = {
    selectedPlan: '',
};
