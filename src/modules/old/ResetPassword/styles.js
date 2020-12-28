import styles from 'src/shared/components/old/shared/styles'
import { StyleSheet, merge } from 'src/styles/old'

export default merge(
    styles,
    StyleSheet.create({
        space: {
            margin: '40px 0px 20px',
        },
        skinnier: {
            maxWidth: 350,
            textAlign: 'center',
        },
        backToSignUp: {
            margin: '20px 70px 0px',
        },
    }),
)
