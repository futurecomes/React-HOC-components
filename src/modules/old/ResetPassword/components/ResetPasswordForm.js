import React from 'react';

import { Button } from 'src/shared/components/Button';
import Link from 'src/shared/components/old/interactive/Link';
import Input from 'src/shared/components/old/form/Input';
import FormMessages from 'src/shared/components/old/form/Messages';
import { css } from 'src/styles/old';

import ResetPasswordContainer from '../containers/ResetPassword';
import styles from './styles';

const ResetPasswordForm = ({ handleSubmit, requestResetPassword, resetPassword, isFetching, hasResetToken }) => (
    <div className={css(styles.column)}>
        <FormMessages />

        <form
            onSubmit={handleSubmit(!hasResetToken ? requestResetPassword : resetPassword)}
            className={css(styles.form)}
        >
            {hasResetToken ? (
                <div>
                    <Input name="password" label="New Password" type="password" />
                    <Input name="confirmPassword" label="Confirm New Password" type="password" />
                </div>
            ) : (
                <Input name="email" label="Email Address" />
            )}
            <Button type="primary" htmlType="submit" disabled={isFetching}>
                {isFetching ? 'Verifying...' : 'Reset Password'}
            </Button>

            <div className={css(styles.switchFormWrapper)}>
                <span className={css(styles.switchFormLabel, styles.smallText)}>Suddenly remember it?</span>
                <Link to="/signin" alternate style={styles.smallText}>
                    Sign In
                </Link>
            </div>
        </form>
    </div>
);

export default ResetPasswordContainer(ResetPasswordForm);
