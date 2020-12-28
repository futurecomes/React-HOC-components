import React from 'react';

import FieldHOC from './Field';
import { css } from 'src/styles/old';
import styles from './styles';

import amex from './static/svg/amex.svg';
import discover from './static/svg/discover.svg';
import visa from './static/svg/visa.svg';
import mastercard from './static/svg/mastercard.svg';
import dinersclub from './static/svg/diners-club.svg';
import jcb from './static/svg/jcb.svg';

const cardSrcMap = {
    'American Express': amex,
    Discover: discover,
    Visa: visa,
    MasterCard: mastercard,
    'Diners Club': dinersclub,
    JCB: jcb,
    Unknown: false,
};

const Stripe = window.Stripe;

const Input = ({ label, input, placeholder, isOptional, meta: { touched, error } }) => {
    const cardType = Stripe.card.cardType(input.value);
    const cardSrc = cardSrcMap[cardType];

    return (
        <div className={css(styles.container)}>
            <label className={css(styles.label)} htmlFor={name}>
                {label}
                {isOptional && <span className={css(styles.grayText)}>&#0020; (Optional)</span>}
            </label>
            <div className={css(styles.cardWrapper)}>
                <input
                    {...input}
                    placeholder={placeholder}
                    type="password"
                    className={css(styles.input, styles.cardNumber, touched && error && styles.errorBorder)}
                />

                {cardSrc && <img src={cardSrc} alt={cardType} className={css(styles.cardIcon)} />}
            </div>
            {touched && error && <span className={css(styles.label, styles.error)}>{error}</span>}
        </div>
    );
};

Input.defaultProps = {
    placeholder: '',
    isOptional: false,
};

export default FieldHOC(Input);
