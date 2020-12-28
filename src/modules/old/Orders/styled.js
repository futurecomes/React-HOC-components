import styled from 'react-emotion';
import { Link as RouterLink } from 'react-router-dom';
import { mobile } from 'src/styles/old';

import { colors } from 'src/styles/old';

const aboveMobileBP = mobile.high('min-width');

export const PageWrapper = styled.div({
    backgroundColor: colors.white,

    display: 'flex',
    flexDirection: 'column',
    margin: '10px auto 100px auto',
    width: '100%',
    maxWidth: '560px',
    minWidth: '320px',
    padding: '0px 15px 30px',

    [aboveMobileBP]: {
        padding: '0px 40px 30px',
    },
});

export const Title = styled.div({
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#383A48',
    marginTop: '40px',
});

export const ActionButton = styled.button({
    cursor: 'pointer',
    padding: '4px 12px',
    background: '#F2F4F9',
    borderRadius: '5px',
    margin: '0 auto',
    display: 'block',
});

export const Link = styled(RouterLink)({
    color: colors.navigation,
});

export const FormWrapper = styled.div({
    margin: '10px 0',
    padding: 10,
    background: 'white',
});
