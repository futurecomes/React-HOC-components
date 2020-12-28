import styled from 'react-emotion'
import { colors } from 'src/styles/old'

export const ErrorMessage = styled.div(props => ({
    color: colors.error,
    ...props,
}))
