import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

import { NoPlan } from './NoPlan';
import { HasPlan } from './HasPlan';

export const BillingComp = ({ selectedPlan, currentPlanType }) => (
    <div className={css(styles.pageWrapper)}>
        {currentPlanType ? <HasPlan selectedPlan={selectedPlan} /> : <NoPlan selectedPlan={selectedPlan} />}
    </div>
);

BillingComp.defaultProps = {
    selectedPlan: '',
    currentPlanType: '',
};
