import React from 'react';

import HowToGetStarted from 'src/modules/HowToGetStarted/HowToGetStarted';
import Link from 'src/shared/components/old/interactive/Link';
import LoadingIndicator from 'src/shared/components/old/activity/LinesIndicator';
import VerifyAccountContainer from './containers/VerifyAccount';
import { css } from 'src/styles/old';

import styles from './styles';

// eslint-disable-next-line no-nested-ternary
const VerifyAccount = ({ isFetching, isAuthenticated, error, fetchCurrentPlan }) =>
    isFetching ? (
        <LoadingIndicator size={50} />
    ) : isAuthenticated ? (
        <HowToGetStarted />
    ) : (
        <div className={css(styles.card, styles.skinnier)}>
            <h1 className={css(styles.title)}>
                {error ? <span>An error occured with your account verification</span> : <span>Check Your Email</span>}
            </h1>

            <p className={css(styles.p, styles.space)}>
                {error && error.reason ? (
                    <div>
                        <span>{error.reason}.</span>
                        <span>
                            &nbsp;Please to your account <Link to="/signin">here</Link>.
                        </span>
                    </div>
                ) : (
                    "We've sent you an email with a link to verify your account."
                )}
            </p>
        </div>
    );

VerifyAccount.defaultProps = {
    error: null,
};

export default VerifyAccountContainer(VerifyAccount);
