import React from 'react';

import Input from 'src/shared/components/old/form/Input';
import CheckBox from 'src/shared/components/old/form/CheckBox';

import FormMessages from 'src/shared/components/old/form/Messages';
import Button from 'src/shared/components/old/interactive/Button';
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator';
import { css } from 'src/styles/old';
import { validatePassword, validatePasswordPresence } from 'src/shared/helpers/validate';

import AccountContainer from './containers/Password';
import styles from './styles';

function validateCurrentPassword(value) {
    return validatePasswordPresence(value);
}

function validateNewPassword(value) {
    return validatePassword(value);
}

function validateNewPasswordConfirm(value, values) {
    return validatePassword(values.newPassword, values.newPasswordConfirm);
}

const PasswordContainer = ({ isFetching, handleSubmit, updatePassword, password }) => (
    <div className={css(styles.formContainer)}>
        <h1 className={css(styles.title)}>Password</h1>

        <FormMessages />

        <form
            onSubmit={handleSubmit(({currentPassword, newPassword}) => updatePassword(currentPassword, newPassword))}
            className={css(styles.form)}
        >
            <Input name="currentPassword" label="Current Password"
                   type={(password && password.values && password.values.showCurrentPassword) ? 'text' : 'password'}
                   validate={validateCurrentPassword}/>

            <CheckBox name='showCurrentPassword' id='showCurrentPassword' label='Show Password'/>

            <Input name="newPassword" label="New Password"
                   type={(password && password.values && password.values.showNewPassword) ? 'text' : 'password'}
                   validate={validateNewPassword}/>
            <Input
                name="newPasswordConfirm"
                label="Confirm New Password"
                type={(password && password.values && password.values.showNewPassword) ? 'text' : 'password'}
                validate={validateNewPasswordConfirm}
            />

            <CheckBox name='showNewPassword' id='showNewPassword' label='Show New Password'/>

            <Button isSubmit type="blueUpdated" style={styles.submit} isDisabled={isFetching}>
                {isFetching ? (
                    <span>
                        {'Updating'}
                        <EllipsesIndicator />
                    </span>
                ) : (
                    'Update Password'
                )}
            </Button>
        </form>
    </div>
);

export const Password = AccountContainer(PasswordContainer);
