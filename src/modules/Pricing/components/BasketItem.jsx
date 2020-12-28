import React from 'react';
import styled from 'react-emotion';
import { Row, Icon } from 'antd';

import { color, font, media } from 'src/styles/variables';

const LabelText = styled.p({
    fontSize: font.size.small,
    [media.lg]: {
        fontSize: font.size.base,
    },
});

const BasketItemWrapper = styled(Row)({
    flexWrap: 'nowrap',
    borderBottom: `1px solid ${color.dustyGrey}`,
    padding: '0.5rem',
});

const ItemAmountWrapper = styled(Row)({
    flexWrap: 'nowrap',
});

const BasketItemPrice = styled(LabelText)({
    marginRight: '0.5rem',
});

const DeleteIcon = styled(Icon)({
    marginTop: '0.25rem',
    cursor: 'pointer',
});

export const BasketItem = ({ name, timePeriod, value, onDeleteClick }) => (
    <BasketItemWrapper type="flex" justify="space-between">
        <LabelText>
            {name}
            {timePeriod && `(${timePeriod})`}
        </LabelText>
        <ItemAmountWrapper type="flex">
            <BasketItemPrice>{`$${value}`}</BasketItemPrice>
            <DeleteIcon type="close-circle" onClick={onDeleteClick} />
        </ItemAmountWrapper>
    </BasketItemWrapper>
);
