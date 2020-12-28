import React from 'react'

import createPage from 'src/shared/components/old/auth/createPage'
import Link from 'src/shared/components/old/interactive/Link'
import { css } from 'src/styles/old'

import ResetPasswordForm from './components/ResetPasswordForm'
import { createPageContainer } from './containers/ResetPassword'
import styles from './styles'

const ResetPasswordPage = createPage('Reset Your Password', ResetPasswordForm)

const ResetPassword = ({ isPending }) => (
    <div>
        {isPending && (
            <div className={css(styles.card, styles.skinnier)}>
                <h1 className={css(styles.title)}>Check Your Email</h1>

                <p className={css(styles.p, styles.space)}>
                    {"We've emailed you with instructions on how to reset your password."}
                </p>

                <Link to="/signin" type="blue" style={styles.backToSignUp}>
                    Back to sign in
                </Link>
            </div>
        )}
        {!isPending && <ResetPasswordPage />}
    </div>
)

export default createPageContainer(ResetPassword)
