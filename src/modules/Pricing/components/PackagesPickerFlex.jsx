import React from 'react';
import styled from 'react-emotion';
import { Row } from 'antd';

import * as pricingTexts from '../pricingTexts.json';
import { PackagesPickerCard } from './PackagesPickerCard';

const PackagesCardsContainer = styled(Row)({
    '&.ant-row-flex': {
        justifyContent: 'center',
        paddingBottom: '3rem',
        flexWrap: 'nowrap',
        '&>*:not(:last-child)': {
            marginRight: '1rem',
        },
    },
});

export const PackagesPickerFlex = () => (
    <PackagesCardsContainer type="flex">
        {pricingTexts.packagesPicker.map(bundle => (
            <PackagesPickerCard key={`${bundle.name}-flexPicker`} bundle={bundle} />
        ))}
    </PackagesCardsContainer>
);
