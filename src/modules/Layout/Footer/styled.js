import styled from 'react-emotion';
import { Link as RouterLink } from 'react-router-dom';

import { tablet, colors } from 'src/styles/old';
import { bounceInAnimation } from 'src/styles/animations';

const tabletMax = tablet.high('max-width');

const styledLink = {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    margin: '10px 0',
    textDecoration: 'none',
    cursor: 'pointer',
    ':last-child': {
        marginBottom: 20,
    },
};

export const Link = styled(RouterLink)(styledLink);

export const SocialLink = styled.a(styledLink);

export const Rights = styled.div({
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'right',

    [tabletMax]: {
        textAlign: 'center',
        marginTop: 10,
    },
});

export const Wrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    [tabletMax]: {
        display: 'block',
    },
});

export const Subheader = styled.div({
    display: 'flex',
    flexDirection: 'column',
    color: 'white',

    [tabletMax]: {
        borderBottom: '1px solid white',
        cursor: 'pointer',
    },
});

export const Icons = styled.div({
    [tabletMax]: {
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'center',
    },
});

export const Footer = styled.div({
    backgroundColor: colors.navigation,
    padding: '20px 70px 20px',
    minHeight: 210,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,

    [tabletMax]: {
        padding: '20px 40px 20px',
    },
});

export const Links = styled.div(props => ({
    [tabletMax]: {
        display: props.isCollapsed ? 'block' : 'none',
        animation: `${bounceInAnimation} .2s ease`,
        marginLeft: 20,
    },
}));

export const Header = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > i': {
        display: 'none',
    },
    [tabletMax]: {
        '& > i': {
            display: 'block',
        },
    },
});

export const NewsletterForm = styled.form({
    margin: 20,
});

export const EmailInput = styled.input({
    borderRadius: 10,
    padding: '7px 10px',
    border: 'none',
    color: '#000',
});

export const SubmitNewsletterButton = styled.button({
    background: colors.pictonBlue,
    padding: '7px 10px',
    borderRadius: 10,
    marginLeft: 15,
    cursor: 'pointer',

    [tabletMax]: {
        margin: '10px 0 0',
    },
});

export const Label = styled.label({
    display: 'flex',
    alignItems: 'center',
});

export const SubscribeWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    margin: '10px auto',
    width: '80%',
});

export const EmailWrapper = styled.div({
    [tabletMax]: {
        display: 'flex',
        flexDirection: 'column',
    },
});

export const HighlightText = styled.span({
    color: colors.pictonBlue,
});
