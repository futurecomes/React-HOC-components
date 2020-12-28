import React from 'react';

import { Button } from 'src/shared/components/Button';
import createPage from 'src/shared/components/old/auth/createPage';
import Link from 'src/shared/components/old/interactive/Link';
import Input from 'src/shared/components/old/form/Input';
import CheckBox from 'src/shared/components/old/form/CheckBox';
import FormMessages from 'src/shared/components/old/form/Messages';
import AuthFormContainer from 'src/containers/AuthForm';
import { css } from 'src/styles/old';

import styles from './styles';

const SignInForm = ({ handleSubmit, authenticate, isFetching, history }) => (
    <div className={css(styles.column)}>
        <FormMessages />

        <form onSubmit={handleSubmit(e => authenticate(e, history.location))} className={css(styles.form)}>
            <Input name="email" label="Email Address" />
            <Input name="password" label="Password" type="password" />

            <div className={css(styles.row)}>
                <CheckBox name="rememberMe" id="rememberMe" label="Remember Me" />
                <Link to="/reset" style={styles.forgotLink} alternate>
                    Forgot Password?
                </Link>
            </div>

            <Button type="primary" htmlType="submit" disabled={isFetching}>
                {isFetching ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className={css(styles.switchFormWrapper)}>
                <span className={css(styles.switchFormLabel, styles.smallText)}>Don't have an account?</span>
                <Link to="/join" alternate style={styles.smallText}>
                    Join Messy
                </Link>
            </div>
        </form>
    </div>
);

export default createPage('Sign In', AuthFormContainer('signIn', SignInForm));
