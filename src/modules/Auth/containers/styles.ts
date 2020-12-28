import { Row } from 'antd';
import styled from 'react-emotion';
import { Link as RouterLink } from 'react-router-dom';

import { color, font, media } from 'src/styles/variables';

export const ScreenWrapper = styled.div({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app in the future, only on new pages for now
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: color.white,
    [media.sm]: {
        padding: '4rem 0',
        heigth: 'fit-content',
        backgroundColor: 'transparent',
    },
});

export const ContentWrapper = styled(Row)({
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: media.contentWidth,
    zIndex: 1,
    margin: '0 auto',
    padding: 0,
    [media.sm]: {
        padding: '0 2rem',
    },
});

export const FormWrapper = styled.div({
    backgroundColor: color.white,
    padding: '3rem',
    textAlign: 'center',
});

export const FormImage = styled.img({
    display: 'none',
    maxWidth: '100%',
    [media.md]: {
        display: 'block',
    },
});

export const FormHeader = styled.h2({
    fontSize: font.size.mediumLarge,
    lineHeight: 1.2,
    marginBottom: '2.5rem',
});

export const Form = styled.form({
    marginBottom: '2rem',
});

export const CheckboxWrapper = styled.div({
    position: 'relative',
});

interface LinkProps {
    right?: boolean;
}

export const Link = styled(RouterLink)<LinkProps>(
    {
        fontSize: font.size.base,
        textDecoration: 'underline',
        color: color.scorpion,
        '&:hover': {
            textDecoration: 'underline',
            color: color.royalBlue,
        },
    },
    ({ right }) =>
        right && {
            display: 'block',
            marginTop: '1.5rem',
            [media.sm]: {
                position: 'absolute',
                top: -4,
                right: 0,
                marginTop: 0,
            },
        },
);

export const ButtonWrapper = styled.div({
    width: '13rem',
    margin: '2rem auto 0',
});

export const SwitchFormQuestion = styled.p({
    marginBottom: '0.25rem',
});
