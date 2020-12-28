import { InputNumber } from 'antd';
import { isUndefined } from 'lodash';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { injectStripe, ReactStripeElements } from 'react-stripe-elements';

import ShowAPI from 'src/api/shows';
import { PaymentForm } from 'src/modules/Stripe/components/PaymentForm';
import { PaymentResultMessage } from 'src/modules/Stripe/components/PaymentResultMessage';
import { fetchCurrentPlan } from 'src/shared/components/old/Billing/actions';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { color } from 'src/styles/variables';

const SupportShowBoxWrapper = styled.div({
    position: 'relative',
    backgroundColor: color.botticelli,
    padding: '1rem',
    borderRadius: '0.25rem',
});

const InputWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '1rem',
    label: {
        marginRight: '0.5rem',
    },
});

const StyledInputNumber = styled(InputNumber)({
    '&.ant-input-number': {
        border: 'none',
        flexGrow: 1,
    },
});

const CheckboxWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    label: {
        paddingRight: '0.5rem',
        cursor: 'pointer',
    },
    input: {
        marginTop: -1,
        cursor: 'pointer',
    },
});

const ProcessingOverlay = styled.div({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: color.botticelli,
    borderRadius: '0.25rem',
});

interface ActionsProps {
    fetchCurrentPlan: typeof fetchCurrentPlan;
}

interface Props extends ActionsProps, ReactStripeElements.InjectedStripeProps {
    showId: number;
    isUserLoggedIn: boolean;
    token?: string;
}

interface State {
    amount: number;
    isProcessingPayment: boolean;
    repeatMonthly: boolean;
    paymentSucceeded?: boolean;
}

export class SupportShowBoxContainer extends React.Component<Props, State> {
    public state: State = {
        amount: 5,
        isProcessingPayment: false,
        repeatMonthly: false,
    };

    public submitDonation = async (e: React.FormEvent<HTMLFormElement>) => {
        // TODO: Refactor Stripe-based methods like this to separate actions, epic and reducer
        e.preventDefault();

        if (!this.props.stripe) {
            return;
        }

        const payment = await this.props.stripe.createToken();

        if (!payment.token) {
            return;
        }

        this.setState({ isProcessingPayment: true });

        try {
            await ShowAPI.support(this.props.token, {
                stripeToken: payment.token.id,
                show: this.props.showId,
                amount: this.state.amount * 100,
                monthly: this.state.repeatMonthly,
            });
            if (this.state.repeatMonthly) {
                this.props.fetchCurrentPlan();
            }
            this.setState({ paymentSucceeded: true });
        } catch (err) {
            this.setState({ paymentSucceeded: false });
        }

        this.setState({ isProcessingPayment: false });
    };

    public onAmountChange = (amount: number) => this.setState({ amount });

    private toggleMonthlySupport = () => this.setState(state => ({ repeatMonthly: !state.repeatMonthly }));

    public render(): JSX.Element {
        const { paymentSucceeded, amount, isProcessingPayment, repeatMonthly } = this.state;

        return (
            <SupportShowBoxWrapper>
                <InputWrapper>
                    <label>Specify the level of support (min. $3):</label>
                    <StyledInputNumber
                        onChange={this.onAmountChange}
                        value={amount}
                        formatter={value => `$ ${value}`}
                        min={3}
                        max={1000}
                    />
                </InputWrapper>
                {this.props.isUserLoggedIn && (
                    <CheckboxWrapper>
                        <label htmlFor="monthly">Repeat monthly</label>
                        <input
                            id="monthly"
                            type="checkbox"
                            checked={repeatMonthly}
                            onChange={this.toggleMonthlySupport}
                        />
                    </CheckboxWrapper>
                )}
                <PaymentForm buttonText={`Support $${amount}`} onSubmit={this.submitDonation} />
                {(isProcessingPayment || !isUndefined(paymentSucceeded)) && (
                    <ProcessingOverlay>
                        {paymentSucceeded === undefined ? (
                            <CenteredSpinner />
                        ) : (
                            <PaymentResultMessage
                                success={paymentSucceeded}
                                message={
                                    paymentSucceeded ? 'Thank you for the support!' : 'Ooops, something went wrong'
                                }
                            />
                        )}
                    </ProcessingOverlay>
                )}
            </SupportShowBoxWrapper>
        );
    }
}

export const SupportShowBox = connect(
    null,
    {
        fetchCurrentPlan,
    },
)(injectStripe(SupportShowBoxContainer));
