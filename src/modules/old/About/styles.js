import { StyleSheet, colors, tablet, tabletMax } from 'src/styles/old'

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

        textAlign: 'left',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: 780,
        margin: '45px auto',

        [tabletMax]: {
            marginBottom: 10,
        },
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
        textAlign: 'center',
    },

    infoSubHeader: {
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
        lineHeight: 1.38,
        letterSpacing: 'normal',
        color: colors.black87,
        marginTop: 0,
    },

    img: {
        display: 'none',
        [tabletBP]: {
            display: 'block',
            maxWidth: '50%',
            height: 250,
            width: 250,
        },
    },

    right: {
        marginRight: 0,

        [tabletBP]: {
            marginRight: 80,
        },
    },

    left: {
        marginLeft: 0,
    },

    faq: {
        flexDirection: 'column',
        justifyContent: 'flex-start',

        paddingLeft: 15,
        paddingRight: 15,

        [tabletBP]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },

    faqWrapper: {},

    faqBlock: {
        marginBottom: 15,
    },

    faqText: {
        fontSize: '0.9rem',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 1.38,
        letterSpacing: 'normal',
        color: colors.black87,
        marginTop: 0,
        marginBottom: 0,
    },

    bold: {
        fontWeight: 900,
        fontSize: '1.25rem',
        marginBottom: 8,
    },
})
