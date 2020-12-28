import React from 'react';

import BillingFormContainer from 'src/containers/BillingForm';

import { css } from 'src/styles/old';
import styles from './styles';

import Plan from './Plan';

import Input from '../form/Input';
import Dropdown from '../form/Dropdown';
import CardNumber from '../form/CardNumber';

import Button from '../interactive/Button';
import EllipsesIndicator from '../activity/EllipsesIndicator';
import FormMessages from '../form/Messages';

const Form = ({
    isFetching,
    selectedPlan,
    handleSubmit,
    frequencyOptions,
    monthsOptions,
    yearsOptions,
    applyCoupon,
    appliedCode,
    isValidatingCode,
    codeErrorMessage,
    codeAcceptedMessage,
    submitPayment,
}) => (
    <div className={css(styles.container, styles.formPageContainer)}>
        <Plan type={selectedPlan} isForm />
        <div className={css(styles.formContainer)}>
            <div className={css(styles.formElementsContainer)}>
                <h2 className={css(styles.blueTitle)}>Billing Info</h2>
                <span className={css(styles.smallText)}>You can change your plan at any time</span>
            </div>
            <FormMessages spaceBelow />
            <form onSubmit={handleSubmit(submitPayment)} className={css(styles.form)}>
                <div className={css(styles.formElementsContainer, styles.flex, styles.noPaddingTop)}>
                    <div className={css(styles.row)}>
                        <Dropdown name="frequency" label="Set Plan Frequency" values={frequencyOptions} />
                        <div className={css(styles.inputWrapper)}>
                            <Input name="promoCode" label="Promo Code" />
                            {!appliedCode ? (
                                <Button style={styles.smallLink} alternate onClick={applyCoupon}>
                                    {isValidatingCode ? (
                                        <span>
                                            {'Verifying Code'}
                                            <EllipsesIndicator />
                                        </span>
                                    ) : (
                                        'Apply Code'
                                    )}
                                </Button>
                            ) : (
                                <span className={css(styles.successText)}>{codeAcceptedMessage}</span>
                            )}
                            {codeErrorMessage && <span className={css(styles.errorText)}>{codeErrorMessage}</span>}
                        </div>
                    </div>
                    <Input name="name" label="Name on Card (*)" />
                    <CardNumber name="cardNumber" label="Card Number (*)" />
                    <div className={css(styles.row)}>
                        <Dropdown
                            name="expirationMonth"
                            label="Expiration Month (*)"
                            values={monthsOptions}
                            placeholder="Month"
                        />
                        <Dropdown
                            name="expirationYear"
                            label="Expiration Year (*)"
                            values={yearsOptions}
                            placeholder="20XX"
                        />
                    </div>
                    <div className={css(styles.row)}>
                        <Input name="cvc" label="CVC (*)" />
                    </div>
                </div>
                <p className={css(styles.requiredText)}>
                    Fields marked <b>(*)</b> are required.
                </p>
                <Button isSubmit type="blue" style={styles.submit} isDisabled={isFetching}>
                    {isFetching ? (
                        <span>
                            {'Verifying'}
                            <EllipsesIndicator />
                        </span>
                    ) : (
                        'Pay & Start Podcasting'
                    )}
                </Button>
            </form>
        </div>
    </div>
);

export default BillingFormContainer(Form);
