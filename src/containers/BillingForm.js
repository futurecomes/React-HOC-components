import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { monthsList, yearsList } from 'src/shared/helpers/listGenerators'
import { submitPayment, applyCoupon } from 'src/shared/components/old/Billing/actions'

window.Stripe = window.Stripe || { card() {} }

const stripeCard = window.Stripe.card

function validate(values) {
    const errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.cardNumber) {
        errors.cardNumber = 'Required'
    } else if (!stripeCard.validateCardNumber(values.cardNumber)) {
        errors.cardNumber = 'Invalid Card Number'
    }

    if (!values.cvc) {
        errors.cvc = 'Required'
    } else if (!stripeCard.validateCVC(values.cvc)) {
        errors.cvc = 'Invalid CVC'
    }

    if (values.expirationMonth && !values.expirationYear) {
        errors.expirationYear = 'Required'
    }

    if (values.expirationYear && !values.expirationMonth) {
        errors.expirationMonth = 'Required'
    }

    return errors
}

const durationMap = {
    1: 'Monthly',
    6: 'Biannually',
    12: 'Annually',
}

function filterCardDates({ expirationMonth, expirationYear }) {
    let months = monthsList
    let years = yearsList

    if (typeof expirationYear !== 'undefined') {
        months = monthsList.filter(({ value }) => stripeCard.validateExpiry(value, expirationYear))
    }

    if (typeof expirationMonth !== 'undefined') {
        years = yearsList.filter(({ value }) => stripeCard.validateExpiry(expirationMonth, value))
    }

    return { monthsOptions: months, yearsOptions: years }
}

function centsToDollars(cents) {
    return (cents / 100).toFixed(0)
}

function mapStateToProps({
    billing: { isSubmittingPayment, subscriptions, coupons, form: { plan, codeMessage, appliedCode }, form },
    form: { billing },
}) {
    const frequencyOptions = subscriptions
        .filter(({ type }) => type === plan)
        .sort((a, b) => b.price - a.price)
        .map(({ intervalCount, amount, id }) => ({
            text: `${durationMap[intervalCount]} - $${centsToDollars(amount)}`,
            value: id,
        }))

    const { monthsOptions, yearsOptions } = filterCardDates((billing && billing.values) || {})

    return {
        isFetching: isSubmittingPayment,
        selectedPlan: plan,
        frequencyOptions,
        monthsOptions,
        yearsOptions,
        coupons,
        codeErrorMessage: codeMessage,
        codeAcceptedMessage: appliedCode ? `Accepted - ${appliedCode.percentOff}% off!` : '',
        appliedCode: !!appliedCode,
        isValidatingCode: form.isFetching,
        initialValues: {
            frequency: frequencyOptions.length ? frequencyOptions[0].value : null,
        },
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitPayment,
            applyCoupon,
        },
        dispatch,
    )
}

function createContainer(Component) {
    const FormContainer = reduxForm({
        form: 'billing',
        validate,
    })(Component)

    return connect(mapStateToProps, mapDispatchToProps)(FormContainer)
}

export default createContainer
