import React from 'react';
import styled from 'react-emotion';
import { Row } from 'antd';

import { color, font } from 'src/styles/variables';
import { Button } from 'src/shared/components/Button';
import { AuthContainer } from '../containers/authContainer';
import { notLoggedInNotification } from './Notifications';

const TotalAmountText = styled.p({
    fontSize: font.size.medium,
});

const InteractivePanelWrapper = styled(Row)({
    borderTop: `1px solid ${color.black}`,
    paddingTop: '2rem',
});

export const BasketCheckoutPanelComponent = ({ amount, toCheckout, isUserLogged }) => (
    <InteractivePanelWrapper type="flex" justify="center">
        <TotalAmountText>{`Total Amount: $${amount}`}</TotalAmountText>
        <Button fullWidth onClick={isUserLogged ? toCheckout : notLoggedInNotification}>
            CHECKOUT
        </Button>
    </InteractivePanelWrapper>
);

export const BasketCheckoutPanel = AuthContainer(BasketCheckoutPanelComponent);
