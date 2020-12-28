import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

const Button = ({
    onClick,
    type,
    alternate,
    children,
    isNavLink,
    isSubmit,
    isDisabled,
    style,
    className,
    icon,
    title,
    tooltip,
    test,
}) => (
    <button
        data-tip={tooltip}
        title={title}
        onClick={!isDisabled ? onClick : undefined}
        data-test={test || ''}
        className={`${className} ${css(
            styles.container,
            type !== 'default' && type !== 'logo' && styles.button,
            alternate && styles.alternate,
            alternate && styles[`${type}-alternate`],
            !alternate && type !== 'default' && styles[type],
            isNavLink && styles.navButton,
            isDisabled && styles.disabled,
            style,
        )}`}
        type={isSubmit ? 'submit' : 'button'}
        disabled={isDisabled}
    >
        {icon && <img src={icon} alt="" className={css(styles.buttonIcon)} />}
        {children}
    </button>
);

Button.defaultProps = {
    onClick: null,
    type: 'default',
    style: false,
    alternate: false,
    isNavLink: false,
    title: null,
    isSubmit: false,
    isDisabled: false,
    icon: '',
    className: '',
    tooltip: null,
    test: null,
};

export default Button;
