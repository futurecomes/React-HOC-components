import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { css } from 'src/styles/old';

import styles from './styles';

function getActiveStyles(isNavLink, alternate, type) {
    if (!isNavLink || type === 'logo' || type !== 'default') {
        return undefined;
    }

    return css(alternate ? styles[type] : styles[`${type}-alternate`]);
}

function filterStyleProp(style) {
    return Array.isArray(style) ? style.filter(s => s) : style;
}

const LinkComp = ({ to, type, alternate, target, isNavLink, style, children, icon, onClick, color, author }) => {
    let props = {
        to,
        target,
        className: css(
            styles.container,
            type !== 'default' && type !== 'logo' && styles.button,
            alternate && styles.alternate,
            alternate && styles[`${type}-alternate`],
            author && styles.authorLink,
            !alternate && type !== 'default' && styles[type],
            type === 'default' && isNavLink && styles.navLink,
            type !== 'default' && isNavLink && styles.navButton,
            filterStyleProp(style),
        ),
        onClick,
    };

    if (isNavLink) {
        props = Object.assign({}, props, {
            activeClassName: getActiveStyles(isNavLink, alternate, type),
        });
    }

    return React.createElement(isNavLink ? NavLink : Link, props, [
        icon && <img src={icon} alt="" className={css(styles.buttonIcon)} key={'link-icon'} />,
        children,
    ]);
};

LinkComp.defaultProps = {
    type: 'default',
    target: null,
    style: false,
    alternate: false,
    isNavLink: false,
    onClick: () => {},
    icon: '',
};

export default LinkComp;
