import { StyleSheet, colors, mobile } from 'src/styles/old';

const aboveMobileBP = mobile.high('min-width');

export default StyleSheet.create({
    updateButton: {
        marginTop: '48px',
    },
    formContainer: {
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        margin: '10px auto 100px auto',
    },
    form: {
        marginTop: 15,
        textAlign: 'center',
        padding: '0px 15px 30px',

        [aboveMobileBP]: {
            padding: '0px 40px 30px',
        },
    },

    title: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '28px',
        color: '#383A48',
        padding: '0px 40px 0 40px',
        marginTop: '40px',
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

    accountWrapper: {
        width: '100%',
        maxWidth: '560px',
        minWidth: '320px',
        padding: '0 5px',
    },
});
