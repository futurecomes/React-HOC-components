import React from 'react';
import styled from 'react-emotion';

import happyFace from 'src/public/img/emoticon-happy.svg';
import sadFace from 'src/public/img/emoticon-sad.svg';

import { slideInVertical } from 'src/styles/animations';
import { color, font } from 'src/styles/variables';

const PaymentResultMessageWrapper = styled.div({
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    animation: `${slideInVertical} 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both 0.5s`,
});

const Emoji = styled.img({
    width: '3rem',
    maxWidth: '100%',
    marginBottom: '0.75rem',
});

interface MessageProps {
    success: boolean;
}

const Message = styled.h3<MessageProps>(
    {
        color: color.black,
        marginBottom: 0,
    },
    font.normal(font.size.base),
);

interface Props {
    success: boolean;
    message: string;
}

export const PaymentResultMessage: React.FC<Props> = ({ success, message }) => (
    <PaymentResultMessageWrapper>
        <Emoji src={success ? happyFace : sadFace} />
        <Message success={success}>{message}</Message>
    </PaymentResultMessageWrapper>
);
