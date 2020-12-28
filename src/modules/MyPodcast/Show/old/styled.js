import styled from 'react-emotion';

import { colors, tablet, mobile } from 'src/styles/old';

const tabletMax = tablet.high('max-width');
const mobileAboveBP = mobile.high('min-width');

export const IconAction = styled.span({
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
});

export const IconWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: colors.toGradient,
    padding: '5px 18px 5px 10px',
    borderRadius: 10,
});

export const ShowControlWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    boxSizing: 'content-box',
    padding: 10,

    [tabletMax]: {
        display: 'none',
    },
});

export const ArtCreatorLink = styled.span({
    color: colors.azure,
    cursor: 'pointer',
    ' :hover': {
        color: colors.cerulean,
    },
});

export const WarningButton = styled.div({
    display: 'flex',
    justifyContent: 'center',
});

export const EpisodesListRow = styled.div(({ header }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: header ? colors.lightBlue : colors.white,
}));

export const Cell = styled.div(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: props.flex || 1,
    textAlign: props.align || 'center',
    padding: 5,
    wordBreak: 'break-word',

    [tabletMax]: {
        display: props.hideOnMobile ? 'none' : 'flex',
        flex: props.manage ? 2 : props.flex,
        fontSize: 12,
    },
}));

export const EditEpisodeWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 600,
    padding: 15,
});

export const EditEpisodeRow = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ':not(:first-child)': {
        marginTop: 50,
    },
});

export const EditEpisodeTitle = styled.input({
    padding: 15,
    fontSize: 16,
});

export const EditEpisodeDescription = styled.textarea({
    padding: 15,
    fontSize: 16,
    minHeight: 200,
    maxHeight: 200,
    minWidth: 568,
    maxWidth: 568,
});

export const Label = styled.span({
    marginBottom: 5,
});

export const SubmitEditEpisode = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 20,
    maxHeight: 20,
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
    cursor: 'pointer',
    fontSize: 16,
    background: colors.toGradient,
    color: 'white',
});

export const Row = styled.div({
    display: 'flex',
    width: '100%',
    ':nth-child(even)': {
        background: '#f7f7f7',
    },
});

export const ShowTitle = styled.div({
    color: colors.black87,
    fontSize: '1.4rem',
    marginTop: 0,
    width: '100%',
});

export const ShareButtons = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20,

    [tabletMax]: {
        display: 'none',
    },
});

export const Manage = styled.div({
    display: 'flex',
    alignItems: 'center',

    [tabletMax]: {
        display: 'none',
    },
});

export const ShowBlock = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 25,
});

export const Show = styled.div({
    backgroundColor: colors.white,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 25,

    [mobileAboveBP]: {
        minWidth: 220,
    },
});

export const PaymentWrapper = styled.div({
    marginTop: '2rem',
    padding: 20,
    textAlign: 'left',
    borderTop: '1px solid #f1f1f1',
});
