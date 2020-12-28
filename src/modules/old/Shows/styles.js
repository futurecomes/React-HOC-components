import { StyleSheet, colors, mobile } from 'src/styles/old';

const mobileAboveBP = mobile.high('min-width');
const mobileBP2 = mobile.high('max-width');

export default StyleSheet.create({
    shareBtnWrap: {
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20,
    },
    statsText: {
        fontSize: '0.8em',
        color: '#059bff',
    },
    statsStatus: {
        textAlign: 'center',
        color: '#999',
        padding: 50,
    },
    vAlignMiddle: {
        verticalAlign: 'middle',
        fontSize: '0.9em',
        display: 'inline-block',
        margin: '1px',
    },
    optionSelect: {
        width: 150,
        display: 'inline-block',
        margin: '0 10px',
    },
    activeButton: {
        color: '#fff',
        cursor: 'pointer',
        backgroundColor: '#059bff',
    },
    inactiveButton: {
        marginLeft: 10,
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    title: {
        color: colors.azure,
        margin: 0,
    },
    modalPadding: {
        padding: '20px 20px 0px',
    },
    p: {
        color: colors.black54,
        fontSize: 14,
        lineHeight: '19px',
    },
    tag: {
        color: colors.black54,
        fontSize: 14,
    },
    tagLink: {
        color: colors.azure,
        fontSize: 14,
        transition: 'color 0.5s',
        cursor: 'pointer',
        ':hover': {
            color: colors.black87,
        },
    },
    urlField: {
        alignItems: 'baseline',
    },
    urlLabel: {
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.54)',
        paddingBottom: 6,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 20px 20px',
        marginTop: 10,
    },
    submit: {
        padding: '7px 50px',
        alignSelf: 'center',
        marginTop: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerRow: {
        [mobileBP2]: {
            display: 'block',
        },
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    iconButton: {
        backgroundColor: 'transparent',
        paddingBottom: 0,
        paddingTop: 0,
        ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.25)',
        },
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
        padding: 30,

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

    showImage: {
        width: '200px',
        height: '200px',
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    episodeTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    titleRow: {
        backgroundColor: '#e3f2fd',
        border: 'none',
    },
    cell: {
        paddingTop: '5px',
        paddingBottom: '5px',
        fontWeight: 'bold',
    },
    bodyCell: {
        paddingTop: '5px',
        fontSize: '14px',
        paddingBottom: '5px',
        color: 'rgba(0, 0, 0, 0.8)',
    },
    emptyRow: {
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '15px',
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
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        marginBottom: 10,
        minWidth: '48%',
    },
    label: {
        fontSize: '0.85em',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.azure,
        marginBottom: 5,
    },
    grayText: {
        lineHeight: 1.58,
        color: colors.black38,
    },
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300,
        minHeight: 100,
    },
    modalBody: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: '2rem',
    },
});
