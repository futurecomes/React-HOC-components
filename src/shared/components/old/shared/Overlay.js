import React from 'react'
import styled from 'react-emotion'

const StyledOverlay = styled.div(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: props.top || 0,
    bottom: 0,
    background: 'black',
    opacity: 0.8,
    zIndex: 10,
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
}))

export const Overlay = props => <StyledOverlay top={props.top}>{props.children}</StyledOverlay>
