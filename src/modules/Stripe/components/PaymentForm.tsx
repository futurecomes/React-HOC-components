import { noop } from 'lodash';
import React from 'react';
import styled from 'react-emotion';
import { CardElement } from 'react-stripe-elements';

import { Button } from 'src/shared/components/Button';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { color } from 'src/styles/variables';

const CardElementWrapper = styled.div({
    padding: '0.5rem',
    marginBottom: '1rem',
    backgroundColor: color.white,
});

const Error = styled.span({
    color: color.imperialRed,
});

interface Props {
    buttonText: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    disabled?: boolean;
    isProcessingPayment?: boolean;
    paymentError?: boolean;
    onChange?: () => void;
}

export const PaymentForm: React.FC<Props> = props => (
    <form onSubmit={props.onSubmit}>
        <CardElementWrapper>
            <CardElement onChange={props.onChange || noop} />
            {props.paymentError && <Error>{props.paymentError}</Error>}
        </CardElementWrapper>
        {props.isProcessingPayment && <CenteredSpinner />}
        <Button htmlType="submit" small centered disabled={props.disabled}>
            {props.buttonText || 'Pay'}
        </Button>
    </form>
);
