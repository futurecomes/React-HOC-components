import styled from 'react-emotion'

import wave from './static/svg/wave.svg'

const defaultHeight = 50

export const Wave = styled.div(props => ({
    width: '100%',
    height: props.height || defaultHeight,
    backgroundImage: `url(${wave})`,
    backgroundRepeat: 'repeat-x',
    position: 'absolute',
    top: props.height || -(defaultHeight - 1),
}))
