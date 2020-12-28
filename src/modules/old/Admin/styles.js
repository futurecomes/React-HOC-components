import { StyleSheet, colors, mobile } from 'src/styles/old'

const mobileLow = mobile.low('max-width')

export default StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 1000,
        margin: '30px auto',
        padding: 0,
    },
    containerBreadcrumbs: {
        width: 1000,
    },
    input: {
        padding: 10,
        border: `solid 1px ${colors.black12}`,
        fontSize: '1rem',
        color: colors.black87,
        ':focus': {
            border: `solid 1px ${colors.azure}`,
            outline: 'none',
        },
    },
    divider: {
        margin: '30px 0',
        borderBottom: `1px solid ${colors.black12}`,
    },
    spacer: {
        display: 'block',
        marginTop: 36,
    },
    title: {
        color: colors.black87,
        fontSize: '1.25rem',
        fontWeight: 400,
        marginBottom: 15,
    },
    label: {
        display: 'block',
        fontSize: '0.85em',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.azure,
        marginBottom: 5,
    },

    // Analytics
    analyticsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    analyticsTitle: {
        display: 'block',
        fontSize: '0.85em',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.azure,
        marginTop: 15,
        marginBottom: 9,
    },
    analyticsText: {
        fontSize: '0.9rem',
        marginBottom: 9,
    },
    analyticsPrimary: {
        color: colors.black87,
        fontSize: '1.25rem',
    },
    analyticsSecondary: {
        color: colors.black12,
    },

    // Detail Views
    detailCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 30px',
        backgroundColor: colors.white,
    },
    detailHeader: {
        display: 'flex',
        flexDirection: 'row',
    },
    detailTitle: {
        margin: 0,
        fontSize: '1.15rem',
        fontWeight: 400,
    },
    detailHeaderRight: {
        marginLeft: 'auto',
    },
    detailTableTitle: {
        margin: '0 0 15px',
        fontSize: '1.15rem',
        fontWeight: 400,
    },

    // Detail Views -- Form
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 18,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18,
    },
    inputColumn: {
        flex: 1,

        ':first-child': {
            marginRight: 42,
        },
    },
    formButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 18,
    },
    formButton: {
        ':not(:last-child)': {
            marginRight: 6,
        },
    },

    // Dashboard
    containerDashboard: {
        maxWidth: 1000,
        flexDirection: 'row',
        flexWrap: 'wrap',

        [mobileLow]: {
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        margin: 15,
        backgroundColor: colors.white,
    },
    cardTitle: {
        fontSize: '1.15rem',
        fontWeight: 400,
        color: colors.azure,
    },
    statsContainer: {
        flex: 1,
        padding: '9px 21px 24px',
    },
    stat: {
        position: 'relative',
        display: 'block',
        fontSize: '.9rem',
        marginBottom: 9,
    },
    substat: {
        fontSize: '0.9rem',
        color: colors.black54,
    },
    statName: {},
    statValue: {
        position: 'absolute',
        right: 0,
    },
    statsLink: {
        display: 'block',
        padding: 9,
        backgroundColor: colors.azure,
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '0.9rem',
        color: colors.white,

        ':hover': {
            color: colors.white,
        },
    },

    // User
    activeStatus: {
        marginLeft: 6,
        color: colors.shamrockGreen,
    },
    archivedStatus: {
        marginLeft: 6,
        color: colors.tangerine,
    },

    // Ads
    newAdForm: {
        maxHeight: 400,
        overflowY: 'auto',
    },
    newAdImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    newItemButton: {
        position: 'absolute',
        right: 0,
    },
    adImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        marginTop: 18,
    },
    imageLeaderboard: {
        width: 728,
        height: 90,
    },
    imageHalfPage: {
        width: 160,
        height: 600,
        marginRight: 24,
    },
    imageMobile: {
        width: 320,
        height: 100,
    },
})
