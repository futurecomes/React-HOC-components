import styled from 'react-emotion'

import { colors, mobile } from 'src/styles/old';
const mobileBP2 = mobile.high('max-width');

export const OpenedEpisodeContainer = styled.div({
    padding: '0px 50px',
    [mobileBP2] : {
        padding: '0 20px',
    }
})

export const EpisodeLinkInput = styled.input({
    width: 'calc(100% - 40px)',
    marginTop: 10,
    padding: 10,
    border: `solid 1px ${colors.black12}`,
    fontSize: '1rem',
    color: colors.black87,
    ':focus': {
        border: `solid 1px ${colors.azure}`,
        outline: 'none',
    },
})

export const EpisodeLinkLabel = styled.label({
    fontSize: '1rem',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.azure,
})

export const EpisodeLinkContainer = styled.div({
    padding: 10,
})

export const EpisodeDescription = styled.p({
    whiteSpace: 'pre-line',
    textAlign: 'justify',
    maxHeight: 350,
    overflowY: 'auto',
    paddingRight: '1rem',
})
