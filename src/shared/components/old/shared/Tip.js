import React from 'react'
import styled from 'react-emotion'

import { IconFont } from '../IconFont'

const StyledWrapper = styled.div({
    display: 'inline-block',
    position: 'relative',
})

const StyledText = styled.h4({
    fontWeight: 500,
    textAlign: 'center',
    background: 'white',
    borderRadius: 15,
    padding: '15px 20px 15px 15px',
    margin: 5,
})

export class Tip extends React.Component {
    state = {
        show: true,
    }

    close = () => {
        this.setState({ show: false })
    }

    render() {
        return this.state.show ? (
            <StyledWrapper>
                <StyledText>{this.props.text}</StyledText>
                <IconFont onClick={this.close} position="absolute" right={10} top={10} fontSize={14}>
                    close
                </IconFont>
            </StyledWrapper>
        ) : null
    }
}
