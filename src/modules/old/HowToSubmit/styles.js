import { StyleSheet, colors, tablet } from 'src/styles/old'

import headerImg from './static/jpg/bitmap.jpg'

const tabletBP = tablet.high('min-width')

export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.white,
    },

    header: {
        backgroundImage: `url(${headerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 440,
        textAlign: 'center',

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
    },

    section: {
        maxWidth: 530,
        margin: '0px auto',
    },

    tag: {
        fontSize: '1.5rem',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.white,
        margin: 0,
        textDecoration: 'underline',
    },

    headerTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.white,
        margin: 0,
    },

    body: {
        maxWidth: 1030,
        margin: '0px auto',
        paddingTop: 0,
        paddingBottom: 20,

        [tabletBP]: {
            paddingTop: 35,
        },
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: 780,
        margin: '45px auto',
    },

    centered: {
        alignItems: 'center',
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        paddingLeft: 15,
        paddingRight: 15,

        [tabletBP]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },

    infoTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.azure,
        margin: '0px 0px 20px',
    },

    infoP: {
        fontSize: '1rem',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 1.7,
        letterSpacing: 'normal',
        color: colors.black87,
        marginTop: 0,
    },

    listDirections: {
        paddingLeft: 15,
        paddingTop: 5,
        lineHeight: 2,
    },
})
