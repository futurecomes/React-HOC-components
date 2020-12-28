import styled from 'react-emotion'

import { colors } from 'src/styles/old'

export const Icon = styled.img({
    cursor: 'pointer',
    margin: '0 5px',
})

export const Title = styled.h1({
    marginTop: 0,
    color: colors.azure,
})

export const DraftWrapper = styled.div({})
export const Row = styled.div({
    display: 'flex',
    background: 'white',
    ':first-child': {
        background: colors.lightBlue,
    },
})

export const Cell = styled.div(props => ({
    minHeight: 28,
    flex: props.flex || 1,
    padding: 10,
    fontStyle: props.italic ? 'italic' : 'initial',
    borderRight: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
    ':last-child': {
        borderRight: 'none',
    },
}))

export const Table = styled.div({
    border: '1px solid lightgray',
    borderBottom: 'none',
})

export const LoadingWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
})
