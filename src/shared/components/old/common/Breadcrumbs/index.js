import React from 'react';

import { css } from 'src/styles/old';
import styles from './styles';

import Link from 'src/shared/components/old/interactive/Link';

const Breadcrumbs = ({ style, links }) => {
    const internalLinks = [...links];
    const lastLink = internalLinks.pop();

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.linkContainer, style)}>
                {internalLinks.map(({ text, path }) => (
                    <Link to={path} style={styles.link} key={path}>
                        {text}
                    </Link>
                ))}
                <span className={css(styles.link, styles.activeLink)}>{lastLink.text}</span>
            </div>
        </div>
    );
};

Breadcrumbs.defaultProps = {
    style: false,
};

export default Breadcrumbs;
