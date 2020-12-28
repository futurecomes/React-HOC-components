import styled, { injectGlobal } from 'react-emotion';

import { colors } from 'src/styles/old';

// eslint-disable-next-line
injectGlobal`
    .StripeElement {
        display: block;
        margin: 10px 0 20px 0;
        max-width: 500px;
        padding: 10px 14px;
        font-size: 1em;
        font-family: 'Source Code Pro, monospace';
        box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
        border: 0px;
        outline: 0px;
        border-radius: 4px;
        background: white;
    }
`;

export const Error = styled.span({
    color: colors.error,
});

export const PayButton = styled.button(props => ({
    whiteSpace: 'nowrap',
    border: 0,
    outline: 0,
    display: 'inline-block',
    height: 40,
    padding: '0 14',
    boxShadow: '0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)',
    color: '#fff',
    borderRadius: 4,
    fontSize: 15,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    backgroundColor: props.disabled ? '#333' : '#6772e5',
    textDecoration: 'none',
    marginTop: 10,
    cursor: 'pointer',
}));
