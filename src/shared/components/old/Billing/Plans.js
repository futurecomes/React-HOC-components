import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

import Plan from './Plan';

const Plans = () => (
    <div className={css(styles.plans)}>
        <Plan type="free" />
        <Plan type="basic" />
        <Plan type="premium" />
    </div>
);

export default Plans;
