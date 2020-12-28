import styled from 'react-emotion';
import { mobile, tablet, colors } from 'src/styles/old';

const tabletMax = tablet.high('max-width');
const mobileBP = mobile.high('min-width');
const mobileBP2 = mobile.high('max-width');

export const Badge = styled.div({
    padding: '5px 10px',
    backgroundColor: '#eaf2f9',
    color: '#616161',
    borderRadius: '5px',
    margin: '10px 0px 0px 0px',
    fontSize: '14px',
    fontWeight: 'bold',
    width: 'fit-content',
    [tabletMax]: {
        padding: 5,
        fontSize: 14,
    },
    [mobileBP2]: {
        display: 'none',
    },
});

export const ShowDescription = styled.p(props => ({
    color: colors.black87,
    fontSize: '0.9rem',
    lineHeight: 2,
    margin: '10px 0',
    textAlign: 'justify',
    maxWidth: '90%',
    [mobileBP2]: {
        margin: '10px 0px',
        padding: '0 5px',
        maxWidth: '100%',
    },
}));

export const ShowTitle = styled.h2({
    color: colors.black87,
    fontWeight: 500,
    margin: '2.5px 0px 0px',
    fontSize: 25,
    [mobileBP2]: {
        fontSize: 21,
        wordBreak: 'break-word',
    },
});

export const TitleWrapper = styled.div({
    display: 'flex',
});

export const ActionButton = styled.button({
    display: 'flex',
    border: '2px solid #484848',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    fontSize: 14,
    background: '#eaf2f9',
    color: 'white',
    padding: '9px',
    borderRadius: 5,
    cursor: 'pointer',
    margin: '0px 5px',
    ':first-of-type': {
        marginLeft: 0,
    },
    [mobileBP]: {
        margin: '0px 5px',
    },
});

export const SubscribeButton = styled.button({
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    fontSize: 14,
    background: '#eaf2f9',
    color: '#000000de',
    padding: '5px 10px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '0px 5px',
    ':first-of-type': {
        marginLeft: 0,
    },
    [mobileBP2]: {
        border: '2px solid #dcdcdc'
    }
});

export const PaymentButton = styled.button({
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    fontSize: 14,
    background: '#eaf2f9',
    color: '#000000de',
    padding: '5px 10px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: 'bold',
    ':first-of-type': {
        marginLeft: 0,
    },
    [mobileBP]: {
        margin: '0px 5px',
    },
    [mobileBP2]: {
        border: '2px solid #dcdcdc'
    }
});

export const LinkActionButton = styled(ActionButton.withComponent('a'))({
    boxSizing: 'border-box',
    textDecoration: 'none',
});

export const ThirdPartyServices = styled.div({
    display: 'flex',
    flexDirection: 'row',
});

export const PaymentFormWrapper = styled.div(props => ({
    padding: 20,
    margin: '12px 0',
    width: 'fit-content',
    border: '1px solid #e6e6e6',
    background: props.finalized ? '#f9f9f9' : 'white',
    transition: 'all .2s',
}));

export const PasswordInput = styled.input({
    padding: 3,
    fontSize: 14,
    borderRadius: 10,
    border: '1px solid lightgrey',
});

export const AccessButton = styled.button({
    padding: '5px 20px',
    borderRadius: 10,
    background: colors.toGradient,
    color: 'white',
    marginLeft: 5,
    cursor: 'pointer',
});
