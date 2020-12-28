import { StyleSheet, colors, mobile } from 'src/styles/old'

const mobileAboveBP = mobile.high('min-width')

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        padding: 25,
        maxWidth: 740,
        margin: '0px auto',
        boxSizing: 'content-box',
    },

    fullWidth: {
        maxWidth: 'none',
    },

    card: {
        backgroundColor: colors.white,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 25,

        [mobileAboveBP]: {
            minWidth: 220,
        },
    },

    cardSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },

    cardText: {
        fontSize: '0.9rem',
        lineHeight: 1.36,
        maxWidth: 390,
        margin: '1px auto 16px',
    },

    cardButton: {
        fontSize: '1.25rem',
        minWidth: 200,
    },

    bigTitle: {
        color: colors.black87,
        fontSize: '1.4rem',
        marginTop: 0,

        [mobileAboveBP]: {
            fontSize: '2rem',
        },
    },

    blueTitle: {
        color: colors.azure,
        fontSize: '1.4rem',
        margin: '0px 0px 9px',

        [mobileAboveBP]: {
            fontSize: '2rem',
        },
    },
})
