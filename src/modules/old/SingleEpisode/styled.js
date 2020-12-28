import styled from 'react-emotion'

import { colors, mobile } from 'src/styles/old'

const mobileBP = mobile.high('min-width')

export const ShowContainer = styled.div({
    display: 'flex',
    width: '100%',
    margin: '20px auto 30px',
    backgroundColor: colors.white,
    alignItems: 'stretch',
    flexDirection: 'column',
    maxWidth: 500,
    [mobileBP]: {
        maxWidth: 740,
    },
})

export const ShowWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [mobileBP]: {
        flexDirection: 'row',
    },
})

export const ShowInteraction = styled.div({
    display: 'flex',
    flexDirection: 'column',
    [mobileBP]: {
        flex: '1 0 20%',
    },
})

export const ImageWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
})

export const ShowImage = styled.img({
    maxHeight: 200,
    maxWidth: 200,
    objectFit: 'contain',
})

export const InteractionWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    [mobileBP]: {
        justifyContent: 'space-around',
    },
})

export const ShowInfo = styled.div({
    padding: '15px 15px 0px',
    [mobileBP]: {
        flex: '1 1 80%',
        padding: '30px 20px 0px 30px',
    },
})

export const EpisodeTitle = styled.h1({
    color: colors.black87,
    fontWeight: 500,
    fontSize: 16,
    margin: 0,
})

export const EpisodeDescription = styled.p({
    whiteSpace: 'pre-line',
    color: colors.black87,
    fontSize: '0.85rem',
    lineHeight: 1.36,
    textAlign: 'justify',
    paddingRight: '1rem',
})

export const EpisodeDescriptionContainer = styled.div({
    maxHeight: 300,
    overflow: 'scroll',
})

export const ShowTitle = styled.p({
    margin: 0,
})

export const ShowCreator = styled.p({
    margin: 0,
})
