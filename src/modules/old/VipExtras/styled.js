import styled from 'react-emotion'

import { colors, tablet } from 'src/styles/old'

const tabletMax = tablet.high('max-width')

export const OrderItem = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    padding: 5,
    borderBottom: '1px solid grey',
})

export const TileWrapper = styled.div(props => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    margin: 10,
    width: '100%',
    minHeight: 100,
    maxHeight: props.isOpen ? 500 : 100,
    position: 'relative',
    cursor: 'pointer',
    background: 'white',
    transition: 'max-height 0.5s',

    [tabletMax]: {
        flexDirection: props.isOpen && 'column',
        minHeight: 100,
        maxHeight: props.isOpen ? 500 : 140,
    },
}))

export const PriceStartsAt = styled.p({
    whiteSpace: 'nowrap',
    marginRight: 20,
})

export const Text = styled.h4(props => ({
    [tabletMax]: {
        color: props.selected ? 'white' : 'black',
    },
}))

export const DescriptionText = styled.div(props => ({
    display: props.display,
    marginBottom: 20,
}))

export const TextIconWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginRight: 15,
})

export const IconWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    margin: '0 50px',
    '& > svg': {
        height: 30,
        transition: 'fill .1s',
    },
    [tabletMax]: {
        margin: '0 20px',
    },
})

export const Button = styled.button(props => ({
    padding: '5px 15px',
    borderRadius: 10,
    width: 60,
    background: !props.disabled ? colors.pictonBlue : 'grey',
    color: !props.disabled ? 'black' : 'white',
    cursor: !props.disabled && 'pointer',

    [tabletMax]: {
        height: '100%',
    },
}))

export const OrderSummary = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 830,
    minHeight: 240,
    background: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    position: 'relative',
    paddingBottom: 35,
    borderRadius: 15,
    boxSizing: 'border-box',
    marginTop: 30,

    [tabletMax]: {
        margin: '0 10px',
        width: 'initial',
    },
})

export const CartCopy = styled.span({
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    width: '100%',
})

export const CardsWrapper = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 850,

    [tabletMax]: {
        width: 'initial',
    },
})

export const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 1200,
    maxWidth: '100%',
    margin: '20px auto',

    [tabletMax]: {
        display: 'block',
        width: 'initial',
    },
})

export const Checkout = styled.div({
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: 'translateX(-50%)',
})

export const CardContainer = styled.div({
    display: 'flex',

    [tabletMax]: {
        display: 'block',
    },
})

export const Payment = styled.div({
    width: 600,

    [tabletMax]: {
        width: 'initial',
        padding: 10,
    },
})

export const Info = styled.h2({
    textAlign: 'center',
    margin: '30px 0',
    color: colors.navigation,
})

export const Reminder = styled.span({
    color: 'grey',
    fontSize: 12,
    marginTop: 5,
})

export const CardHeader = styled.h4({
    marginBottom: 0,
})

export const HeaderWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    margin: '0 25px 0',

    '& + div': {
        marginTop: 10,
    },
})

export const JumpCartLink = styled.a({
    textDecoration: 'none',
    color: colors.fromGradient,
})

export const ProductName = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const Option = styled.div({
    margin: 10,
    width: 160,
    display: 'flex',
    justifyContent: 'space-between',
})

export const SingleButtonWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    width: 180,
})
