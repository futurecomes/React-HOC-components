import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

import Plans from './Plans';
import Form from './Form';

export const NoPlan = ({ selectedPlan }) =>
    selectedPlan ? (
        <Form />
    ) : (
        <div className={css(styles.container)}>
            <div className={css(styles.card)}>
                <h1 className={css(styles.bigTitle)}>Ready to start podcasting?</h1>
                <span className={css(styles.cardText)}>{"We'll this is the place to do it!"}</span>
                <span className={css(styles.cardText)}>{'To start you’ll need to select a plan, which you'}</span>
                <span className={css(styles.cardText)}>{'can change or cancel whenever you want.'}</span>
            </div>
            <Plans />
        </div>
    );

NoPlan.defaultProps = {
    selectedPlan: '',
};
