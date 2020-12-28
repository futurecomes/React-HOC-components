import { Button as AntdButton, Tooltip } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import { hexToRgba } from 'src/shared/helpers/hexToRgba';
import { color } from 'src/styles/variables';

interface StyleProps {
    centered: number;
    fullwidth: number;
    small: number;
}

const BaseButton = styled<any>(AntdButton)<StyleProps>(({ centered, fullwidth, small }) => ({
    '&.ant-btn': {
        display: fullwidth ? 'block' : 'inline-block',
        width: fullwidth ? '100%' : 'fit-content',
        height: 'auto',
        minWidth: '8rem',
        margin: centered ? '0 auto' : 0,
        padding: small ? '0.5rem' : '0.7rem 1rem',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        border: '2px solid transparent',
        borderRadius: 3,
        transition: '0.2s background-color, 0.2s border-color, 0.2s color',
    },
}));

const PrimaryButton = styled(BaseButton)({
    '&.ant-btn': {
        backgroundColor: color.royalBlue,
        borderColor: color.royalBlue,
        color: color.white,

        '&:hover, &:focus': {
            backgroundColor: hexToRgba(color.royalBlue, 0.8),
            borderColor: hexToRgba(color.royalBlue, 0.8),
        },
    },
});

const SecondaryButton = styled(BaseButton)({
    '&.ant-btn': {
        backgroundColor: color.white,
        borderColor: color.white,
        color: color.tundora,

        '&:hover': {
            backgroundColor: hexToRgba(color.white, 0.8),
            borderColor: hexToRgba(color.white, 0.8),
        },
    },
});

const BorderedButton = styled(BaseButton)({
    '&.ant-btn': {
        backgroundColor: 'transparent',
        borderColor: color.white,
        color: color.white,

        '&:focus': {
            backgroundColor: 'transparent',
            borderColor: color.white,
            color: color.white,
        },
        '&:hover': {
            borderColor: color.white,
            backgroundColor: color.white,
            color: color.tundora,
        },
    },
});

const DisabledButton = styled(BaseButton)({
    '&.ant-btn': {
        backgroundColor: color.gallery,
        color: color.tundora,
        cursor: 'not-allowed',

        '&:hover': {
            backgroundColor: color.gallery,
            color: color.tundora,
            borderColor: 'transparent',
        },
    },
});

const buttonsTypes = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    bordered: BorderedButton,
    disabled: DisabledButton,
};

export interface ButtonProps {
    type?: string;
    centered?: boolean;
    fullWidth?: boolean;
    small?: boolean;
    disabled?: boolean;
    disabledTooltip?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: (e: Event) => void;
}

// Not using 'disabled' as a prop, because it causes trouble with antd Tooltip triggering
export const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    centered,
    disabled,
    fullWidth,
    disabledTooltip,
    small,
    children,
    onClick,
    htmlType,
}) => {
    const handleOnClick = !disabled && onClick;
    const ButtonComponent = buttonsTypes[disabled ? 'disabled' : type];

    return (
        <Tooltip title={disabledTooltip}>
            <ButtonComponent
                centered={centered ? 1 : 0}
                small={small ? 1 : 0}
                fullwidth={fullWidth ? 1 : 0}
                onClick={handleOnClick}
                htmlType={htmlType}
            >
                {children}
            </ButtonComponent>
        </Tooltip>
    );
};
