import styles from 'src/shared/components/old/shared/styles'
import { StyleSheet, merge, colors } from 'src/styles/old'

export default merge(
    styles,
    StyleSheet.create({
        space: {
            margin: '40px 0px 20px',
        },
        regular: {
            textAlign: 'center',
            maxWidth: 475,
            padding: '0px 15px 20px',
        },
        skinnier: {
            maxWidth: 350,
            textAlign: 'center',
        },
        links: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 10,
        },
        link: {
            minWidth: 175,
            margin: '0px 10px 20px',
            ':last-of-type': {
                marginBottom: 0,
            },
        },
        pText: {
            color: colors.black54,
            margin: '10px 0px 15px',
        },
        loading: {
            width: '100%',
        },
    }),
)
