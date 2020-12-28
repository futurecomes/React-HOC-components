import React from 'react';
import styled from 'react-emotion';
import { Radio, Row, Col } from 'antd';

import { font, color, media } from 'src/styles/variables';

const RadioGroup = Radio.Group;

const StretchedRadioGroup = styled(RadioGroup)({
    '&.ant-radio-group': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const SquaredRadio = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

const SquaredRadioLabelMobile = styled.label({
    fontSize: font.size.small,
    [media.lg]: {
        display: 'none',
    },
});

const SquaredRadioInput = styled(Radio)({
    '.ant-radio-inner': {
        borderRadius: 4,
        '&::after': {
            content: "'✓'",
            textAlign: 'center',
            color: color.white,
            borderRadius: 4,
            top: -2,
            left: -2,
            width: 18,
            height: 18,
        },
    },
});

const BundleName = styled.p({
    margin: 0,
    fontSize: font.size.medium,
});

export const BundlesPickerHeader = ({ bundle, selected, isAlreadySubscribed, onPick, removeFromBasket }) => {
    const handleOnChange = e => {
        e.stopPropagation();
        if (selected && selected.timePeriod === e.target.value) {
            return removeFromBasket(bundle);
        }
        onPick({ plan_id: bundle.plan_id, timePeriod: e.target.value });
    };

    return (
        <Row type="flex" justify="space-between">
            <Col xs={24} lg={12}>
                <BundleName>{bundle.name}</BundleName>
            </Col>
            <Col xs={24} lg={12}>
                <StretchedRadioGroup disabled={isAlreadySubscribed} value={selected && selected.timePeriod}>
                    {bundle.options.map(option => (
                        <SquaredRadio>
                            <SquaredRadioLabelMobile>{option.timePeriod}</SquaredRadioLabelMobile>
                            <SquaredRadioInput
                                key={`${option.plan_id}-${option.timePeriod}`}
                                value={option.timePeriod}
                                onClick={handleOnChange}
                            >
                                {`$${option.value}`}
                            </SquaredRadioInput>
                        </SquaredRadio>
                    ))}
                </StretchedRadioGroup>
            </Col>
        </Row>
    );
};
