import styled from 'react-emotion';

import { colors } from 'src/styles/old';
import { mobile } from 'src/styles/old';

const aboveMobileBP = mobile.high('min-width');

export const StripeLink = styled.a({
    display: 'block',
    background: '#3C82E7',
    borderRadius: '3px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    width: 'fit-content',
    padding: '12px 33px',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background 0.25s',

    ':hover': {
        background: '#2f74d8',
        color: 'white',
    },
});

export const Text = styled.p({
    fontSize: '16px',
    color: '#000000',
    marginBottom: '30px',
});

export const Title = styled.h3({
    fontSize: '24px',
    lineHeight: '28px',
    color: '#383A48',
    margin: '40px 0',
    whiteSpace: 'pre-line',
});

export const Processing = styled.span({
    marginTop: '20px',
    fontSize: '14px',
    color: '#000000',
    marginBottom: '60px',
    marginLeft: '15px',
    [aboveMobileBP]: {
        marginLeft: '40px',
    },
});

export const Container = styled.div({
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    margin: '10px auto 100px auto',
    width: '100%',
    maxWidth: '560px',
    minWidth: '320px',
    padding: '0 5px',
});

export const stripeContainer = styled.div({
    padding: '0px 15px 30px',
    textAlign: 'initial',
    [aboveMobileBP]: {
        padding: '0px 40px 30px',
    },
});
