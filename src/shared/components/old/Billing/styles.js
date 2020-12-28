import { StyleSheet, colors, mobile, tablet } from 'src/styles/old';

const mobileAboveBP = mobile.high('min-width');
const mobileBelowBP = mobile.high('max-width');
const tabletBP = tablet.high('max-width');
const tabletAboveBP = tablet.high('min-width');

export default StyleSheet.create({
    pageWrapper: {
        flex: 1,
    },
    close: {
        position: 'absolute',
        right: 10,
        top: 0,
        cursor: 'pointer',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0px auto',
        padding: '20px 0px 0px',
        maxWidth: 315,

        [mobileAboveBP]: {
            maxWidth: 738,
            padding: '20px 71px 0px',
        },
    },

    card: {
        backgroundColor: colors.white,
        textAlign: 'center',
        padding: '20px 0px',
        display: 'flex',
        flexDirection: 'column',

        [mobileAboveBP]: {
            minWidth: 220,
        },
    },

    confirm: {
        marginBottom: 25,
        position: 'relative',
    },

    cardText: {
        fontSize: '0.9rem',
        lineHeight: 1.36,
        maxWidth: 304,
        margin: '1px auto',
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

    plans: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        [mobileAboveBP]: {
            flexDirection: 'row',
        },
    },

    planCard: {
        paddingBottom: 0,

        [tabletBP]: {
            minWidth: 0,
            width: '30%',
        },

        [mobileBelowBP]: {
            minWidth: 220,
            width: 'auto',
            marginBottom: 32,
        },
    },

    planTitle: {
        color: colors.azure,
        fontSize: '1.2rem',
        margin: 0,
    },

    price: {
        color: colors.black87,
        fontSize: '2rem',
        lineHeight: 1.5,
    },

    pricingDetails: {
        minHeight: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    smallText: {
        color: colors.black54,
        lineHeight: 1.42,
        fontSize: '0.8rem',
        margin: 0,
    },

    features: {
        borderTop: `5px solid ${colors.black12}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0px 10px',
    },

    feature: {
        color: colors.black87,
        fontSize: '0.9rem',
        lineHeight: 1.36,
        margin: '10px 0px',
    },

    extraFeature: {
        color: colors.periwinkle,
    },

    featureTag: {
        fontSize: '0.8rem',
        margin: '-10px 0px 10px',
    },

    formPageContainer: {
        flexDirection: 'column',

        maxWidth: 738,
        padding: '15px 15px 0px',

        [tabletAboveBP]: {
            flexDirection: 'row',
        },
    },

    formPlan: {
        [tabletBP]: {
            minWidth: '0px !important',
            width: 'auto !important',
            paddingBottom: '0px !important',
        },
    },

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 20,

        [tabletAboveBP]: {
            marginLeft: 21,
            marginTop: 0,
        },
    },

    formElementsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '17px 25px',
    },

    noPaddingTop: {
        padding: '0px 25px 17px',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },

    flex: {
        flex: 1,
    },

    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',

        [mobileAboveBP]: {
            flexDirection: 'row',
        },
    },

    smallLink: {
        fontSize: '0.85rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        textDecoration: 'underline',
    },

    errorText: {
        fontSize: '0.85rem',
        fontWeight: 500,
        color: colors.coral,
    },
    successText: {
        fontSize: '0.85rem',
        fontWeight: 500,
        color: colors.shamrockGreen,
    },

    inputWrapper: {
        minWidth: '48%',
    },

    currentPlan: {
        fontSize: '1rem',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 1.4,
        letterSpacing: 'normal',
        textAlign: 'center',
        color: colors.white,
        backgroundColor: colors.cerulean,
        padding: '8px 15px',
    },

    nevermind: {
        alignSelf: 'center',
        marginTop: 20,
    },

    requiredText: {
        color: '#aaa',
        fontSize: '0.8em',
        fontStyle: 'italic',
        margin: '-15px 25px 25px',
    },
});
