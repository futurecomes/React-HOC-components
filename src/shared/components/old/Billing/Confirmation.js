import React from 'react';
import { css } from 'src/styles/old';
import close from '../shared/static/svg/close.svg';
import styles from './styles';

const Confirmation = ({ clearNewBilling }) => (
    <div className={css(styles.card, styles.confirm)}>
        <h3 className={css(styles.blueTitle)}>
            Payment Confirmed
            <div className={css(styles.close)} onClick={clearNewBilling} tabIndex={0} role="button">
                <img src={close} alt="close" />
            </div>
        </h3>
    </div>
);

export default Confirmation;
