import { StyleSheet, colors } from 'src/styles/old'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.azure,
    },
    link: {
        color: colors.azure,
    },
    p: {
        color: colors.black87,
        padding: '0px 25px 30px',
        margin: 0,
        fontSize: '1rem',
    },
})
