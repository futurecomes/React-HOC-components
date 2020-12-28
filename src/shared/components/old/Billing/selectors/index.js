import { createSelector } from 'reselect'

export const currentPlanTypeSelector = createSelector(
    state => state.auth.user.planId,
    planId => planId.replace(/:\d+$/, ''),
)

export const canResumeSelector = createSelector(
    state => state.auth.user.planId,
    (state, props) => state.billing.currentPlan.active && state.billing.currentPlan.type === props.type,
    (currentPlan, isStripePlanActive) => currentPlan === 'free' && isStripePlanActive,
)
