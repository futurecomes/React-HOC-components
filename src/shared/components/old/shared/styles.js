import { StyleSheet, colors, mobile } from 'src/styles/old'

const aboveMobileBP = mobile.high('min-width')

export default StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        maxWidth: '80%',
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
        padding: '0px 25px 30px',
    },

    confirmatinoCard: {
        maxWidth: 550,
        display: 'flex',
        flexDirection: 'column',
        margin: '25px auto -50px',
    },

    formContainer: {
        backgroundColor: colors.white,
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
    },

    form: {
        marginTop: 15,
        textAlign: 'center',
        padding: '0px 15px 30px',

        [aboveMobileBP]: {
            padding: '0px 25px 30px',
        },
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
    },

    title: {
        fontSize: '1.2rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.azure,
        marginTop: '1rem',
        marginBottom: 0,
    },

    section: {},

    header: {
        fontWeight: 900,
        fontSize: '1.25rem',
        marginBottom: 8,
    },

    p: {
        color: colors.black87,
        margin: 0,
        fontSize: '1rem',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 1.38,
        letterSpacing: 'normal',
    },

    /* styles for '...' */
    maxLines3: {
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '1.2em',
        maxHeight: '3.6em',
        marginRight: '-1em',
        paddingRight: '1em',

        ':before': {
            content: '...',
            position: 'absolute',
            right: '0',
            bottom: '0',
        },
        ':after': {
            content: '',
            position: 'absolute',
            right: 0,
            width: '1em',
            height: '1em',
            marginTop: '0.2em',
            background: 'white',
        },
    },
})
