import React from 'react'
import { injectStripe } from 'react-stripe-elements'
import _throttle from 'lodash/throttle'

import { ShowPayment } from './ShowPayment'

class ProtectShowForm extends React.Component {
    state = {
        isLoading: false,
        success: null,
        payButtonDisabled: false,
        password: '',
        result: '',
    }

    onChange = e => this.setState({ password: e.target.value })

    protectShow = async () => {
        const { password } = this.state
        this.setState({ payButtonDisabled: true })
        const response = await this.props.stripe.createToken()
        if (!response.token) {
            return
        }
        this.setState({ isLoading: true })
        try {
            await this.props.submitForm(
                this.props.userToken,
                this.props.showId,
                response.token.id,
                password,
            )()

            this.setState({ result: 'success', isLoading: false })
            this.props.editShow(this.props.showId, { protected: true })
        } catch (err) {
            this.setState({ result: 'error', isLoading: false })
        }
    }

    protectThrottled = _throttle(this.protectShow, 10000, { trailing: false })

    onSubmit = e => {
        e.preventDefault()
        if (!this.state.password) {
            return
        }
        this.protectThrottled()
    }

    render() {
        const { isLoading, password, result, payButtonDisabled } = this.state
        const success = result === 'error' ? false : result === 'success' ? true : null
        return (
            <React.Fragment>
                {result === 'error' && <h3>Process Failed</h3>}
                <ShowPayment
                    payButtonDisabled={payButtonDisabled}
                    isLoading={isLoading}
                    success={success}
                    onSubmit={this.onSubmit}
                    message="This show is now being password-protected!"
                    payButtonText="Make Your Podcast Private"
                    description={`With this one-time purchase, your podcast episodes won't appear on the Messy main feed, and your episodes will only be accessible via a password you have chosen to share with others. You can always change or update the password in your show's settings.`}
                    price={52}
                    actionElement={
                        !isLoading &&
                        !result && (
                            <div>
                                <p>
                                    The password needed to access your podcast is:
                                    <input
                                        css={{ padding: 5, fontSize: 14 }}
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </p>
                            </div>
                        )
                    }
                />
            </React.Fragment>
        )
    }
}

export const ProtectShowFormContainer = injectStripe(ProtectShowForm)
