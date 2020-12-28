import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import Spinner from 'react-svg-spinner';

import { PaymentForm } from 'src/shared/components/old/Billing/PaymentForm';
import { IconFont } from 'src/shared/components/old/IconFont';
import requireAuthHOC from 'src/containers/RequireAuth';

import * as S from './styled';

class Payment extends React.Component {
    state = {
        isLoading: false,
    };
    goBack = () => {
        this.props.resetVipExtrasState();
        this.props.history.push('/pricing');
    };

    onSubmit = async e => {
        e.preventDefault();
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        const response = await this.props.stripe.createToken();
        this.setState({ isLoading: false });
        if (response.error) {
            return;
        }
        this.props.vipExtrasPayment(this.props.basket, response.token);
    };

    render() {
        const { isLoading } = this.state;
        const { isProcessingPayment, paymentSucceeded } = this.props;
        return (
            <S.Payment>
                {(!isProcessingPayment || !isLoading) && <IconFont onClick={this.goBack}>arrow_back</IconFont>}

                <div
                    css={{
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {isProcessingPayment && <Spinner size="64px" speed="fast" />}
                    {!isProcessingPayment && paymentSucceeded === null && (
                        <React.Fragment>
                            {this.props.sum > 0 ? (
                                <React.Fragment>
                                    <PaymentForm price={this.props.sum / 100} onSubmit={this.onSubmit} />
                                    <div css={{ display: 'flex', justifyContent: 'center' }}>
                                        {isLoading && <Spinner speed="fast" size="48px" />}
                                    </div>
                                </React.Fragment>
                            ) : (
                                <p>No items in basket</p>
                            )}
                        </React.Fragment>
                    )}
                    {paymentSucceeded && (
                        <div>
                            <h1>Payment Successfully Completed</h1>
                        </div>
                    )}

                    {paymentSucceeded === false && (
                        <div>
                            <h1>Payment Failed</h1>
                        </div>
                    )}
                </div>
            </S.Payment>
        );
    }
}

export const PaymentPage = injectStripe(requireAuthHOC('/signin', Payment));
