import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'src/styles/old';
import styles from './styles';

import Button from '../interactive/Button';
import { selectPlan } from './actions';
import { canResumeSelector, currentPlanTypeSelector } from './selectors';
import { reactivateSubscription } from './actions/subscriptions';

const features = [
    'Recording Studio',
    'Editor',
    'Music Library',
    'Appear on Messy',
    'RSS Feed',
    'Publishable on Apple Podcasts',
    { style: 'featureTag', text: '(and other players too)' },
];

const titleMap = {
    free: 'Free',
    basic: 'Basic',
    premium: 'Premium',
};

const priceMap = {
    free: 0,
    basic: 5,
    premium: 9,
};

const analyticsMap = {
    free: 'No Podcast Analytics',
    basic: 'Podcast Analytics',
    premium: 'Podcast Analytics',
};

const adsMap = {
    free: 'One Short Messy.fm Promotion Placed at the Start of Your Podcast',
    basic: 'One Short Messy.fm Promotion Placed at the Start of Your Podcast',
    premium: 'No Messy.fm Promotion in Your Podcast.',
};

const loveMap = {
    free: 'Our Love',
    basic: 'More of Our Love',
    premium: 'All of Our Love',
};

class Plan extends Component {
    renderPricingDetails() {
        const { type } = this.props;

        const title = titleMap[type];
        const price = `$${priceMap[type]}`;

        const priceOptions = [];

        if (type === 'free') {
            priceOptions.push({
                key: 'free',
                text: 'Always free :)',
            });
        } else if (type === 'basic') {
            priceOptions.push({
                key: '29',
                text: '$29 for 6 months',
            });
            priceOptions.push({
                key: '57',
                text: '$57 for 12 months',
            });
        } else if (type === 'premium') {
            priceOptions.push({
                key: '51',
                text: '$51 for 6 months',
            });
            priceOptions.push({
                key: '99',
                text: '$99 for 12 months',
            });
        }

        return (
            <div>
                <h2 className={css(styles.planTitle)}>{title}</h2>

                <span className={css(styles.price)}>
                    {price}
                    <span className={css(styles.cardText)}>/month</span>
                </span>

                <div className={css(styles.pricingDetails)}>
                    {priceOptions.map(option => (
                        <p key={option.key} className={css(styles.smallText)}>
                            {option.text}
                        </p>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const { type, selectedPlan, isForm, currentPlanType, canResume } = this.props;

        return (
            <div className={css(styles.card, styles.planCard, isForm && styles.formPlan)}>
                {this.renderPricingDetails()}
                <div className={css(styles.features)}>
                    {features.map((feature, i) => (
                        <span
                            key={`feature-free-${i.toString()}`}
                            className={css(styles.feature, feature.style && styles[feature.style])}
                        >
                            {feature.text || feature}
                        </span>
                    ))}
                    <span className={css(styles.feature, styles.extraFeature)}>{analyticsMap[type]}</span>
                    <span className={css(styles.feature, styles.extraFeature)}>{adsMap[type]}</span>
                    <span className={css(styles.feature, styles.extraFeature)}>
                        {loveMap[type]}
                        <i className="em em-heart" />
                        {type !== 'free' && <i className="em em-blue_heart" />}
                        {type === 'premium' && <i className="em em-purple_heart" />}
                    </span>
                </div>
                {currentPlanType === type && !isForm ? (
                    <div className={css(styles.currentPlan)}>Current Plan</div>
                ) : canResume ? (
                    <Button type="blue" onClick={this.props.reactivateSubscription}>
                        Reactivate
                    </Button>
                ) : (
                    <Button
                        type="blue"
                        alternate={!!selectedPlan || isForm}
                        onClick={() => this.props.selectPlan(selectedPlan ? null : type, isForm)}
                    >
                        {selectedPlan || isForm ? 'Switch Plan' : 'Select'}
                    </Button>
                )}
            </div>
        );
    }
}

Plan.defaultProps = {
    type: 'free',
    selectedPlan: '',
    isForm: false,
    currentPlanType: '',
};

function mapStateToProps(state, ownProps) {
    return {
        selectedPlan: state.billing.form.plan,
        currentPlanType: currentPlanTypeSelector(state),
        canResume: canResumeSelector(state, ownProps),
    };
}

export default connect(
    mapStateToProps,
    { selectPlan, reactivateSubscription },
)(Plan);
